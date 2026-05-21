import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { evaluate } from "mathjs";
import * as THREE from "three";

const COLUMNS = 10;
const COL_SPACING = 1.1;
const PIECE_HEIGHT = 0.18;
const PIECE_SIZE: [number, number, number] = [0.95, PIECE_HEIGHT, 0.95 / 1.618];
const MAX_PIECES = 60;
const RED_STOCK = 15;
const SEPARATOR_HEIGHT = MAX_PIECES * PIECE_HEIGHT + 0.2;

const ORANGE = "#d98b4a";
const RED = "#c8332a";

function slotY(slot: number) {
  return PIECE_HEIGHT / 2 + slot * PIECE_HEIGHT + 0.05;
}

function Piece({
  x,
  fromY,
  targetY,
  delay,
  color,
}: {
  x: number;
  fromY: number;
  targetY: number;
  delay: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const start = useRef(performance.now() / 1000 + delay);

  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000 - start.current;
    if (t < 0) {
      ref.current.position.set(x, fromY, 0);
      ref.current.scale.setScalar(0);
      return;
    }
    const duration = 0.55;
    const p = Math.min(1, t / duration);
    const ease = 1 - Math.pow(1 - p, 3);
    const y = fromY + (targetY - fromY) * ease;
    const bounce =
      p === 1
        ? Math.sin(Math.min((t - duration) * 12, Math.PI)) * 0.06 * Math.exp(-(t - duration) * 4)
        : 0;
    ref.current.position.set(x, y + bounce, 0);
    const s = Math.min(1, t / 0.2);
    ref.current.scale.setScalar(s);
  });

  const c = useMemo(() => new THREE.Color(color), [color]);

  return (
    <group ref={ref}>
      <RoundedBox args={PIECE_SIZE} radius={0.08} smoothness={4} castShadow receiveShadow>
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

function Board() {
  const width = COLUMNS * COL_SPACING + 0.6;
  const depth = 1.6;
  const sepThickness = 0.04;
  const sepHeight = SEPARATOR_HEIGHT;
  const sepDepth = depth - 0.3;
  const backThickness = 0.08;
  return (
    <group position={[0, -0.15, 0]}>
      <RoundedBox args={[width, 0.3, depth]} radius={0.08} smoothness={4} position={[0, -0.15, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#2a2418" roughness={0.6} metalness={0.1} clearcoat={0.3} />
      </RoundedBox>
      <RoundedBox args={[width - 0.2, 0.05, depth - 0.2]} radius={0.04} smoothness={4} position={[0, 0.02, 0]} receiveShadow>
        <meshStandardMaterial color="#3a3020" roughness={0.8} />
      </RoundedBox>
      <RoundedBox
        args={[width, sepHeight, backThickness]}
        radius={0.04}
        smoothness={4}
        position={[0, sepHeight / 2 + 0.05, -depth / 2 + backThickness / 2 + 0.05]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#3a3020" roughness={0.85} metalness={0.05} />
      </RoundedBox>
      {Array.from({ length: COLUMNS + 1 }).map((_, i) => {
        const x = (i - COLUMNS / 2) * COL_SPACING;
        return (
          <mesh key={`sep-${i}`} position={[x, sepHeight / 2 + 0.05, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[sepThickness, sepHeight, sepDepth]} />
            <meshStandardMaterial color="#4a3d28" roughness={0.7} metalness={0.05} />
          </mesh>
        );
      })}
      {Array.from({ length: COLUMNS }).map((_, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        return (
          <Text
            key={`lbl-${i}`}
            position={[x, 0.06, depth / 2 - 0.18]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.22}
            color="#e8d9b0"
            anchorX="center"
            anchorY="middle"
          >
            {String(i + 1)}
          </Text>
        );
      })}
    </group>
  );
}

function Stacks({
  values,
  runId,
  calcId,
}: {
  values: number[];
  runId: number;
  calcId: number;
}) {
  const skyY = MAX_PIECES * PIECE_HEIGHT + 4;
  return (
    <>
      {values.map((v, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const yCount = Math.max(0, Math.min(MAX_PIECES, Math.round(v)));
        const prev = i === 0 ? 0 : values[i - 1];
        const delta = Math.round(values[i] - prev);
        const dCount = Math.max(0, Math.min(RED_STOCK, Math.abs(delta)));
        const pieces: ReactNode[] = [];

        // Orange stack (y)
        for (let k = 0; k < yCount; k++) {
          pieces.push(
            <Piece
              key={`y-${runId}-${i}-${k}`}
              x={x}
              fromY={skyY}
              targetY={slotY(k)}
              delay={i * 0.08 + k * 0.04}
              color={ORANGE}
            />,
          );
        }

        // Red stock at top of column. k = 0 is the bottommost stone of the stock.
        for (let k = 0; k < RED_STOCK; k++) {
          const topSlot = MAX_PIECES - RED_STOCK + k; // fills the top RED_STOCK slots
          const stockY = slotY(topSlot);
          let fromY: number;
          let targetY: number;
          let delay: number;

          if (calcId === 0) {
            // Initial drop into stock position
            fromY = skyY + 2;
            targetY = stockY;
            delay = 0.4 + i * 0.05 + (RED_STOCK - k) * 0.02;
          } else if (k < dCount) {
            // This stone drops down onto orange stack
            fromY = stockY;
            targetY = slotY(yCount + k);
            delay = i * 0.06 + k * 0.08;
          } else {
            // Stays at the top
            fromY = stockY;
            targetY = stockY;
            delay = 0;
          }

          pieces.push(
            <Piece
              key={`r-${runId}-${calcId}-${i}-${k}`}
              x={x}
              fromY={fromY}
              targetY={targetY}
              delay={delay}
              color={RED}
            />,
          );
        }

        return <group key={i}>{pieces}</group>;
      })}
    </>
  );
}

function Scene({ values, runId, calcId }: { values: number[]; runId: number; calcId: number }) {
  return (
    <>
      <color attach="background" args={["#0f1320"]} />
      <fog attach="fog" args={["#0f1320", 14, 28]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#88aaff" />
      <Board />
      <Stacks values={values} runId={runId} calcId={calcId} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 5, 0]}
      />
    </>
  );
}

export default function CalculusAbacus() {
  const [formula, setFormula] = useState("(x^2 + x) / 2");
  const [values, setValues] = useState<number[]>(Array(COLUMNS).fill(0));
  const [runId, setRunId] = useState(0);
  const [calcId, setCalcId] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const compute = (expr: string) => {
    try {
      const cleaned = expr.replace(/^\s*y\s*=\s*/i, "");
      const next: number[] = [];
      for (let x = 1; x <= COLUMNS; x++) {
        const v = evaluate(cleaned, { x });
        if (typeof v !== "number" || !isFinite(v)) throw new Error("Not numeric");
        next.push(v);
      }
      setValues(next);
      setRunId((r) => r + 1);
      setCalcId(0);
      setError(null);
    } catch (e) {
      setError("Couldn't parse that formula. Try things like 2x+3, x^2, sin(x)+5.");
    }
  };

  useEffect(() => {
    const t = setTimeout(() => compute(formula), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Canvas shadows camera={{ position: [0, 10, 22], fov: 45 }} dpr={[1, 2]}>
        <Scene values={values} runId={runId} calcId={calcId} />
      </Canvas>

      {/* Header */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 p-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">An abacus for</p>
          <h1 className="mt-1 font-serif text-4xl font-semibold text-foreground md:text-5xl">
            Calculus
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Orange stones are <span className="text-primary">y</span>. The red stock at the top
            holds the discrete differential <span className="text-primary">Δy = y(x) − y(x−1)</span>.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mx-auto flex max-w-xl flex-col gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              compute(formula);
            }}
            className="flex items-center gap-2 rounded-2xl border border-border bg-card/80 p-2 shadow-2xl backdrop-blur-md"
          >
            <span className="pl-3 font-serif text-2xl text-primary">y =</span>
            <input
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="2x + 3"
              className="flex-1 bg-transparent px-2 py-2 font-mono text-lg text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-2 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Stack
            </button>
          </form>

          <button
            onClick={() => setCalcId((c) => c + 1)}
            className="self-center rounded-xl border border-[hsl(0_60%_45%)] bg-[hsl(0_60%_45%)]/90 px-5 py-2 font-medium text-white shadow-2xl backdrop-blur-md transition hover:bg-[hsl(0_60%_50%)]"
          >
            Calculate discrete differential
          </button>

          {error ? (
            <p className="text-center text-sm text-destructive">{error}</p>
          ) : (
            <p className="text-center text-xs text-muted-foreground">
              Try:{" "}
              <button onClick={() => { setFormula("x^2"); compute("x^2"); }} className="text-primary hover:underline">x^2</button>{" · "}
              <button onClick={() => { setFormula("2x + 3"); compute("2x + 3"); }} className="text-primary hover:underline">2x + 3</button>{" · "}
              <button onClick={() => { setFormula("sqrt(x)*4"); compute("sqrt(x)*4"); }} className="text-primary hover:underline">sqrt(x)*4</button>{" · "}
              <button onClick={() => { setFormula("sin(x)+5"); compute("sin(x)+5"); }} className="text-primary hover:underline">sin(x)+5</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
