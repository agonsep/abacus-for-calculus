import { parse, type MathNode } from "mathjs";

/**
 * Dual numbers: `a + b·w`, where `w` is a positive infinitesimal smaller than
 * every positive real number, and `w·w` is negligible (exactly zero).
 * Evaluating f at `m + w` therefore yields `f(m) + f'(m)·w` exactly.
 */
export type Dual = { a: number; b: number };

export const dual = (a: number, b = 0): Dual => ({ a, b });

const add = (x: Dual, y: Dual): Dual => ({ a: x.a + y.a, b: x.b + y.b });
const sub = (x: Dual, y: Dual): Dual => ({ a: x.a - y.a, b: x.b - y.b });
const mul = (x: Dual, y: Dual): Dual => ({ a: x.a * y.a, b: x.a * y.b + x.b * y.a });
const div = (x: Dual, y: Dual): Dual => ({
  a: x.a / y.a,
  b: (x.b * y.a - x.a * y.b) / (y.a * y.a),
});
const neg = (x: Dual): Dual => ({ a: -x.a, b: -x.b });

const chain = (x: Dual, f: (v: number) => number, df: (v: number) => number): Dual => ({
  a: f(x.a),
  b: df(x.a) * x.b,
});

const dSqrt = (x: Dual) => chain(x, Math.sqrt, (v) => 1 / (2 * Math.sqrt(v)));
const dExp = (x: Dual) => chain(x, Math.exp, Math.exp);
const dLog = (x: Dual) => chain(x, Math.log, (v) => 1 / v);

function dPow(x: Dual, y: Dual): Dual {
  if (y.b === 0) {
    const n = y.a;
    return { a: Math.pow(x.a, n), b: n * Math.pow(x.a, n - 1) * x.b };
  }
  // general case: x^y = exp(y * log x)
  return dExp(mul(y, dLog(x)));
}

function dAbs(x: Dual): Dual {
  if (x.a > 0) return x;
  if (x.a < 0) return neg(x);
  throw new Error("abs is not differentiable at 0");
}

const UNARY: Record<string, (x: Dual) => Dual> = {
  sqrt: dSqrt,
  cbrt: (x) => chain(x, Math.cbrt, (v) => 1 / (3 * Math.pow(Math.cbrt(v), 2))),
  exp: dExp,
  log: dLog,
  ln: dLog,
  log10: (x) => chain(x, Math.log10, (v) => 1 / (v * Math.LN10)),
  log2: (x) => chain(x, Math.log2, (v) => 1 / (v * Math.LN2)),
  abs: dAbs,
  sin: (x) => chain(x, Math.sin, Math.cos),
  cos: (x) => chain(x, Math.cos, (v) => -Math.sin(v)),
  tan: (x) => chain(x, Math.tan, (v) => 1 / (Math.cos(v) * Math.cos(v))),
  asin: (x) => chain(x, Math.asin, (v) => 1 / Math.sqrt(1 - v * v)),
  acos: (x) => chain(x, Math.acos, (v) => -1 / Math.sqrt(1 - v * v)),
  atan: (x) => chain(x, Math.atan, (v) => 1 / (1 + v * v)),
  sinh: (x) => chain(x, Math.sinh, Math.cosh),
  cosh: (x) => chain(x, Math.cosh, Math.sinh),
  tanh: (x) => chain(x, Math.tanh, (v) => 1 / (Math.cosh(v) * Math.cosh(v))),
};

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  PI: Math.PI,
  e: Math.E,
  E: Math.E,
  tau: Math.PI * 2,
};

type AnyNode = MathNode & Record<string, unknown>;

function walk(node: AnyNode, x: Dual): Dual {
  switch (node.type) {
    case "ConstantNode":
      return dual(Number(node.value));
    case "ParenthesisNode":
      return walk(node.content as AnyNode, x);
    case "SymbolNode": {
      const name = String(node.name);
      if (name === "x") return x;
      if (name in CONSTANTS) return dual(CONSTANTS[name]);
      throw new Error(`unknown symbol ${name}`);
    }
    case "OperatorNode": {
      const args = (node.args as AnyNode[]).map((n) => walk(n, x));
      const fn = String(node.fn);
      if (args.length === 1) {
        if (fn === "unaryMinus") return neg(args[0]);
        if (fn === "unaryPlus") return args[0];
        throw new Error(`unsupported unary ${fn}`);
      }
      if (args.length !== 2) throw new Error(`unsupported operator ${fn}`);
      switch (fn) {
        case "add":
          return add(args[0], args[1]);
        case "subtract":
          return sub(args[0], args[1]);
        case "multiply":
          return mul(args[0], args[1]);
        case "divide":
          return div(args[0], args[1]);
        case "pow":
          return dPow(args[0], args[1]);
        default:
          throw new Error(`unsupported operator ${fn}`);
      }
    }
    case "FunctionNode": {
      const name = String((node.fn as { name?: string })?.name ?? node.fn);
      const args = (node.args as AnyNode[]).map((n) => walk(n, x));
      if (name === "pow" && args.length === 2) return dPow(args[0], args[1]);
      if (name === "nthRoot" && args.length === 2) return dPow(args[0], div(dual(1), args[1]));
      const fn = UNARY[name];
      if (!fn || args.length !== 1) throw new Error(`unsupported function ${name}`);
      return fn(args[0]);
    }
    default:
      throw new Error(`unsupported expression node ${node.type}`);
  }
}

/** Evaluate a formula in `x` using dual arithmetic. Throws when unsupported. */
export function evalDual(expr: string, x: Dual): Dual {
  const node = parse(expr) as AnyNode;
  const r = walk(node, x);
  if (!isFinite(r.a) || !isFinite(r.b)) throw new Error("not finite");
  return r;
}

/** `k·w` step, or a plain real increment. */
export type Increment = { value: number; infinitesimal: boolean };

/** Parse the Increment field: a real number, or `w`, `2w`, `0.5w`, `-w`. */
export function parseIncrement(raw: string): Increment | null {
  const s = raw.trim().toLowerCase().replace(/\s+/g, "");
  if (!s) return null;
  if (/w/.test(s)) {
    const m = s.match(/^([+-]?[0-9]*\.?[0-9]*)\*?w$/);
    if (!m) return null;
    const c = m[1];
    const k = c === "" || c === "+" ? 1 : c === "-" ? -1 : Number(c);
    if (!isFinite(k) || k === 0) return null;
    return { value: k, infinitesimal: true };
  }
  const n = Number(s);
  if (!isFinite(n) || n === 0) return null;
  return { value: n, infinitesimal: false };
}

function fmtReal(n: number) {
  if (!isFinite(n)) return "";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.0001 || abs >= 10000)) return n.toExponential(1);
  return String(Math.round(n * 100000) / 100000);
}

/** Render `a + b·w` compactly: "2", "2 + 3w", "−w", "4w". */
export function formatDual(a: number, b: number, fmt: (n: number) => string = fmtReal) {
  const bZero = b === 0 || !isFinite(b);
  if (bZero) return fmt(a);
  const mag = Math.abs(b);
  const coeff = mag === 1 ? "" : fmt(mag);
  const term = `${coeff}w`;
  if (a === 0) return `${b < 0 ? "−" : ""}${term}`;
  return `${fmt(a)} ${b < 0 ? "−" : "+"} ${term}`;
}
