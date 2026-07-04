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
const DARK_GREY = "#4a4a4a";
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
            position={[x, -0.3, depth / 2 - 0.25]}
            rotation={[0, 0, 0]}
            fontSize={0.32}
            renderOrder={2}
            color="#f5e8c8"
            anchorX="center"
            anchorY="middle"
            material-depthTest={false}
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
  if (abs !== 0 && (abs < 0.0001 || abs >= 10000)) return n.toExponential(1);
  const r = Math.round(n * 100000) / 100000;
  return String(r);
}

function Stacks({
  orange,
  red,
  shift,
  redGap,
  runId,
  highlight,
  increment,
}: {
  orange: number[];
  red: number[];
  shift: number[];
  redGap: number[];
  runId: number;
  highlight: { i: number; color: "orange" | "red" } | null;
  increment: number;
}) {
  const threshold = increment / 2;
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
        if (yFrac > threshold) {
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
        const rNeg = rVal < 0;
        const rAbs = Math.abs(rVal);
        const redStoneColor = rNeg ? DARK_GREY : RED;
        const rFull = Math.floor(rAbs);
        const rFrac = rAbs - rFull;
        const redBase = yFull + (yFrac > threshold ? 1 : 0) + gap;
        for (let k = 0; k < rFull; k++) {
          pieces.push(
            <Piece
              key={`r-${runId}-${i}-${k}`}
              x={x}
              fromY={skyY + 2}
              targetY={slotY(redBase + k + off)}
              delay={i * 0.04 + (redBase + k) * 0.02}
              color={redStoneColor}
              dim={rDim}
              highlighted={rH}
            />,
          );
        }
        if (rFrac > threshold) {
          const baseY = slotY(redBase + rFull + off) - PIECE_HEIGHT / 2;
          const targetY = baseY + (PIECE_HEIGHT * rFrac) / 2;
          pieces.push(
            <Piece
              key={`rf-${runId}-${i}`}
              x={x}
              fromY={skyY + 2}
              targetY={targetY}
              delay={i * 0.04 + (redBase + rFull) * 0.02}
              color={redStoneColor}
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
        const top = PIECE_HEIGHT * (Math.abs(v) + off) + 0.05;
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
  increment,
}: {
  orange: number[];
  red: number[];
  shift: number[];
  redGap: number[];
  onDrag: (i: number, color: "orange" | "red", delta: number) => void;
  setDragging: (b: boolean) => void;
  onHover: (h: { i: number; color: "orange" | "red" } | null) => void;
  increment: number;
}) {
  const threshold = increment / 2;
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
        const oAbs = Math.abs(oVal);
        const rAbs = Math.abs(rVal);
        const oCount = Math.floor(oAbs) + (oAbs - Math.floor(oAbs) > threshold ? 1 : 0);
        const rCount = Math.floor(rAbs) + (rAbs - Math.floor(rAbs) > threshold ? 1 : 0);
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
  increment,
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
  increment: number;
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
          increment={increment}
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
          increment={increment}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </group>
      <CameraController trigger={zoomTrigger} />
      <OrbitControls
        enabled={!dragging}
        enableRotate={false}
        enablePan={true}
        minDistance={8}
        maxDistance={50}
        target={[0, 7, 0]}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
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
  const [formula, setFormula] = useState("x^3");
  const [midpoint, setMidpoint] = useState("5");
  const [increment, setIncrement] = useState("0.5");
  const [maxStones, setMaxStones] = useState("50");

  const [xValues, setXValues] = useState<number[]>(
    Array.from({ length: COLUMNS }, (_, i) => i - 5),
  );
  const [unit, setUnit] = useState(1);
  const [orange, setOrange] = useState<number[]>(Array(COLUMNS).fill(0));
  const [yRaw, setYRaw] = useState<number[]>(Array(COLUMNS).fill(0));
  const [red, setRed] = useState<number[]>(Array(COLUMNS).fill(0));
  const [shift, setShift] = useState<number[]>(Array(COLUMNS).fill(0));
  const [redGap, setRedGap] = useState<number[]>(Array(COLUMNS).fill(0));
  const [runId, setRunId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showLine, setShowLine] = useState(false);
  const [fractional, setFractional] = useState(false);
  const [leftCompare, setLeftCompare] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [zoomTrigger, setZoomTrigger] = useState({ dir: 0, n: 0 });
  const [panY, setPanY] = useState(-1.0);
  const [uiHidden, setUiHidden] = useState(true);
  const [highlight, setHighlight] = useState<{ i: number; color: "orange" | "red" } | null>(null);
  const zoom = (dir: 1 | -1) => setZoomTrigger((z) => ({ dir, n: z.n + 1 }));

  // Drag handler: orange and red move independently, but pushing into
  // the other color shoves it in the same direction.
  const dragColor = (i: number, color: "orange" | "red", delta: number) => {
    if (color === "orange") {
      // Orange moves: upper stack (red or dark-grey) stays put → compensate
      // via redGap. If gap hits 0, remaining shift carries the upper stack.
      setShift((curShift) => {
        const oldOff = curShift[i];
        const newOff = Math.max(0, Math.min(MAX_PIECES, oldOff + delta));
        const actualDelta = newOff - oldOff;
        if (actualDelta === 0) return curShift;
        setRedGap((arr) => {
          const next = arr.slice();
          if (actualDelta < 0) {
            // orange moved down → grow gap to keep upper stack in place
            next[i] = Math.max(0, Math.min(MAX_PIECES * 2, arr[i] - actualDelta));
          } else {
            // orange moved up → shrink gap up to its current size
            const reduce = Math.min(arr[i], actualDelta);
            next[i] = arr[i] - reduce;
          }
          return next;
        });
        const next = curShift.slice();
        next[i] = newOff;
        return next;
      });
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

  const firstRunRef = useRef(true);
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
      const yMin = Math.min(...ys);
      const yMax = Math.max(...ys);
      const ms = Math.max(25, Math.min(80, Math.round(Number(maxStones)) || 50));
      const avail = Math.min(ms, MAX_PIECES);
      // Special case: y = constant (all sampled y values are identical).
      const isConstant = ys.every((y) => y === ys[0]);
      let u: number;
      let counts: number[];
      if (isConstant) {
        const a = ys[0];
        u = Math.abs(a) <= ms ? 1 : Math.abs(a) / ms;
        counts = ys.map((y) => {
          const raw = y / u;
          const v = fractional ? raw : Math.round(raw);
          return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
        });
      } else {
        const maxAbs = Math.max(Math.abs(yMin), Math.abs(yMax), 1e-9);
        u = maxAbs / avail;
        counts = ys.map((y) => {
          const raw = y / u;
          const v = fractional ? raw : Math.round(raw);
          return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
        });
      }
      setXValues(xs);
      setUnit(u);
      setOrange(counts);
      setYRaw(ys);
      if (firstRunRef.current) {
        const initialRed = ys.map((y, i) => {
          const d = leftCompare
            ? i === 0 ? 0 : y - ys[i - 1]
            : i === ys.length - 1 ? 0 : ys[i + 1] - y;
          const raw = d / u;
          const v = fractional ? raw : Math.round(raw);
          return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
        });
        setRed(initialRed);
        firstRunRef.current = false;
      } else {
        setRed(Array(COLUMNS).fill(0));
      }
      setShift(Array(COLUMNS).fill(0));
      setRedGap(Array(COLUMNS).fill(0));
      setRunId((r) => r + 1);
      setError(null);
    } catch {
      setError("Check your formula, midpoint, and increment.");
    }
  };

  const calcDiff = () => {
    const r = yRaw.map((y, i) => {
      const d = leftCompare
        ? i === 0 ? 0 : y - yRaw[i - 1]
        : i === yRaw.length - 1 ? 0 : yRaw[i + 1] - y;
      const raw = unit === 0 ? 0 : d / unit;
      const v = fractional ? raw : Math.round(raw);
      return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
    });
    setRed(r);
  };

  useEffect(() => {
    const t = setTimeout(setup, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fill when max stones changes so the unit label stays in sync
  const skipRefillRef = useRef(true);
  useEffect(() => {
    if (skipRefillRef.current) {
      skipRefillRef.current = false;
      return;
    }
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxStones, fractional]);

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
    fractional ? (Math.round(v * 100) / 100).toFixed(2) : String(Math.round(v));

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
          increment={Number(increment) || 0.5}
        />
      </Canvas>

      {/* Header */}
      <div className="pointer-events-none absolute left-6 top-[10%] z-10 w-[260px]">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            The Calculus Abacus
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.4em] text-muted-foreground">an abacus for differences</p>
        </div>
      </div>

      {/* Per-column controls */}
      {!uiHidden && (
        <div className="pointer-events-none absolute left-6 top-[40%] z-10 w-fit">
          <div className="pointer-events-auto flex flex-col gap-1 rounded-2xl border border-border bg-card/70 p-2 shadow-2xl backdrop-blur-md">
            <p className="px-2 text-sm text-muted-foreground">
              One <span className="text-[#ff932a]">size-stone</span> = <span className="font-mono text-foreground">{formatNum(unit)}</span>.
            </p>
            <div className="grid grid-cols-[2.5rem_5.5rem_5.5rem_4.5rem] items-center gap-2 px-2 py-1 text-[10px] font-bold text-muted-foreground">
              <div>x</div>
              <div className="flex items-center justify-center gap-1">
                <div className="h-5 w-5" />
                <div className="w-10 text-center text-[#ff932a]">Size</div>
                <div className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="h-5 w-5" />
                <div className="w-10 text-center text-[#e8352c]">Change-Size</div>
                <div className="h-5 w-5" />
              </div>
              <div className="text-right">Slope estimate</div>
            </div>
            {xValues.map((xv, i) => (
              <div
                key={i}
                className="grid grid-cols-[2.5rem_5.5rem_5.5rem_4.5rem] items-center gap-2 rounded-lg bg-background/40 px-2 py-1 text-[10px]"
              >
                <div className="font-mono text-foreground">{formatNum(xv)}</div>
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => bump(setOrange, i, fractional ? -0.1 : -1, -MAX_PIECES)}
                    className="h-5 w-5 rounded bg-[#ff932a]/80 font-bold text-white hover:bg-[#ff932a]"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-mono text-foreground">
                    {fmtCount(orange[i])}
                  </span>
                  <button
                    onClick={() => bump(setOrange, i, fractional ? 0.1 : 1, -MAX_PIECES)}
                    className="h-5 w-5 rounded bg-[#ff932a]/80 font-bold text-white hover:bg-[#ff932a]"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => bump(setRed, i, fractional ? -0.1 : -1, -MAX_PIECES)}
                    className="h-5 w-5 rounded bg-[#e8352c]/80 font-bold text-white hover:bg-[#e8352c]"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-mono text-foreground">
                    {fmtCount(red[i])}
                  </span>
                  <button
                    onClick={() => bump(setRed, i, fractional ? 0.1 : 1, -MAX_PIECES)}
                    className="h-5 w-5 rounded bg-[#e8352c]/80 font-bold text-white hover:bg-[#e8352c]"
                  >
                    +
                  </button>
                </div>
                <div className="whitespace-nowrap text-right font-mono text-foreground">
                  {formatNum((red[i] ?? 0) * unit / (Number(increment) || 1))}
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
            className="pointer-events-auto h-12 rounded-full border border-border bg-card/80 px-5 text-base text-foreground shadow-lg backdrop-blur-md transition hover:bg-card"
          >
            Show panels
          </button>
          <button
            onClick={() => setShowHelp(true)}
            className="pointer-events-auto h-12 w-12 rounded-full border border-border bg-card/80 font-serif text-2xl text-foreground shadow-lg backdrop-blur-md transition hover:bg-card"
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
                The Calculus Abacus lets you explore curves, rates of change, and areas using stacks of stones.
              </p>
              <p>
                The <span className="text-[#ff932a]">orange stones</span> (or size-stones) represent values of <span className="font-mono text-primary">y</span> along a curve. The <span className="text-[#e8352c]">red stones</span> (or change-size-stones) represent the differences between neighboring columns of orange stones. One can experiment by inputting succesively smaller increments.  By observing the results, one can think about approaching a limit as the increment approaches zero or imagine what would happen if the increment were infinitely small--two ways of describing a central idea behind calculus.
              </p>
              <p>The abacus can be used to:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Visualize the shape of a curve</li>
                <li>Estimate the slope of a tangent line</li>
                <li>Explore how differentials or derivatives emerge from differences</li>
                <li>Estimate the area under a curve</li>
                <li>Experiment with an unlimited variety of curves</li>
              </ul>
              <h3 className="font-serif text-lg text-foreground pt-2">Getting Started</h3>
              <p>
                Click <strong>"Show Panels"</strong> to reveal the input controls.
              </p>
              <p>
                Enter an equation and choose a midpoint and increment. Click on <strong>"Fill Board"</strong>.
              </p>
              <p>
                The abacus displays 11 columns centered on the selected midpoint.
              </p>
              <p>
                Click <strong>"Add Red Stones"</strong> to display the differences between neighboring columns.
              </p>
              <p>
                Drag red stones up into the empty area to form a new curve.
              </p>
              <h3 className="font-serif text-lg text-foreground pt-2">How the Orange Stones Work</h3>
              <p>
                Each of the 11 columns represents a <span className="font-mono text-primary">y</span>-value for each <span className="font-mono text-primary">x</span>. The columns are centered on the chosen midpoint and spaced according to the selected increment.
              </p>
              <p>
                The abacus automatically determines how many orange stones belong in each column. To do this, it finds the minimum and maximum of the 11 <span className="font-mono text-primary">y</span>-values and scales the display so that no column exceeds the maximum number of stones.
              </p>
              <p>
                For every column the app evaluates <span className="font-mono text-primary">f(x)</span> to get 11 <span className="font-mono text-primary">y</span>-values. Suppose we choose to limit the number of stones in any one column to 50. We find the min and max of the 11 <span className="font-mono text-primary">y</span>-values and pick a unit so that one orange stone is worth <span className="font-mono">(max − min) / 50</span>. The number of orange stones in each column represents <span className="font-mono">f(x) − min</span>.
              </p>
              <p>
                Only the differences between columns matter, so using the minimum value as a baseline makes efficient use of the available stones.
              </p>
              <p>Negative size values are represented by black stones.</p>
              <h3 className="font-serif text-lg text-foreground pt-2">How the Red Stones Work</h3>
              <p>
                When you click <strong>"Add Red Stones,"</strong> the app places red stones next to each column.
              </p>
              <p>The number of red stones represents:</p>
              <p className="font-mono text-center">f(x + Δx) − f(x)</p>
              <p>
                The red stones show how much the function changes as you move one increment to the right. Negative change-size values are represented by dark grey stones.
              </p>
              <p>
                You can move the red stones to form a second curve above the orange curve. This red curve represents differences in the <span className="font-mono text-primary">y</span>-values for points along the curve rather than the <span className="font-mono text-primary">y</span>-values themselves.
              </p>
              <h3 className="font-serif text-lg text-foreground pt-2">Estimating the Slope of a Tangent</h3>
              <p>The red stones can be used to estimate the slope of a tangent line.</p>
              <p>For a particular column:</p>
              <ol className="list-decimal space-y-1 pl-6">
                <li>Count the red stones.</li>
                <li>Multiply by the value represented by one orange stone.</li>
                <li>Divide by the increment.</li>
              </ol>
              <p>
                As the increment becomes smaller and smaller, the estimate becomes increasingly close to the true slope of the tangent.
              </p>
              <h3 className="font-serif text-lg text-foreground pt-2">Interacting with the Abacus</h3>
              <p>
                <strong>"Connect stones"</strong> draws a smooth trace through the tops of the orange stacks, making the shape of the curve easier to see.
              </p>
              <p>
                The <strong>+</strong> and <strong>−</strong> buttons let you add or remove stones manually.
              </p>
              <p>
                You can also drag the orange or red portion of any column. The two colors move independently, but if one stack is pushed into the other, both stacks move together.
              </p>
              
              <p>The abacus supports increments as small as 0.001 and as many as 80 stones per column.</p>
              <p className="pt-4 text-sm text-muted-foreground">
                Created by Cliff Landesman, <a href="mailto:cliff.landesman@gmail.com" className="underline">cliff.landesman@gmail.com</a>. Creative Commons BY license 2026
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
          className="absolute right-4 top-1/2 z-10 flex w-64 -translate-y-1/2 flex-col gap-3 rounded-2xl border border-border bg-card/80 p-3 shadow-2xl backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card font-serif text-2xl leading-none text-foreground hover:bg-muted"
            title="How does this work?"
          >
            ?
          </button>
          <label className="flex items-center gap-2 pr-16">
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
              min={0.001}
              step={0.001}
              value={increment}
              onChange={(e) => {
                  const v = e.target.value;
                  const n = Number(v);
                  setIncrement(Number.isFinite(n) && n < 0.001 ? "0.001" : v);
              }}
              onBlur={() => {
                const n = Number(increment);
                if (!Number.isFinite(n) || n < 0.001) setIncrement("0.001");
              }}
              className="w-20 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />

          </label>
          <label className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-muted-foreground">max stones</span>
            <input
              type="number"
              min={25}
              max={80}
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
            Fill Board
          </button>
          <button
            type="button"
            onClick={calcDiff}
            className="rounded-xl border border-[#e8352c] bg-[#e8352c]/90 px-4 py-2 font-medium text-white transition hover:bg-[#e8352c]"
          >
            Add Red Stones
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
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={fractional}
                onChange={(e) => setFractional(e.target.checked)}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className="text-foreground">Fractional stones</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={leftCompare}
                onChange={(e) => setLeftCompare(e.target.checked)}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className="text-foreground">Lefthand comparison</span>
            </label>
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
