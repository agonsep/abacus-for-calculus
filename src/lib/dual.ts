import { parse, type MathNode } from "mathjs";

/**
 * Second-order jets: `a + b·w + c·w²`, where `w` is a positive infinitesimal
 * smaller than every positive real number, and `w³` is negligible (exactly
 * zero). Evaluating f at `m + b·w + c·w²` yields `f(m) + f'(m)·b·w +
 * ½f''(m)·b²·w²` exactly. The second order lets a difference quotient divided
 * by `w` carry its own w-coefficient, so a further round of infinitesimal
 * differences stays exact.
 */
export type Dual = { a: number; b: number; c: number };

export const dual = (a: number, b = 0, c = 0): Dual => ({ a, b, c });

export const jetAdd = (x: Dual, y: Dual): Dual => ({
  a: x.a + y.a,
  b: x.b + y.b,
  c: x.c + y.c,
});
export const jetSub = (x: Dual, y: Dual): Dual => ({
  a: x.a - y.a,
  b: x.b - y.b,
  c: x.c - y.c,
});
/** Divide a jet by a plain real number. */
export const jetDivReal = (x: Dual, k: number): Dual => ({
  a: x.a / k,
  b: x.b / k,
  c: x.c / k,
});
/**
 * Divide a jet by `k·w`. Only valid when the real parts cancel (the two
 * arguments of the difference share their real part); the quotient is
 * `b/k + (c/k)·w`.
 */
export const jetDivInf = (x: Dual, k: number): Dual | null => {
  const scale = Math.max(1, Math.abs(x.b) * k);
  if (Math.abs(x.a) > 1e-12 * scale) return null;
  return { a: x.b / k, b: x.c / k, c: 0 };
};

const mul = (x: Dual, y: Dual): Dual => ({
  a: x.a * y.a,
  b: x.a * y.b + x.b * y.a,
  c: x.a * y.c + x.b * y.b + x.c * y.a,
});
const div = (x: Dual, y: Dual): Dual => {
  // 1/y = A + B·w + C·w² with A = 1/ya, B = −yb/ya², C = (yb² − yc·ya)/ya³.
  const A = 1 / y.a;
  const B = -y.b * A * A;
  const C = (y.b * y.b - y.c * y.a) * A * A * A;
  return {
    a: x.a * A,
    b: x.a * B + x.b * A,
    c: x.a * C + x.b * B + x.c * A,
  };
};
const neg = (x: Dual): Dual => ({ a: -x.a, b: -x.b, c: -x.c });

/** Chain rule through f: b carries f', c carries f'·c + ½f''·b². */
const chain = (
  x: Dual,
  f: (v: number) => number,
  df: (v: number) => number,
  d2f: (v: number) => number,
): Dual => ({
  a: f(x.a),
  b: df(x.a) * x.b,
  c: df(x.a) * x.c + 0.5 * d2f(x.a) * x.b * x.b,
});

const dSqrt = (x: Dual) =>
  chain(x, Math.sqrt, (v) => 1 / (2 * Math.sqrt(v)), (v) => -1 / (4 * Math.pow(v, 1.5)));
const dExp = (x: Dual) => chain(x, Math.exp, Math.exp, Math.exp);
const dLog = (x: Dual) => chain(x, Math.log, (v) => 1 / v, (v) => -1 / (v * v));

function dPow(x: Dual, y: Dual): Dual {
  if (y.b === 0 && y.c === 0) {
    const n = y.a;
    const p = Math.pow(x.a, n);
    const dp = n * Math.pow(x.a, n - 1);
    // At x.a = 0 only special exponents keep a finite second-order term.
    const cTerm =
      x.a === 0
        ? n === 2
          ? 0.5 * n * (n - 1) * x.b * x.b
          : 0
        : 0.5 * n * (n - 1) * Math.pow(x.a, n - 2) * x.b * x.b;
    return { a: p, b: dp * x.b, c: dp * x.c + cTerm };
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
  cbrt: (x) =>
    chain(
      x,
      Math.cbrt,
      (v) => 1 / (3 * Math.pow(Math.cbrt(v), 2)),
      (v) => -2 / (9 * Math.pow(Math.cbrt(v), 5)),
    ),
  exp: dExp,
  log: dLog,
  ln: dLog,
  log10: (x) =>
    chain(x, Math.log10, (v) => 1 / (v * Math.LN10), (v) => -1 / (v * v * Math.LN10)),
  log2: (x) => chain(x, Math.log2, (v) => 1 / (v * Math.LN2), (v) => -1 / (v * v * Math.LN2)),
  abs: dAbs,
  sin: (x) => chain(x, Math.sin, Math.cos, (v) => -Math.sin(v)),
  cos: (x) => chain(x, Math.cos, (v) => -Math.sin(v), (v) => -Math.cos(v)),
  tan: (x) =>
    chain(x, Math.tan, (v) => 1 / (Math.cos(v) * Math.cos(v)), (v) => (2 * Math.sin(v)) / Math.pow(Math.cos(v), 3)),
  asin: (x) =>
    chain(
      x,
      Math.asin,
      (v) => 1 / Math.sqrt(1 - v * v),
      (v) => v / Math.pow(1 - v * v, 1.5),
    ),
  acos: (x) =>
    chain(
      x,
      Math.acos,
      (v) => -1 / Math.sqrt(1 - v * v),
      (v) => -v / Math.pow(1 - v * v, 1.5),
    ),
  atan: (x) => chain(x, Math.atan, (v) => 1 / (1 + v * v), (v) => (-2 * v) / Math.pow(1 + v * v, 2)),
  sinh: (x) => chain(x, Math.sinh, Math.cosh, Math.sinh),
  cosh: (x) => chain(x, Math.cosh, Math.sinh, Math.cosh),
  tanh: (x) =>
    chain(
      x,
      Math.tanh,
      (v) => 1 / (Math.cosh(v) * Math.cosh(v)),
      (v) => (-2 * Math.tanh(v)) / (Math.cosh(v) * Math.cosh(v)),
    ),
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
          return jetAdd(args[0], args[1]);
        case "subtract":
          return jetSub(args[0], args[1]);
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

/** Evaluate a formula in `x` using second-order jet arithmetic. Throws when unsupported. */
export function evalDual(expr: string, x: Dual): Dual {
  const node = parse(expr) as AnyNode;
  const r = walk(node, x);
  if (!isFinite(r.a) || !isFinite(r.b) || !isFinite(r.c)) throw new Error("not finite");
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
