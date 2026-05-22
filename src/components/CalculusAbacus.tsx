import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, RoundedBox, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { evaluate } from "mathjs";
import * as THREE from "three";

const COLUMNS = 11;
const COL_SPACING = 1.375;
const PIECE_HEIGHT = 0.18;
const PIECE_WIDTH = 1.1875;
const PIECE_DEPTH = 1.1875 / 1.618;
const MAX_PIECES = 80;
const SEPARATOR_HEIGHT = MAX_PIECES * PIECE_HEIGHT + 0.2;

const ORANGE = "#d98b4a";
const RED = "#c8332a";
const LINE_COLOR = "#7dd3fc";

function slotY(slot: number) {
  return PIECE_HEIGHT / 2 + slot * PIECE_HEIGHT + 0.05;
}

function niceUnit(raw: number) {
  if (!isFinite(raw) || raw <= 0) return 1;
  const exp = Math.floor(Math.log10(raw));
  const base = Math.pow(10, exp);
  const m = raw / base;
  const nice = m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10;
  return nice * base;
}

function Piece({
  x,
  fromY,
  targetY,
  delay,
  color,
  heightScale = 1,
}: {
  x: number;
  fromY: number;
  targetY: number;
  delay: number;
  color: string;
  heightScale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const start = useRef(performance.now() / 1000 + delay);

  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000 - start.current;
    if (t < 0) {
      ref.current.position.set(x, fromY, 0);
      ref.current.scale.set(0, 0, 0);
      return;
    }
    const duration = 0.45;
    const p = Math.min(1, t / duration);
    const ease = 1 - Math.pow(1 - p, 3);
    const y = fromY + (targetY - fromY) * ease;
    const bounce =
      p === 1
        ? Math.sin(Math.min((t - duration) * 12, Math.PI)) * 0.05 * Math.exp(-(t - duration) * 4)
        : 0;
    ref.current.position.set(x, y + bounce, 0);
    const s = Math.min(1, t / 0.18);
    ref.current.scale.set(s, s * heightScale, s);
  });

  const c = useMemo(() => new THREE.Color(color), [color]);

  return (
    <group ref={ref}>
      <RoundedBox args={[PIECE_WIDTH, PIECE_HEIGHT, PIECE_DEPTH]} radius={0.08} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={c}
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>
    </group>
  );
}

function Board({ xValues }: { xValues: number[] }) {
  const width = COLUMNS * COL_SPACING + 0.6;
  const depth = 1.6;
  const sepThickness = 0.04;
  const sepHeight = SEPARATOR_HEIGHT;
  const sepDepth = depth - 0.3;
  const backThickness = 0.08;
  return (
    <group position={[0, -0.15, 0]}>
      <RoundedBox args={[width, 0.3, depth]} radius={0.08} smoothness={4} position={[0, -0.15, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#3a3020" roughness={0.6} metalness={0.1} clearcoat={0.3} />
      </RoundedBox>
      <RoundedBox args={[width - 0.2, 0.05, depth - 0.2]} radius={0.04} smoothness={4} position={[0, 0.02, 0]} receiveShadow>
        <meshStandardMaterial color="#4a3d28" roughness={0.8} />
      </RoundedBox>
      <RoundedBox
        args={[width, sepHeight, backThickness]}
        radius={0.04}
        smoothness={4}
        position={[0, sepHeight / 2 + 0.05, -depth / 2 + backThickness / 2 + 0.05]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#4a3d28" roughness={0.85} metalness={0.05} />
      </RoundedBox>
      {Array.from({ length: COLUMNS + 1 }).map((_, i) => {
        const x = (i - COLUMNS / 2) * COL_SPACING;
        return (
          <mesh key={`sep-${i}`} position={[x, sepHeight / 2 + 0.05, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[sepThickness, sepHeight, sepDepth]} />
            <meshStandardMaterial color="#5a4d38" roughness={0.7} metalness={0.05} />
          </mesh>
        );
      })}
      {xValues.map((xv, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const label = formatNum(xv);
        return (
          <Text
            key={`lbl-${i}`}
            position={[x, 0.06, depth / 2 - 0.18]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.2}
            color="#f5e8c8"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        );
      })}
    </group>
  );
}

function formatNum(n: number) {
  if (!isFinite(n)) return "";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.01 || abs >= 10000)) return n.toExponential(1);
  const r = Math.round(n * 1000) / 1000;
  return String(r);
}

function Stacks({
  orange,
  red,
  shift,
  runId,
}: {
  orange: number[];
  red: number[];
  shift: number[];
  runId: number;
}) {
  const skyY = MAX_PIECES * PIECE_HEIGHT + 4;
  return (
    <>
      {orange.map((yVal, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const off = shift[i] ?? 0;
        const pieces: ReactNode[] = [];

        const yFull = Math.floor(yVal);
        const yFrac = yVal - yFull;
        for (let k = 0; k < yFull; k++) {
          pieces.push(
            <Piece
              key={`y-${runId}-${i}-${k}`}
              x={x}
              fromY={skyY}
              targetY={slotY(k + off)}
              delay={i * 0.04 + k * 0.02}
              color={ORANGE}
            />,
          );
        }
        if (yFrac > 0.01) {
          const baseY = slotY(yFull + off) - PIECE_HEIGHT / 2;
          const targetY = baseY + (PIECE_HEIGHT * yFrac) / 2;
          pieces.push(
            <Piece
              key={`yf-${runId}-${i}`}
              x={x}
              fromY={skyY}
              targetY={targetY}
              delay={i * 0.04 + yFull * 0.02}
              color={ORANGE}
              heightScale={yFrac}
            />,
          );
        }

        const rVal = red[i] ?? 0;
        const rFull = Math.floor(rVal);
        const rFrac = rVal - rFull;
        const redBase = yFull + (yFrac > 0.01 ? 1 : 0);
        for (let k = 0; k < rFull; k++) {
          pieces.push(
            <Piece
              key={`r-${runId}-${i}-${k}`}
              x={x}
              fromY={skyY + 2}
              targetY={slotY(redBase + k + off)}
              delay={i * 0.04 + (redBase + k) * 0.02}
              color={RED}
            />,
          );
        }
        if (rFrac > 0.01) {
          const baseY = slotY(redBase + rFull + off) - PIECE_HEIGHT / 2;
          const targetY = baseY + (PIECE_HEIGHT * rFrac) / 2;
          pieces.push(
            <Piece
              key={`rf-${runId}-${i}`}
              x={x}
              fromY={skyY + 2}
              targetY={targetY}
              delay={i * 0.04 + (redBase + rFull) * 0.02}
              color={RED}
              heightScale={rFrac}
            />,
          );
        }

        return <group key={i}>{pieces}</group>;
      })}
    </>
  );
}

function ConnectingLine({ orange, shift }: { orange: number[]; shift: number[] }) {
  const points = useMemo<[number, number, number][]>(
    () =>
      orange.map((v, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const off = shift[i] ?? 0;
        const top = PIECE_HEIGHT * (v + off) + 0.05;
        return [x, top + 0.04, PIECE_DEPTH / 2 + 0.02];
      }),
    [orange, shift],
  );
  if (points.length < 2) return null;
  return (
    <>
      <Line points={points} color={LINE_COLOR} lineWidth={3} />
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={LINE_COLOR} emissive={LINE_COLOR} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </>
  );
}

function DragHandles({
  onShift,
  setDragging,
}: {
  onShift: (i: number, delta: number) => void;
  setDragging: (b: boolean) => void;
}) {
  const startRef = useRef<{ i: number; y: number } | null>(null);
  return (
    <>
      {Array.from({ length: COLUMNS }).map((_, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        return (
          <mesh
            key={`drag-${i}`}
            position={[x, SEPARATOR_HEIGHT / 2 + 0.05, PIECE_DEPTH / 2 + 0.05]}
            onPointerDown={(e) => {
              e.stopPropagation();
              (e.target as Element).setPointerCapture?.(e.pointerId);
              startRef.current = { i, y: e.point.y };
              setDragging(true);
              document.body.style.cursor = "grabbing";
            }}
            onPointerMove={(e) => {
              if (!startRef.current || startRef.current.i !== i) return;
              e.stopPropagation();
              const dy = e.point.y - startRef.current.y;
              const slots = Math.round(dy / PIECE_HEIGHT);
              if (slots !== 0) {
                onShift(i, slots);
                startRef.current.y += slots * PIECE_HEIGHT;
              }
            }}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture?.(e.pointerId);
              startRef.current = null;
              setDragging(false);
              document.body.style.cursor = "";
            }}
            onPointerOver={() => {
              if (!startRef.current) document.body.style.cursor = "grab";
            }}
            onPointerOut={() => {
              if (!startRef.current) document.body.style.cursor = "";
            }}
          >
            <boxGeometry args={[PIECE_WIDTH, SEPARATOR_HEIGHT, PIECE_DEPTH]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        );
      })}
    </>
  );
}

function Scene({
  orange,
  red,
  shift,
  xValues,
  runId,
  showLine,
  onShift,
  setDragging,
  dragging,
}: {
  orange: number[];
  red: number[];
  shift: number[];
  xValues: number[];
  runId: number;
  showLine: boolean;
  onShift: (i: number, delta: number) => void;
  setDragging: (b: boolean) => void;
  dragging: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#1c2238"]} />
      <fog attach="fog" args={["#1c2238", 18, 36]} />
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#ffffff", "#3a4060", 0.6]} />
      <directionalLight
        position={[6, 12, 6]}
        intensity={2.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-6, 5, -4]} intensity={0.7} color="#a8c0ff" />
      <Board xValues={xValues} />
      <Stacks orange={orange} red={red} shift={shift} runId={runId} />
      {showLine && <ConnectingLine orange={orange} shift={shift} />}
      <DragHandles onShift={onShift} setDragging={setDragging} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
      <Environment preset="city" />
      <OrbitControls
        enabled={!dragging}
        enablePan={false}
        minDistance={8}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 7, 0]}
      />
    </>
  );
}

export default function CalculusAbacus() {
  const [formula, setFormula] = useState("(x^2 + x) / 2");
  const [midpoint, setMidpoint] = useState("5");
  const [increment, setIncrement] = useState("1");

  const [xValues, setXValues] = useState<number[]>(
    Array.from({ length: COLUMNS }, (_, i) => i - 5),
  );
  const [unit, setUnit] = useState(1);
  const [orange, setOrange] = useState<number[]>(Array(COLUMNS).fill(0));
  const [red, setRed] = useState<number[]>(Array(COLUMNS).fill(0));
  const [shift, setShift] = useState<number[]>(Array(COLUMNS).fill(0));
  const [runId, setRunId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showLine, setShowLine] = useState(false);
  const [fractional, setFractional] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const setup = () => {
    try {
      const cleaned = formula.replace(/^\s*y\s*=\s*/i, "");
      const m = Number(midpoint);
      const h = Number(increment);
      if (!isFinite(m) || !isFinite(h) || h === 0) throw new Error("bad m/h");
      const xs: number[] = [];
      const ys: number[] = [];
      for (let i = 0; i < COLUMNS; i++) {
        const xv = m + (i - 5) * h;
        const y = evaluate(cleaned, { x: xv });
        if (typeof y !== "number" || !isFinite(y)) throw new Error("not numeric");
        xs.push(xv);
        ys.push(y);
      }
      const maxAbs = Math.max(...ys.map((y) => Math.abs(y)), 1e-9);
      const avail = MAX_PIECES - 10;
      const u = niceUnit(maxAbs / avail);
      const counts = ys.map((y) => {
        const raw = y / u;
        const v = fractional ? raw : Math.round(raw);
        return Math.max(0, Math.min(MAX_PIECES, v));
      });
      setXValues(xs);
      setUnit(u);
      setOrange(counts);
      setRed(Array(COLUMNS).fill(0));
      setShift(Array(COLUMNS).fill(0));
      setRunId((r) => r + 1);
      setError(null);
    } catch {
      setError("Check your formula, midpoint, and increment.");
    }
  };

  const calcDiff = () => {
    const r = orange.map((v, i) => (i === 0 ? 0 : Math.abs(v - orange[i - 1])));
    setRed(r);
  };

  useEffect(() => {
    const t = setTimeout(setup, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bump = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    i: number,
    d: number,
    min = 0,
    max = MAX_PIECES,
  ) => {
    setter((arr) => {
      const next = arr.slice();
      next[i] = Math.max(min, Math.min(max, next[i] + d));
      return next;
    });
  };

  const fmtCount = (v: number) =>
    fractional ? (Math.round(v * 10) / 10).toFixed(1) : String(Math.round(v));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Canvas shadows camera={{ position: [0, 12, 28], fov: 45 }} dpr={[1, 2]}>
        <Scene
          orange={orange}
          red={red}
          shift={shift}
          xValues={xValues}
          runId={runId}
          showLine={showLine}
        />
      </Canvas>

      {/* Header */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 p-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">An abacus for</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Calculus
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            One orange stone = <span className="font-mono text-primary">{formatNum(unit)}</span>.
            Red stones show <span className="text-primary">Δy</span>.
          </p>
        </div>
      </div>

      {/* Top-right controls */}
      <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
        <button
          onClick={() => setShowHelp(true)}
          className="pointer-events-auto h-9 w-9 rounded-full border border-border bg-card/80 font-serif text-lg text-foreground shadow-lg backdrop-blur-md transition hover:bg-card"
          title="How does this work?"
        >
          ?
        </button>
        <div className="pointer-events-auto flex flex-col gap-1.5 rounded-xl border border-border bg-card/80 p-2 text-xs shadow-lg backdrop-blur-md">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showLine}
              onChange={(e) => setShowLine(e.target.checked)}
              className="accent-[hsl(199_89%_70%)]"
            />
            <span className="text-foreground">Connect stones</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={fractional}
              onChange={(e) => setFractional(e.target.checked)}
              className="accent-primary"
            />
            <span className="text-foreground">Fractional stones</span>
          </label>
        </div>
      </div>

      {/* Help dialog */}
      {showHelp && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="max-h-[80vh] w-full max-w-xl overflow-auto rounded-2xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between">
              <h2 className="font-serif text-2xl text-foreground">How the abacus works</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="rounded-md px-2 text-2xl leading-none text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
              <p>
                Each of the <span className="font-mono">11</span> columns represents a value of{" "}
                <span className="font-mono text-primary">x</span> centered on your{" "}
                <em>midpoint</em>, spaced by <span className="font-mono">Δx</span>.
              </p>
              <p>
                For every column we evaluate{" "}
                <span className="font-mono text-primary">y = f(x)</span> and stack{" "}
                <span className="text-[hsl(28_70%_55%)]">orange stones</span> to that height. The
                board picks a "nice" unit so the tallest column fits — one orange stone is worth{" "}
                <span className="font-mono">{formatNum(unit)}</span>.
              </p>
              <p>
                <strong>Calculate Δy</strong> drops{" "}
                <span className="text-[hsl(0_70%_55%)]">red stones</span> on top of each column
                equal to <span className="font-mono">|y(x) − y(x − Δx)|</span> — the{" "}
                <em>discrete differential</em>. As Δx shrinks, the red heights approach the slope
                <span className="font-mono"> dy/dx</span> times Δx.
              </p>
              <p>
                <strong>Fractional stones</strong> lets values land between whole stones for a more
                exact picture. <strong>Connect stones</strong> traces a curve through the tops of
                the orange stacks so the shape of <span className="font-mono">f(x)</span> jumps
                out. The <strong>±</strong> buttons add or remove stones by hand, and{" "}
                <strong>▲▼</strong> floats whole columns up or down so you can line them up to
                compare.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-3">
          {/* Per-column controls */}
          <div className="grid grid-cols-11 gap-1 rounded-2xl border border-border bg-card/70 p-2 shadow-2xl backdrop-blur-md">
            {xValues.map((xv, i) => (
              <div key={i} className="flex flex-col items-center gap-1 rounded-lg bg-background/40 p-1.5 text-[10px]">
                <div className="font-mono text-foreground">x={formatNum(xv)}</div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => bump(setOrange, i, fractional ? -0.1 : -1)}
                    className="h-5 w-5 rounded bg-[hsl(28_60%_50%)]/80 font-bold text-white hover:bg-[hsl(28_60%_55%)]"
                  >−</button>
                  <span className="w-7 text-center font-mono text-foreground">{fmtCount(orange[i])}</span>
                  <button
                    onClick={() => bump(setOrange, i, fractional ? 0.1 : 1)}
                    className="h-5 w-5 rounded bg-[hsl(28_60%_50%)]/80 font-bold text-white hover:bg-[hsl(28_60%_55%)]"
                  >+</button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => bump(setRed, i, fractional ? -0.1 : -1)}
                    className="h-5 w-5 rounded bg-[hsl(0_60%_45%)]/80 font-bold text-white hover:bg-[hsl(0_60%_50%)]"
                  >−</button>
                  <span className="w-7 text-center font-mono text-foreground">{fmtCount(red[i])}</span>
                  <button
                    onClick={() => bump(setRed, i, fractional ? 0.1 : 1)}
                    className="h-5 w-5 rounded bg-[hsl(0_60%_45%)]/80 font-bold text-white hover:bg-[hsl(0_60%_50%)]"
                  >+</button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => bump(setShift, i, -1, -MAX_PIECES, MAX_PIECES)}
                    className="h-5 w-5 rounded bg-muted font-bold text-foreground hover:bg-muted/80"
                    title="Move column down"
                  >▼</button>
                  <button
                    onClick={() => bump(setShift, i, 1, -MAX_PIECES, MAX_PIECES)}
                    className="h-5 w-5 rounded bg-muted font-bold text-foreground hover:bg-muted/80"
                    title="Move column up"
                  >▲</button>
                </div>
              </div>
            ))}
          </div>

          {/* Equation + midpoint + increment */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setup();
            }}
            className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card/80 p-2 shadow-2xl backdrop-blur-md"
          >
            <span className="pl-3 font-serif text-xl text-primary">y =</span>
            <input
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="(x^2 + x) / 2"
              className="min-w-[180px] flex-1 bg-transparent px-2 py-2 font-mono text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <span className="font-mono text-sm text-muted-foreground">midpoint</span>
            <input
              value={midpoint}
              onChange={(e) => setMidpoint(e.target.value)}
              className="w-16 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />
            <span className="font-mono text-sm text-muted-foreground">Δx</span>
            <input
              value={increment}
              onChange={(e) => setIncrement(e.target.value)}
              className="w-16 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Fill board
            </button>
            <button
              type="button"
              onClick={calcDiff}
              className="rounded-xl border border-[hsl(0_60%_45%)] bg-[hsl(0_60%_45%)]/90 px-4 py-2 font-medium text-white transition hover:bg-[hsl(0_60%_50%)]"
            >
              Calculate Δy
            </button>
          </form>

          {error && <p className="text-center text-sm text-destructive">{error}</p>}
        </div>
      </div>
    </div>
  );
}
