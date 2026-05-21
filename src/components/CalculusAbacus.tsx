import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { evaluate } from "mathjs";
import * as THREE from "three";

const COLUMNS = 10;
const COL_SPACING = 1.1;
const PIECE_HEIGHT = 0.18;
const PIECE_SIZE: [number, number, number] = [0.9, PIECE_HEIGHT, 0.9];
const MAX_PIECES = 20;
const SEPARATOR_HEIGHT = MAX_PIECES * PIECE_HEIGHT + 0.2;
function Piece({
  x,
  targetY,
  delay,
  hue,
}: {
  x: number;
  targetY: number;
  delay: number;
  hue: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const start = useRef(performance.now() / 1000 + delay);
  const dropFrom = 8;

  useFrame(() => {
    if (!ref.current) return;
    const t = performance.now() / 1000 - start.current;
    if (t < 0) {
      ref.current.position.y = dropFrom;
      ref.current.scale.setScalar(0);
      return;
    }
    // Ease-out bounce-ish
    const p = Math.min(1, t / 0.55);
    const ease = 1 - Math.pow(1 - p, 3);
    const y = dropFrom + (targetY - dropFrom) * ease;
    // small bounce
    const bounce = p === 1 ? Math.sin(Math.min((t - 0.55) * 12, Math.PI)) * 0.06 * Math.exp(-(t - 0.55) * 4) : 0;
    ref.current.position.set(x, y + bounce, 0);
    const s = Math.min(1, t / 0.2);
    ref.current.scale.setScalar(s);
  });

  const color = useMemo(() => new THREE.Color("#d98b4a"), [hue]);

  return (
    <group ref={ref}>
      <RoundedBox args={PIECE_SIZE} radius={0.08} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={color}
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
  return (
    <group position={[0, -0.15, 0]}>
      {/* Base slab */}
      <RoundedBox args={[width, 0.3, depth]} radius={0.08} smoothness={4} position={[0, -0.15, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#2a2418" roughness={0.6} metalness={0.1} clearcoat={0.3} />
      </RoundedBox>
      {/* Top inlay */}
      <RoundedBox args={[width - 0.2, 0.05, depth - 0.2]} radius={0.04} smoothness={4} position={[0, 0.02, 0]} receiveShadow>
        <meshStandardMaterial color="#3a3020" roughness={0.8} />
      </RoundedBox>
      {/* Column rods + labels */}
      {Array.from({ length: COLUMNS }).map((_, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, MAX_PIECES * PIECE_HEIGHT * 0.5 + 0.05, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, MAX_PIECES * PIECE_HEIGHT + 0.1, 12]} />
              <meshStandardMaterial color="#c9a86a" metalness={0.8} roughness={0.25} />
            </mesh>
            <Text
              position={[x === 0 ? 0 : 0, 0.06, depth / 2 - 0.18]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.22}
              color="#e8d9b0"
              anchorX="center"
              anchorY="middle"
            >
              {String(i + 1)}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function Stacks({ values, runId }: { values: number[]; runId: number }) {
  return (
    <>
      {values.map((v, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const count = Math.max(0, Math.min(MAX_PIECES, Math.round(v)));
        const pieces = [];
        for (let k = 0; k < count; k++) {
          const y = PIECE_HEIGHT / 2 + k * PIECE_HEIGHT + 0.05;
          pieces.push(
            <Piece
              key={`${runId}-${i}-${k}`}
              x={x}
              targetY={y}
              delay={i * 0.08 + k * 0.05}
              hue={(i / COLUMNS) * 0.8}
            />
          );
        }
        return <group key={i}>{pieces}</group>;
      })}
    </>
  );
}

function Scene({ values, runId }: { values: number[]; runId: number }) {
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
      <Stacks values={values} runId={runId} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={22}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1, 0]}
      />
    </>
  );
}

export default function CalculusAbacus() {
  const [formula, setFormula] = useState("2x + 3");
  const [values, setValues] = useState<number[]>(Array(COLUMNS).fill(0));
  const [runId, setRunId] = useState(0);
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
      <Canvas shadows camera={{ position: [0, 6, 14], fov: 45 }} dpr={[1, 2]}>
        <Scene values={values} runId={runId} />
      </Canvas>

      {/* Header */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 p-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">An abacus for</p>
          <h1 className="mt-1 font-serif text-4xl font-semibold text-foreground md:text-5xl">
            Calculus
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Type a formula. Each column is <span className="text-primary">x</span>, the stack height is{" "}
            <span className="text-primary">y</span>.
          </p>
        </div>
      </div>

      {/* Formula input */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            compute(formula);
          }}
          className="mx-auto flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card/80 p-2 shadow-2xl backdrop-blur-md"
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
        {error ? (
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-destructive">{error}</p>
        ) : (
          <p className="mx-auto mt-3 max-w-xl text-center text-xs text-muted-foreground">
            Try: <button onClick={() => { setFormula("x^2"); compute("x^2"); }} className="text-primary hover:underline">x^2</button>{" · "}
            <button onClick={() => { setFormula("2x + 3"); compute("2x + 3"); }} className="text-primary hover:underline">2x + 3</button>{" · "}
            <button onClick={() => { setFormula("sqrt(x)*4"); compute("sqrt(x)*4"); }} className="text-primary hover:underline">sqrt(x)*4</button>{" · "}
            <button onClick={() => { setFormula("sin(x)+5"); compute("sin(x)+5"); }} className="text-primary hover:underline">sin(x)+5</button>
          </p>
        )}
      </div>
    </div>
  );
}
