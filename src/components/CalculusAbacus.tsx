import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox, Line } from "@react-three/drei";
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

const ORANGE = "#ff932a";
const ORANGE_LIGHT = "#ffb56a";
const ORANGE_DARK = "#dc5800";
const BLACK = "#1a1a1a";
const RED = "#e8352c";
const LINE_COLOR = "#7dd3fc";

let _orangeGradTex: THREE.CanvasTexture | null = null;
function getOrangeGradTex(): THREE.CanvasTexture {
  if (!_orangeGradTex) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 0, 64);
    grad.addColorStop(0, ORANGE_LIGHT);
    grad.addColorStop(0.5, ORANGE);
    grad.addColorStop(1, ORANGE_DARK);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1, 64);
    _orangeGradTex = new THREE.CanvasTexture(canvas);
  }
  return _orangeGradTex;
}

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
  dim = false,
  highlighted = false,
}: {
  x: number;
  fromY: number;
  targetY: number;
  delay: number;
  color: string;
  heightScale?: number;
  dim?: boolean;
  highlighted?: boolean;
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

  const isOrange = color === ORANGE;
  const c = useMemo(
    () => (isOrange ? new THREE.Color(1, 1, 1) : new THREE.Color(color)),
    [color, isOrange],
  );
  const emissive = useMemo(() => new THREE.Color(color), [color]);

  return (
    <group ref={ref}>
      <RoundedBox
        args={[PIECE_WIDTH, PIECE_HEIGHT, PIECE_DEPTH]}
        radius={0.08}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          map={isOrange ? getOrangeGradTex() : undefined}
          color={c}
          roughness={0.45}
          metalness={0}
          clearcoat={0.2}
          clearcoatRoughness={0.4}
          emissive={emissive}
          emissiveIntensity={highlighted ? 0.55 : isOrange ? 0.4 : 0.25}
          transparent
          opacity={dim ? 0.25 : 1}
          fog={!highlighted}
        />
      </RoundedBox>
    </group>
  );
}

function Board({ xValues }: { xValues: number[] }) {
  const width = COLUMNS * COL_SPACING + 0.6;
  const depth = 1.6;
  const sepThickness = 0.22;
  const sepHeight = SEPARATOR_HEIGHT;
  const sepDepth = depth - 0.3;
  const backThickness = 0.08;
  return (
    <group position={[0, -0.15, 0]}>
      <RoundedBox
        args={[width, 0.3, depth]}
        radius={0.08}
        smoothness={4}
        position={[0, -0.15, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial color="#6b4423" roughness={0.75} metalness={0.05} clearcoat={0.25} clearcoatRoughness={0.5} />
      </RoundedBox>
      <RoundedBox
        args={[width - 0.2, 0.05, depth - 0.2]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#8b5a2b" roughness={0.85} />
      </RoundedBox>
      <RoundedBox
        args={[width, sepHeight, backThickness]}
        radius={0.04}
        smoothness={4}
        position={[0, sepHeight / 2 + 0.05, -depth / 2 + backThickness / 2 + 0.05]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#7a4e26" roughness={0.9} metalness={0.03} />
      </RoundedBox>
      {Array.from({ length: COLUMNS + 1 }).map((_, i) => {
        const x = (i - COLUMNS / 2) * COL_SPACING;
        return (
          <RoundedBox
            key={`sep-${i}`}
            args={[sepThickness, sepHeight, sepDepth]}
            radius={0.04}
            smoothness={4}
            position={[x, sepHeight / 2 + 0.05, 0.05]}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial color="#9c6b3a" roughness={0.8} metalness={0.04} clearcoat={0.2} clearcoatRoughness={0.6} />
          </RoundedBox>
        );
      })}
      {xValues.map((xv, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const label = formatNum(xv);
        return (
          <Text
            key={`lbl-${i}`}
            position={[x, 0.06, depth / 2 - 0.25]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.32}
            renderOrder={2}
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
  redGap,
  runId,
  highlight,
}: {
  orange: number[];
  red: number[];
  shift: number[];
  redGap: number[];
  runId: number;
  highlight: { i: number; color: "orange" | "red" } | null;
}) {
  const skyY = MAX_PIECES * PIECE_HEIGHT + 4;
  return (
    <>
      {orange.map((yVal, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const off = shift[i] ?? 0;
        const gap = redGap[i] ?? 0;
        const pieces: ReactNode[] = [];
        const oH = highlight?.i === i && highlight.color === "orange";
        const rH = highlight?.i === i && highlight.color === "red";
        const oDim = highlight !== null && !oH;
        const rDim = highlight !== null && !rH;

        const neg = yVal < 0;
        const absVal = Math.abs(yVal);
        const stoneColor = neg ? BLACK : ORANGE;
        const yFull = Math.floor(absVal);
        const yFrac = absVal - yFull;
        for (let k = 0; k < yFull; k++) {
          pieces.push(
            <Piece
              key={`y-${runId}-${i}-${k}`}
              x={x}
              fromY={skyY}
              targetY={slotY(k + off)}
              delay={i * 0.04 + k * 0.02}
              color={stoneColor}
              dim={oDim}
              highlighted={oH}
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
              color={stoneColor}
              heightScale={yFrac}
              dim={oDim}
              highlighted={oH}
            />,
          );
        }

        const rVal = red[i] ?? 0;
        const rFull = Math.floor(rVal);
        const rFrac = rVal - rFull;
        const redBase = yFull + (yFrac > 0.01 ? 1 : 0) + gap;
        for (let k = 0; k < rFull; k++) {
          pieces.push(
            <Piece
              key={`r-${runId}-${i}-${k}`}
              x={x}
              fromY={skyY + 2}
              targetY={slotY(redBase + k + off)}
              delay={i * 0.04 + (redBase + k) * 0.02}
              color={RED}
              dim={rDim}
              highlighted={rH}
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
              dim={rDim}
              highlighted={rH}
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
  orange,
  red,
  shift,
  redGap,
  onDrag,
  setDragging,
  onHover,
}: {
  orange: number[];
  red: number[];
  shift: number[];
  redGap: number[];
  onDrag: (i: number, color: "orange" | "red", delta: number) => void;
  setDragging: (b: boolean) => void;
  onHover: (h: { i: number; color: "orange" | "red" } | null) => void;
}) {
  const { camera, gl } = useThree();
  const dragRef = useRef<{
    i: number;
    color: "orange" | "red";
    startY: number;
    accSlots: number;
    cleanup: () => void;
  } | null>(null);

  const planeZ = PIECE_DEPTH / 2 + 0.05;
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), -planeZ), [planeZ]);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const pointerWorldY = (clientX: number, clientY: number) => {
    const rect = gl.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(ndc, camera);
    const point = new THREE.Vector3();
    if (!raycaster.ray.intersectPlane(plane, point)) return null;
    return point.y;
  };

  const makeHandlers = (i: number, color: "orange" | "red") => ({
    onPointerDown: (e: PointerEvent) => {
      e.stopPropagation();
      const startY = pointerWorldY(e.clientX, e.clientY);
      if (startY == null) return;
      setDragging(true);
      document.body.style.cursor = "grabbing";

      const onMove = (ev: PointerEvent) => {
        const cur = dragRef.current;
        if (!cur) return;
        const y = pointerWorldY(ev.clientX, ev.clientY);
        if (y == null) return;
        const totalSlots = Math.round((y - cur.startY) / PIECE_HEIGHT);
        const delta = totalSlots - cur.accSlots;
        if (delta !== 0) {
          onDrag(cur.i, cur.color, delta);
          cur.accSlots = totalSlots;
        }
      };
      const onUp = () => {
        if (dragRef.current) dragRef.current.cleanup();
        dragRef.current = null;
        setDragging(false);
        document.body.style.cursor = "";
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      const cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
      dragRef.current = { i, color, startY, accSlots: 0, cleanup };
    },
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      onHover({ i, color });
      if (!dragRef.current) document.body.style.cursor = "grab";
    },
    onPointerOut: () => {
      onHover(null);
      if (!dragRef.current) document.body.style.cursor = "";
    },
  });

  // Wider hit area + min handle height so 2-3 piece stacks are easy to grab
  const HIT_W = PIECE_WIDTH * 1.35;
  const HIT_D = PIECE_DEPTH * 1.6;
  const MIN_H = PIECE_HEIGHT * 6;

  return (
    <>
      {Array.from({ length: COLUMNS }).map((_, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const oVal = orange[i] ?? 0;
        const rVal = red[i] ?? 0;
        const oCount = Math.floor(oVal) + (oVal - Math.floor(oVal) > 0.01 ? 1 : 0);
        const rCount = Math.floor(rVal) + (rVal - Math.floor(rVal) > 0.01 ? 1 : 0);
        const off = shift[i] ?? 0;
        const gap = redGap[i] ?? 0;

        const orangeTopY = slotY(oCount + off) - PIECE_HEIGHT / 2;
        const minY = 0.05;
        const maxY = SEPARATOR_HEIGHT + 0.05;

        // Orange handle covers floor → top of orange (or whole column if no orange)
        let oTop = oCount > 0 ? orangeTopY : rCount > 0 ? minY : maxY;
        const oBottom = minY;
        if (oCount > 0 && oTop - oBottom < MIN_H) {
          // grow upward (cap before red zone) so small stacks are still grabbable
          const cap = rCount > 0 ? oTop + (MIN_H - (oTop - oBottom)) * 0.5 : oTop + MIN_H;
          oTop = Math.min(cap, maxY);
        }
        const oHeight = Math.max(0.1, oTop - oBottom);
        const oCenter = (oTop + oBottom) / 2;

        // Red handle covers from top of orange upward
        const rBottom = oCount > 0 ? orangeTopY : minY;
        const redTopY = slotY(oCount + gap + rCount + off) - PIECE_HEIGHT / 2;
        let rTop = rCount > 0 ? redTopY : oCount > 0 ? maxY : maxY;
        if (rCount > 0 && rTop - rBottom < MIN_H) {
          rTop = Math.min(rBottom + MIN_H, maxY);
        }
        const rHeight = Math.max(0.1, rTop - rBottom);
        const rCenter = (rTop + rBottom) / 2;

        return (
          <group key={`drag-${i}`}>
            {oCount > 0 && (
              <mesh position={[x, oCenter, PIECE_DEPTH / 2 + 0.05]} {...makeHandlers(i, "orange")}>
                <boxGeometry args={[HIT_W, oHeight, HIT_D]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            )}
            {rCount > 0 && (
              <mesh position={[x, rCenter, PIECE_DEPTH / 2 + 0.05]} {...makeHandlers(i, "red")}>
                <boxGeometry args={[HIT_W, rHeight, HIT_D]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            )}
          </group>
        );
      })}
    </>
  );
}

function Scene({
  orange,
  red,
  shift,
  redGap,
  xValues,
  runId,
  showLine,
  onDrag,
  setDragging,
  dragging,
  brightness,
  zoomTrigger,
  panY,
  highlight,
  onHover,
}: {
  orange: number[];
  red: number[];
  shift: number[];
  redGap: number[];
  xValues: number[];
  runId: number;
  showLine: boolean;
  onDrag: (i: number, color: "orange" | "red", delta: number) => void;
  setDragging: (b: boolean) => void;
  dragging: boolean;
  brightness: number;
  zoomTrigger: { dir: number; n: number };
  panY: number;
  highlight: { i: number; color: "orange" | "red" } | null;
  onHover: (h: { i: number; color: "orange" | "red" } | null) => void;
}) {
  return (
    <>
      <color attach="background" args={["#1c2238"]} />
      <fogExp2 attach="fog" args={["#1c2238", 0.01]} />
      <ambientLight intensity={0.85 * brightness} />
      <hemisphereLight args={["#ffffff", "#3a4060", 0.6 * brightness]} />
      <directionalLight
        position={[6, 20, 8]}
        intensity={2.0 * brightness}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-6, 5, -4]} intensity={0.7 * brightness} color="#a8c0ff" />
      <group position={[0, -panY, 0]}>
        <Board xValues={xValues} />
        <Stacks
          orange={orange}
          red={red}
          shift={shift}
          redGap={redGap}
          runId={runId}
          highlight={highlight}
        />
        {showLine && <ConnectingLine orange={orange} shift={shift} />}
        <DragHandles
          orange={orange}
          red={red}
          shift={shift}
          redGap={redGap}
          onDrag={onDrag}
          setDragging={setDragging}
          onHover={onHover}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </group>
      <CameraController trigger={zoomTrigger} />
      <OrbitControls
        enabled={!dragging}
        enablePan={true}
        minDistance={8}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 7, 0]}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
      />
    </>
  );
}

function CameraController({ trigger }: { trigger: { dir: number; n: number } }) {
  const { camera } = useThree();
  const last = useRef(trigger.n);
  const target = useMemo(() => new THREE.Vector3(0, 7, 0), []);
  useEffect(() => {
    if (trigger.n === last.current) return;
    last.current = trigger.n;
    const factor = trigger.dir > 0 ? 0.85 : 1.18;
    const offset = camera.position.clone().sub(target).multiplyScalar(factor);
    const dist = offset.length();
    const clamped = Math.min(50, Math.max(8, dist));
    offset.setLength(clamped);
    camera.position.copy(target).add(offset);
  }, [trigger, camera, target]);
  return null;
}

export default function CalculusAbacus() {
  const [formula, setFormula] = useState("(x^2 + x) / 2");
  const [midpoint, setMidpoint] = useState("5");
  const [increment, setIncrement] = useState("1");
  const [maxStones, setMaxStones] = useState("55");

  const [xValues, setXValues] = useState<number[]>(
    Array.from({ length: COLUMNS }, (_, i) => i - 5),
  );
  const [unit, setUnit] = useState(1);
  const [orange, setOrange] = useState<number[]>(Array(COLUMNS).fill(0));
  const [red, setRed] = useState<number[]>(Array(COLUMNS).fill(0));
  const [shift, setShift] = useState<number[]>(Array(COLUMNS).fill(0));
  const [redGap, setRedGap] = useState<number[]>(Array(COLUMNS).fill(0));
  const [runId, setRunId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showLine, setShowLine] = useState(false);
  const fractional = false;
  const [showHelp, setShowHelp] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [zoomTrigger, setZoomTrigger] = useState({ dir: 0, n: 0 });
  const [panY, setPanY] = useState(-1.0);
  const [uiHidden, setUiHidden] = useState(false);
  const [highlight, setHighlight] = useState<{ i: number; color: "orange" | "red" } | null>(null);
  const zoom = (dir: 1 | -1) => setZoomTrigger((z) => ({ dir, n: z.n + 1 }));

  // Drag handler: orange and red move independently, but pushing into
  // the other color shoves it in the same direction.
  const dragColor = (i: number, color: "orange" | "red", delta: number) => {
    if (color === "orange") {
      if (delta > 0) {
        // Orange moving up: red rides along (relative position preserved)
        setShift((arr) => {
          const next = arr.slice();
          next[i] = Math.max(0, Math.min(MAX_PIECES, next[i] + delta));
          return next;
        });
      } else {
        // Orange moving down: red stays in place → compensate via redGap.
        // Clamp shift at 0 so stones never sink below the board, and only
        // compensate redGap by the amount the orange actually moved.
        setShift((curShift) => {
          const oldOff = curShift[i];
          const newOff = Math.max(0, Math.min(MAX_PIECES, oldOff + delta));
          const actualDelta = newOff - oldOff;
          if (actualDelta === 0) return curShift;
          setRedGap((arr) => {
            const next = arr.slice();
            next[i] = Math.max(0, Math.min(MAX_PIECES * 2, next[i] - actualDelta));
            return next;
          });
          const next = curShift.slice();
          next[i] = newOff;
          return next;
        });
      }
    } else {
      // Red drag
      if (delta > 0) {
        // Red moving up: just grows the gap, orange stays
        setRedGap((arr) => {
          const next = arr.slice();
          next[i] = Math.max(0, Math.min(MAX_PIECES * 2, next[i] + delta));
          return next;
        });
      } else {
        // Red moving down: shrink the gap; if it would go negative,
        // push orange down by the overflow (but not below the board).
        setRedGap((curGap) => {
          setShift((curShift) => {
            const newGap = curGap[i] + delta;
            if (newGap < 0) {
              const push = newGap; // negative
              const next = curShift.slice();
              next[i] = Math.max(0, Math.min(MAX_PIECES, next[i] + push));
              return next;
            }
            return curShift;
          });
          const next = curGap.slice();
          next[i] = Math.max(0, Math.min(MAX_PIECES * 2, next[i] + delta));
          return next;
        });
      }
    }
  };

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
      const ms = Math.max(25, Math.min(100, Math.round(Number(maxStones)) || 50));
      const avail = Math.min(ms, MAX_PIECES);
      const u = niceUnit(maxAbs / avail);
      const counts = ys.map((y) => {
        const raw = y / u;
        const v = fractional ? raw : Math.round(raw);
        return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
      });
      setXValues(xs);
      setUnit(u);
      setOrange(counts);
      setRed(Array(COLUMNS).fill(0));
      setShift(Array(COLUMNS).fill(0));
      setRedGap(Array(COLUMNS).fill(0));
      setRunId((r) => r + 1);
      setError(null);
    } catch {
      setError("Check your formula, midpoint, and increment.");
    }
  };

  const calcDiff = () => {
    const r = orange.map((v, i) => (i === orange.length - 1 ? 0 : Math.abs(orange[i + 1] - v)));
    setRed(r);
  };

  useEffect(() => {
    const t = setTimeout(setup, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fill when max stones changes so the unit label stays in sync
  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxStones]);

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
      <Canvas shadows camera={{ position: [0, 8, 23.6], fov: 45 }} dpr={[1, 2]}>
        <Scene
          orange={orange}
          red={red}
          shift={shift}
          redGap={redGap}
          xValues={xValues}
          runId={runId}
          showLine={showLine}
          onDrag={dragColor}
          setDragging={setDragging}
          dragging={dragging}
          brightness={brightness}
          zoomTrigger={zoomTrigger}
          panY={panY}
          highlight={highlight}
          onHover={setHighlight}
        />
      </Canvas>

      {/* Header */}
      <div className="pointer-events-none absolute left-6 top-[10%] z-10 w-[260px]">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">An abacus for</p>
          <h1 className="mt-2 font-serif text-5xl font-semibold leading-none text-foreground md:text-6xl">
            Calculus
          </h1>
        </div>
      </div>

      {/* Per-column controls */}
      {!uiHidden && (
        <div className="pointer-events-none absolute left-6 top-[40%] z-10 w-[260px]">
          <div className="pointer-events-auto flex flex-col gap-1 rounded-2xl border border-border bg-card/70 p-2 shadow-2xl backdrop-blur-md">
            {xValues.map((xv, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-background/40 px-2 py-1 text-[10px]"
              >
                <div className="w-12 font-mono text-foreground">x={formatNum(xv)}</div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => bump(setOrange, i, fractional ? -0.1 : -1, -MAX_PIECES)}
                    className="h-5 w-5 rounded bg-[#ff932a]/80 font-bold text-white hover:bg-[#ff932a]"
                  >
                    −
                  </button>
                  <span className="w-7 text-center font-mono text-foreground">
                    {fmtCount(orange[i])}
                  </span>
                  <button
                    onClick={() => bump(setOrange, i, fractional ? 0.1 : 1, -MAX_PIECES)}
                    className="h-5 w-5 rounded bg-[#ff932a]/80 font-bold text-white hover:bg-[#ff932a]"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => bump(setRed, i, fractional ? -0.1 : -1)}
                    className="h-5 w-5 rounded bg-[#e8352c]/80 font-bold text-white hover:bg-[#e8352c]"
                  >
                    −
                  </button>
                  <span className="w-7 text-center font-mono text-foreground">
                    {fmtCount(red[i])}
                  </span>
                  <button
                    onClick={() => bump(setRed, i, fractional ? 0.1 : 1)}
                    className="h-5 w-5 rounded bg-[#e8352c]/80 font-bold text-white hover:bg-[#e8352c]"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating show button when panels hidden */}
      {uiHidden && (
        <div className="absolute right-4 top-4 z-20 flex flex-col items-end gap-2">
          <button
            onClick={() => setUiHidden(false)}
            className="pointer-events-auto h-9 rounded-full border border-border bg-card/80 px-3 text-xs text-foreground shadow-lg backdrop-blur-md transition hover:bg-card"
          >
            Show panels
          </button>
          <button
            onClick={() => setShowHelp(true)}
            className="pointer-events-auto h-9 w-9 rounded-full border border-border bg-card/80 font-serif text-lg text-foreground shadow-lg backdrop-blur-md transition hover:bg-card"
            title="How does this work?"
          >
            ?
          </button>
        </div>
      )}



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
                <span className="font-mono text-primary">x</span> centered on your <em>midpoint</em>
                , spaced by your <em>increment</em>.
              </p>
              <p>
                For every column we evaluate{" "}
                <span className="font-mono text-primary">y = f(x)</span> to get{" "}
                <span className="font-mono">11</span> y-values. Suppose we choose to limit the number of stones in any one column to 50. We find the{" "}
                <span className="font-mono">min</span> and <span className="font-mono">max</span> of the 11 y-values{" "}
                and pick a unit so that one <span className="text-[#ff932a]">orange stone</span> is
                worth <span className="font-mono">(max − min) / 50</span>. The number of orange stones in
                each column is <span className="font-mono">f(x) − min</span>. Only the{" "}
                <em>differences</em> between columns matter, so anchoring to the minimum makes more
                efficient use of the stones.
              </p>
              <p>
                The button <strong>add red stones</strong> drops{" "}
                <span className="text-[#e8352c]">red stones</span> next to each column equal to{" "}
                <span className="font-mono">|y(x + Δx) − y(x)|</span> — the discrete difference to
                the right.
              </p>
              <p>
                One can slide the red stones up into the empy space above the orange stones and
                algin the bottom of each stack. This represents a new curve, a red curve of
                differences. To find the slope of the tangent for a particular value of x,
                multiply the number of red stones in the corresponding column by the value of one orange stone and divide by the
                increment.
              </p>
              <p>
                <strong>Connect stones</strong> traces a curve through the tops of
                the orange stacks so the shape of <span className="font-mono">f(x)</span> jumps out.
                The <strong>±</strong> buttons add or remove stones by hand, and you can{" "}
                <strong>drag the orange or red zone</strong> of any column to slide it. The two
                colors move independently, but pushing one into the other shoves both together.
              </p>
            </div>
          </div>
        </div>
      )}

      {!uiHidden && error && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Right-side equation / inputs panel */}
      {!uiHidden && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setup();
          }}
          className="absolute right-4 top-1/2 z-10 flex w-72 -translate-y-1/2 flex-col gap-3 rounded-2xl border border-border bg-card/80 p-3 shadow-2xl backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="absolute right-2 top-2 h-7 w-7 rounded-full border border-border bg-card font-serif text-foreground hover:bg-muted"
            title="How does this work?"
          >
            ?
          </button>
          <p className="text-xs text-muted-foreground">
            One orange stone = <span className="font-mono text-primary">{formatNum(unit)}</span>.
          </p>
          <label className="flex items-center gap-2">
            <span className="font-serif text-lg text-primary">y =</span>
            <input
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="(x^2 + x) / 2"
              className="flex-1 min-w-0 rounded-md bg-background/50 px-2 py-2 font-mono text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <label className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-muted-foreground">midpoint</span>
            <input
              value={midpoint}
              onChange={(e) => setMidpoint(e.target.value)}
              className="w-20 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />
          </label>
          <label className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-muted-foreground">increment</span>
            <input
              type="number"
              min={0.05}
              step={0.05}
              value={increment}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "") return setIncrement(v);
                const n = Number(v);
                setIncrement(Number.isFinite(n) && n < 0.05 ? "0.05" : v);
              }}
              onBlur={(e) => {
                const n = Number(e.target.value);
                if (!Number.isFinite(n) || n < 0.05) setIncrement("0.05");
              }}
              className="w-20 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />
          </label>
          <label className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-muted-foreground">max stones</span>
            <input
              type="number"
              min={25}
              max={100}
              step={1}
              value={maxStones}
              onChange={(e) => setMaxStones(e.target.value)}
              className="w-20 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />
          </label>
          <button
            type="submit"
            className="rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Fill board
          </button>
          <button
            type="button"
            onClick={calcDiff}
            className="rounded-xl border border-[#e8352c] bg-[#e8352c]/90 px-4 py-2 font-medium text-white transition hover:bg-[#e8352c]"
          >
            Add red stones
          </button>
          {error && <p className="text-center text-sm text-destructive">{error}</p>}
          <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3 text-xs">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={showLine}
                onChange={(e) => setShowLine(e.target.checked)}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className="text-foreground">Connect stones</span>
            </label>
            <div className="flex flex-col gap-1 border-t border-border/60 pt-2">
              <label className="flex items-center justify-between gap-2">
                <span className="text-foreground">Brightness</span>
                <span className="font-mono text-muted-foreground">{brightness.toFixed(1)}×</span>
              </label>
              <input
                type="range"
                min={0.2}
                max={2}
                step={0.1}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="accent-primary"
              />
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-2">
              <span className="text-foreground">Zoom</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => zoom(-1)}
                  className="h-6 w-6 rounded bg-muted font-bold text-foreground hover:bg-muted/80"
                  title="Zoom out"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => zoom(1)}
                  className="h-6 w-6 rounded bg-muted font-bold text-foreground hover:bg-muted/80"
                  title="Zoom in"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1 border-t border-border/60 pt-2">
              <label className="flex items-center justify-between gap-2">
                <span className="text-foreground">Vertical pan</span>
                <span className="font-mono text-muted-foreground">{panY.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min={-3}
                max={5}
                step={0.1}
                value={panY}
                onChange={(e) => setPanY(Number(e.target.value))}
                className="accent-primary"
              />
            </div>
            <div className="border-t border-border/60 pt-2">
              <button
                type="button"
                onClick={() => setUiHidden(true)}
                className="w-full rounded bg-muted px-2 py-1 text-foreground hover:bg-muted/80"
              >
                Hide panels
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
