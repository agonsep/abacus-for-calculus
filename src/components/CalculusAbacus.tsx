import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { evaluate } from "mathjs";
import { evalDual, formatDual, parseIncrement } from "@/lib/dual";
import * as THREE from "three";

const COLUMNS = 11;
const COL_SPACING = 1.375;
const PIECE_HEIGHT = 0.18;
const PIECE_WIDTH = 1.1875;
const PIECE_DEPTH = 1.1875 / 1.618;
const MAX_PIECES = 100;
const SEPARATOR_HEIGHT = MAX_PIECES * PIECE_HEIGHT + 0.2;
const BOARD_CENTER_Y = SEPARATOR_HEIGHT / 2 + 0.05;

const ORANGE = "#ff932a";
const ORANGE_LIGHT = "#ffb56a";
const ORANGE_DARK = "#dc5800";
const BLACK = "#1a1a1a";
const DARK_GREY = "#4a4a4a";
const RED = "#e8352c";
const BLUE = "#2563eb";
const LIGHT_BLUE = "#60a5fa";
const LINE_COLOR = "#7dd3fc";
const TANGENT_COLOR = "#facc15";

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

/** Leibniz Mode: the orange dy stones rest on a shelf at this slot. */
const LEIBNIZ_SHELF_SLOT = 52;
const SHELF_THICKNESS = 0.12;
/** How many stone slots the dy layer has above the shelf. */
const LEIBNIZ_DY_SPACE = MAX_PIECES - LEIBNIZ_SHELF_SLOT;
/** World-space top face of the shelf (the plane the orange stones sit on). */
function shelfTopY() {
  return slotY(LEIBNIZ_SHELF_SLOT) - PIECE_HEIGHT / 2;
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
  instant = false,
}: {
  x: number;
  fromY: number;
  targetY: number;
  delay: number;
  color: string;
  heightScale?: number;
  dim?: boolean;
  highlighted?: boolean;
  instant?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const start = useRef(performance.now() / 1000 + delay);
  const instantRef = useRef(instant);

  useFrame(() => {
    if (!ref.current) return;
    if (instantRef.current) {
      ref.current.position.set(x, targetY, 0);
      ref.current.scale.set(1, heightScale, 1);
      return;
    }
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

function Board({
  xValues,
  xW,
  defined,
  leibniz = false,
}: {
  xValues: number[];
  xW: number[];
  defined: boolean[];
  leibniz?: boolean;
}) {
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
      {leibniz && (
        <RoundedBox
          args={[width, SHELF_THICKNESS, sepDepth + 0.1]}
          radius={0.03}
          smoothness={4}
          position={[0, shelfTopY() - SHELF_THICKNESS / 2, 0.05]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#9c6b3a"
            roughness={0.8}
            metalness={0.04}
            clearcoat={0.2}
            clearcoatRoughness={0.6}
          />
        </RoundedBox>
      )}
      {xValues.map((_, i) => {
        if (defined[i] !== false) return null;
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        return (
          <mesh key={`undef-${i}`} position={[x, sepHeight / 2 + 0.05, 0.05]}>
            <boxGeometry args={[COL_SPACING - sepThickness, sepHeight, sepDepth - 0.05]} />
            <meshStandardMaterial color="#8a8a8a" transparent opacity={0.28} roughness={1} depthWrite={false} />
          </mesh>
        );
      })}
      {xValues.map((xv, i) => {
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const label = formatDual(xv, xW[i] ?? 0, formatNum);
        return (
          <Text
            key={`lbl-${i}`}
            position={[x, -0.3, depth / 2 - 0.25]}
            rotation={[0, 0, 0]}
            fontSize={0.32}
            renderOrder={2}
            color={defined[i] === false ? "#9a9a9a" : "#f5e8c8"}
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

function computeCounts(
  ys: number[],
  def: boolean[],
  fractional: boolean,
  maxStones: string,
) {
  const definedYs = ys.filter((_, i) => def[i]);
  if (definedYs.length === 0) return null;
  const yMin = Math.min(...definedYs);
  const yMax = Math.max(...definedYs);
  const ms = Math.max(25, Math.min(100, Math.round(Number(maxStones)) || 50));
  const avail = Math.min(ms, MAX_PIECES);
  const isConstant = definedYs.every((y) => y === definedYs[0]);
  if (isConstant) {
    const a = definedYs[0];
    const u = Math.abs(a) <= ms ? 1 : Math.abs(a) / ms;
    const counts = ys.map((y, i) => {
      if (!def[i]) return 0;
      const raw = y / u;
      const v = fractional ? raw : Math.round(raw);
      return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
    });
    return { u, floor: 0, counts };
  }
  const allPositive = definedYs.every((y) => y > 0);
  const range = Math.max(yMax - yMin, 1e-9);
  const u = range / avail;
  if (allPositive) {
    const counts = ys.map((y, i) => {
      if (!def[i]) return 0;
      const raw = (y - yMin) / u;
      const v = fractional ? raw : Math.round(raw);
      return Math.max(0, Math.min(MAX_PIECES, v));
    });
    return { u, floor: yMin, counts };
  }
  // Signed values or all negative: keep 0 as the floor so negatives become black stones.
  const counts = ys.map((y, i) => {
    if (!def[i]) return 0;
    const raw = y / u;
    const v = fractional ? raw : Math.round(raw);
    return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
  });
  return { u, floor: 0, counts };
}

/** Exact derivative when the dual evaluator supports the formula, else numeric. */
function derivAt(cleaned: string, x: number): number | null {
  try {
    const r = evalDual(cleaned, { a: x, b: 1 });
    if (isFinite(r.b)) return r.b;
  } catch {
    /* fall through to a numeric derivative */
  }
  try {
    const eps = Math.max(1e-7, Math.abs(x) * 1e-7);
    const yp = evaluate(cleaned, { x: x + eps });
    const ym = evaluate(cleaned, { x: x - eps });
    if (typeof yp === "number" && typeof ym === "number" && isFinite(yp) && isFinite(ym)) {
      return (yp - ym) / (2 * eps);
    }
  } catch {
    /* not differentiable here */
  }
  return null;
}

/** Cap for Max Stones while Leibniz Mode is on, leaving the upper half for dy. */
const LEIBNIZ_MAX_STONES = 50;

/**
 * Leibniz layout: red stones as usual (capped at 50), orange stones showing
 * dy = f'(x)·dx in the *same* unit. Shrinks the unit further if a stack would
 * overflow the board.
 */
function computeLeibnizLayout(
  ys: number[],
  def: boolean[],
  dyVals: (number | null)[],
  fractional: boolean,
  maxStones: string,
) {
  let ms = Math.max(25, Math.min(LEIBNIZ_MAX_STONES, Math.round(Number(maxStones)) || LEIBNIZ_MAX_STONES));
  let last: { u: number; floor: number; counts: number[]; dyCounts: number[] } | null = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = computeCounts(ys, def, fractional, String(ms));
    if (!res) return null;
    const dyCounts = dyVals.map((d, i) => {
      if (!def[i] || d === null || !isFinite(d) || res.u === 0) return 0;
      const raw = d / res.u;
      const v = fractional ? raw : Math.round(raw);
      return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
    });
    last = { u: res.u, floor: res.floor, counts: res.counts, dyCounts };
    let maxDy = 0;
    for (let i = 0; i < ys.length; i++) maxDy = Math.max(maxDy, Math.abs(dyCounts[i]));
    if (maxDy <= LEIBNIZ_DY_SPACE || ms <= 25) return last;
    const next = Math.max(25, Math.floor((ms * LEIBNIZ_DY_SPACE) / maxDy));
    if (next >= ms) return last;
    ms = next;
  }
  return last;
}




export type AnimState = {
  /** size-stone counts shown on the board while animating */
  size: number[];
  /** change-stone counts shown on the board while animating */
  change: number[];
  /** slot index where each column's change stack starts */
  changeBase: number[];
  /** slot index a change stack falls from when its base moves */
  changeFrom: number[];
  /** render this column's change stones with the size palette */
  asSize: boolean[];
};

function Stacks({
  size,
  change,
  shift,
  changeGap,
  runId,
  highlight,
  defined,
  anim = null,
  instant = false,
  leibniz = false,
}: {
  size: number[];
  change: number[];
  shift: number[];
  changeGap: number[];
  runId: number;
  highlight: { i: number; color: "size" | "change" } | null;
  defined: boolean[];
  anim?: AnimState | null;
  instant?: boolean;
  leibniz?: boolean;
}) {
  const skyY = MAX_PIECES * PIECE_HEIGHT + 4;
  const sizeArr = anim ? anim.size : size;
  const changeArr = anim ? anim.change : change;
  return (
    <>
      {sizeArr.map((yVal, i) => {
        if (defined[i] === false) return null;
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;

        const off = anim ? 0 : (shift[i] ?? 0);
        const gap = anim ? 0 : (changeGap[i] ?? 0);
        const pieces: ReactNode[] = [];
        const oH = !anim && highlight?.i === i && highlight.color === "size";
        const rH = !anim && highlight?.i === i && highlight.color === "change";
        const oDim = !anim && highlight !== null && !oH;
        const rDim = !anim && highlight !== null && !rH;

        const neg = yVal < 0;
        const absVal = Math.abs(yVal);
        const stoneColor = neg ? BLACK : RED;
        const yFull = Math.floor(absVal);
        for (let k = 0; k < yFull; k++) {
          pieces.push(
            <Piece
              key={`y-${runId}-${i}-${k}`}
              x={x}
              fromY={skyY}
              targetY={slotY(k + off)}
              delay={anim ? 0 : i * 0.04 + k * 0.02}
              color={stoneColor}
              dim={oDim}
              highlighted={oH}
              instant={instant}
            />,
          );
        }

        const rVal = changeArr[i] ?? 0;
        const rNeg = rVal < 0;
        const rAbs = Math.abs(rVal);
        const asSize = anim ? anim.asSize[i] : false;
        const changeStoneColor = asSize
          ? rNeg
            ? BLACK
            : RED
          : rNeg
            ? DARK_GREY
            : ORANGE;
        const rFull = Math.floor(rAbs);
        const changeBase = leibniz ? LEIBNIZ_SHELF_SLOT : anim ? anim.changeBase[i] : yFull + gap;
        const changeFrom = anim && !leibniz ? anim.changeFrom[i] : changeBase;
        const changeOff = leibniz ? 0 : off;
        for (let k = 0; k < rFull; k++) {
          pieces.push(
            <Piece
              key={`r-${runId}-${i}-${k}-${changeBase}`}
              x={x}
              fromY={anim && !leibniz ? slotY(changeFrom + k) : skyY + 2}
              targetY={slotY(changeBase + k + changeOff)}
              delay={anim ? 0 : i * 0.04 + (changeBase + k) * 0.02}
              color={changeStoneColor}
              dim={rDim}
              highlighted={rH}
              instant={instant}
            />,
          );
        }

        return <group key={i}>{pieces}</group>;
      })}
    </>
  );
}

function ConnectingLine({
  size,
  shift,
  defined,
}: {
  size: number[];
  shift: number[];
  defined: boolean[];
}) {
  const segments = useMemo<[number, number, number][][]>(() => {
    const segs: [number, number, number][][] = [];
    let cur: [number, number, number][] = [];
    size.forEach((v, i) => {
      if (defined[i] === false) {
        if (cur.length) segs.push(cur);
        cur = [];
        return;
      }
      const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
      const off = shift[i] ?? 0;
      const top = PIECE_HEIGHT * (Math.floor(Math.abs(v)) + off) + 0.05;
      cur.push([x, top + 0.04, PIECE_DEPTH / 2 + 0.02]);
    });
    if (cur.length) segs.push(cur);
    return segs;
  }, [size, shift, defined]);
  const dots = segments.flat();
  if (!dots.length) return null;
  return (
    <>
      {segments.map((pts, s) =>
        pts.length >= 2 ? <Line key={`seg-${s}`} points={pts} color={LINE_COLOR} lineWidth={3} /> : null,
      )}
      {dots.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={LINE_COLOR} emissive={LINE_COLOR} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </>
  );
}

function TangentLine({
  size,
  shift,
  increment,
  unit,
  tangentSlope,
  defined,
}: {
  size: number[];
  shift: number[];
  increment: number;
  unit: number;
  tangentSlope: number;
  defined: boolean[];
}) {
  const points = useMemo<[number, number, number][]>(() => {
    if (unit === 0 || increment === 0 || !isFinite(tangentSlope)) return [];
    const mid = Math.floor(COLUMNS / 2);
    if (defined[mid] === false) return [];
    const off = shift[mid] ?? 0;
    const midCount = Math.floor(Math.abs(size[mid])) + off;
    return size.map((_, i) => {
      const x = (i - mid) * COL_SPACING;
      const stoneOffset = (tangentSlope * increment) / unit * (i - mid);
      const count = midCount + stoneOffset;
      const y = PIECE_HEIGHT * count + 0.05;
      return [x, y + 0.04, PIECE_DEPTH / 2 + 0.02];
    });
  }, [size, shift, increment, unit, tangentSlope, defined]);
  if (points.length < 2) return null;
  return <Line points={points} color={TANGENT_COLOR} lineWidth={3} />;
}


function DragHandles({
  size,
  change,
  shift,
  changeGap,
  onDrag,
  setDragging,
  onHover,
  defined,
  leibniz = false,
}: {
  size: number[];
  change: number[];
  shift: number[];
  changeGap: number[];
  onDrag: (i: number, color: "size" | "change", delta: number) => void;
  setDragging: (b: boolean) => void;
  onHover: (h: { i: number; color: "size" | "change" } | null) => void;
  defined: boolean[];
  leibniz?: boolean;
}) {
  const { camera, gl } = useThree();
  const dragRef = useRef<{
    i: number;
    color: "size" | "change";
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

  const makeHandlers = (i: number, color: "size" | "change") => ({
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
        if (defined[i] === false) return null;
        const x = (i - (COLUMNS - 1) / 2) * COL_SPACING;
        const oVal = size[i] ?? 0;
        const rVal = change[i] ?? 0;
        const oAbs = Math.abs(oVal);
        const rAbs = Math.abs(rVal);
        const oCount = Math.floor(oAbs);
        const rCount = Math.floor(rAbs);
        const off = shift[i] ?? 0;
        const gap = changeGap[i] ?? 0;

        const sizeTopY = slotY(oCount + off) - PIECE_HEIGHT / 2;
        const minY = 0.05;
        const maxY = SEPARATOR_HEIGHT + 0.05;

        // Size handle covers floor → top of size stack (or whole column if no size stack)
        let oTop = oCount > 0 ? sizeTopY : rCount > 0 ? minY : maxY;
        const oBottom = minY;
        if (oCount > 0 && oTop - oBottom < MIN_H) {
          // grow upward (cap before change zone) so small stacks are still grabbable
          const cap = rCount > 0 ? oTop + (MIN_H - (oTop - oBottom)) * 0.5 : oTop + MIN_H;
          oTop = Math.min(cap, maxY);
        }
        const oHeight = Math.max(0.1, oTop - oBottom);
        const oCenter = (oTop + oBottom) / 2;

        // Change handle covers from top of size stack upward
        const rBottom = oCount > 0 ? sizeTopY : minY;
        const changeTopY = slotY(oCount + gap + rCount + off) - PIECE_HEIGHT / 2;
        let rTop = rCount > 0 ? changeTopY : oCount > 0 ? maxY : maxY;
        if (rCount > 0 && rTop - rBottom < MIN_H) {
          rTop = Math.min(rBottom + MIN_H, maxY);
        }
        const rHeight = Math.max(0.1, rTop - rBottom);
        const rCenter = (rTop + rBottom) / 2;

        return (
          <group key={`drag-${i}`}>
            {oCount > 0 && (
              <mesh position={[x, oCenter, PIECE_DEPTH / 2 + 0.05]} {...makeHandlers(i, "size")}>
                <boxGeometry args={[HIT_W, oHeight, HIT_D]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            )}
            {rCount > 0 && !leibniz && (
              <mesh position={[x, rCenter, PIECE_DEPTH / 2 + 0.05]} {...makeHandlers(i, "change")}>
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
  size,
  change,
  shift,
  changeGap,
  xValues,
  xW,
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
  unit,
  tangentSlope,
  defined,
  anim,
  instant,
  leibniz,
}: {
  size: number[];
  change: number[];
  shift: number[];
  changeGap: number[];
  xValues: number[];
  xW: number[];
  runId: number;
  showLine: boolean;
  onDrag: (i: number, color: "size" | "change", delta: number) => void;
  setDragging: (b: boolean) => void;
  dragging: boolean;
  brightness: number;
  zoomTrigger: { dir: number; n: number };
  panY: number;
  highlight: { i: number; color: "size" | "change" } | null;
  onHover: (h: { i: number; color: "size" | "change" } | null) => void;
  increment: number;
  unit: number;
  tangentSlope: number;
  defined: boolean[];
  anim: AnimState | null;
  instant: boolean;
  leibniz: boolean;
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
        <Board xValues={xValues} xW={xW} defined={defined} leibniz={leibniz} />
        <Stacks
          size={size}
          change={change}
          shift={shift}
          changeGap={changeGap}
          runId={runId}
          highlight={highlight}
          defined={defined}
          anim={anim}
          instant={instant}
          leibniz={leibniz}
        />
        {showLine && !anim && (
          <>
            <ConnectingLine size={size} shift={shift} defined={defined} />
            <TangentLine
              size={size}
              shift={shift}
              increment={Number(increment)}
              unit={unit}
              tangentSlope={tangentSlope}
              defined={defined}
            />
          </>
        )}
        {!anim && (
          <DragHandles
            size={size}
            change={change}
            shift={shift}
            changeGap={changeGap}
            onDrag={onDrag}
            setDragging={setDragging}
            onHover={onHover}
            defined={defined}
            leibniz={leibniz}
          />
        )}

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
        target={[0, BOARD_CENTER_Y, 0]}
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
  const target = useMemo(() => new THREE.Vector3(0, BOARD_CENTER_Y, 0), []);
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
  const [formula, setFormula] = useState("x^2");
  const [midpoint, setMidpoint] = useState("5");
  const [increment, setIncrement] = useState("1");
  const [maxStones, setMaxStones] = useState("100");

  const [xValues, setXValues] = useState<number[]>(
    Array.from({ length: COLUMNS }, (_, i) => i - 5),
  );
  const [xW, setXW] = useState<number[]>(Array(COLUMNS).fill(0));
  const [wMode, setWMode] = useState(false);
  const [wBase, setWBase] = useState(0);
  const [unit, setUnit] = useState(1);
  const [size, setSize] = useState<number[]>(Array(COLUMNS).fill(0));
  const [yRaw, setYRaw] = useState<number[]>(Array(COLUMNS).fill(0));
  const [change, setChange] = useState<number[]>(Array(COLUMNS).fill(0));
  const [shift, setShift] = useState<number[]>(Array(COLUMNS).fill(0));
  const [changeGap, setChangeGap] = useState<number[]>(Array(COLUMNS).fill(0));
  const [floorValue, setFloorValue] = useState(0);
  const [runId, setRunId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [defined, setDefined] = useState<boolean[]>(Array(COLUMNS).fill(true));

  const [showLine, setShowLine] = useState(false);
  const [fractional, setFractional] = useState(false);
  const [leftCompare, setLeftCompare] = useState(false);
  const [slopeHighPrecision, setSlopeHighPrecision] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [zoomTrigger, setZoomTrigger] = useState({ dir: 0, n: 0 });
  const [panY, setPanY] = useState(0);
  const [uiHidden, setUiHidden] = useState(true);
  const [highlight, setHighlight] = useState<{ i: number; color: "size" | "change" } | null>(null);
  const [level, setLevel] = useState(0);
  const [leibniz, setLeibniz] = useState(false);
  const [dyValues, setDyValues] = useState<number[]>(Array(COLUMNS).fill(0));
  const [dyDefined, setDyDefined] = useState<boolean[]>(Array(COLUMNS).fill(false));
  const [deltaValues, setDeltaValues] = useState<number[]>(Array(COLUMNS).fill(0));
  const [deltaDefined, setDeltaDefined] = useState<boolean[]>(Array(COLUMNS).fill(false));
  const leibnizSnap = useRef<{
    size: number[];
    change: number[];
    shift: number[];
    changeGap: number[];
    unit: number;
    floorValue: number;
    maxStones: string;
  } | null>(null);
  const skipMaxRefill = useRef(false);
  const levelStack = useRef<
    {
      yRaw: number[];
      size: number[];
      change: number[];
      shift: number[];
      changeGap: number[];
      unit: number;
      floorValue: number;
      defined: boolean[];
      wBase: number;
      showLine: boolean;
    }[]
  >([]);


  const [anim, setAnim] = useState<AnimState | null>(null);
  const [instant, setInstant] = useState(false);
  const animTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishRef = useRef<(() => void) | null>(null);

  const zoom = (dir: 1 | -1) => setZoomTrigger((z) => ({ dir, n: z.n + 1 }));

  type Promotion = {
    newYRaw: number[];
    newDefined: boolean[];
    counts: number[];
    u: number;
    floor: number;
  };

  const computePromotion = (): Promotion | string => {
    if (wMode) return "Difference Curve cannot be used with the infinitesimal increment w.";
    if (!change.some((v) => v !== 0)) return "No change-size stones to promote.";
    if (shift.some((v) => v !== 0) || changeGap.some((v) => v !== 0))
      return "Restore the stones to their original positions before removing stones.";
    if (showLine) return "Uncheck Midpoint Tangent before removing stones.";
    const newYRaw: number[] = [];
    const newDefined: boolean[] = [];
    for (let i = 0; i < COLUMNS; i++) {
      const j = leftCompare ? i - 1 : i + 1;
      if (j < 0 || j >= COLUMNS || !defined[i] || !defined[j]) {
        newYRaw.push(0);
        newDefined.push(false);
      } else {
        const d = leftCompare ? yRaw[i] - yRaw[j] : yRaw[j] - yRaw[i];
        newYRaw.push(d / incValue);
        newDefined.push(true);
      }
    }
    const res = computeCounts(newYRaw, newDefined, fractional, maxStones);
    if (!res) return "Could not promote: all columns are undefined.";
    return { newYRaw, newDefined, counts: res.counts, u: res.u, floor: res.floor };
  };

  const commitPromotion = (p: Promotion) => {
    levelStack.current.push({
      yRaw: yRaw.slice(),
      size: size.slice(),
      change: change.slice(),
      shift: shift.slice(),
      changeGap: changeGap.slice(),
      unit,
      floorValue,
      defined: defined.slice(),
      wBase,
      showLine,
    });
    setYRaw(p.newYRaw);
    setDefined(p.newDefined);
    setUnit(p.u);
    setFloorValue(p.floor);
    setSize(p.counts);
    setChange(Array(COLUMNS).fill(0));
    setShift(Array(COLUMNS).fill(0));
    setChangeGap(Array(COLUMNS).fill(0));
    setShowLine(false);
    setLevel((l) => l + 1);
    setError(null);
    setNote(null);
  };

  const snapshot = (s: AnimState): AnimState => ({
    size: s.size.slice(),
    change: s.change.slice(),
    changeBase: s.changeBase.slice(),
    changeFrom: s.changeFrom.slice(),
    asSize: s.asSize.slice(),
  });

  const startPromotionAnimation = (p: Promotion) => {
    const base = size.map((v) => Math.floor(Math.abs(v)));
    const state: AnimState = {
      size: size.slice(),
      change: change.slice(),
      changeBase: base.slice(),
      changeFrom: base.slice(),
      asSize: Array(COLUMNS).fill(false),
    };
    const steps: (() => void)[] = [];
    // Step 1 — clear the size stones, column by column
    for (let i = 0; i < COLUMNS; i++) {
      steps.push(() => {
        state.size[i] = 0;
      });
    }
    // Step 2a — drop each change stack to the board floor
    for (let i = 0; i < COLUMNS; i++) {
      steps.push(() => {
        state.changeFrom[i] = state.changeBase[i];
        state.changeBase[i] = 0;
      });
    }
    // Step 2b — adjust the count, then recolor
    for (let i = 0; i < COLUMNS; i++) {
      steps.push(() => {
        state.change[i] = p.newDefined[i] ? p.counts[i] : 0;
      });
      steps.push(() => {
        state.asSize[i] = true;
      });
    }

    let idx = 0;
    const finish = () => {
      if (animTimer.current) clearInterval(animTimer.current);
      animTimer.current = null;
      finishRef.current = null;
      setInstant(true);
      setAnim(null);
      commitPromotion(p);
    };
    finishRef.current = finish;

    setError(null);
    setNote(null);
    setInstant(false);
    setAnim(snapshot(state));
    animTimer.current = setInterval(() => {
      if (idx >= steps.length) {
        finish();
        return;
      }
      steps[idx++]();
      setAnim(snapshot(state));
    }, 130);
  };

  // Skip the transition on a click or Esc; always clean the timer up.
  useEffect(() => {
    if (!anim) return;
    const skip = () => finishRef.current?.();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, [anim]);

  useEffect(
    () => () => {
      if (animTimer.current) clearInterval(animTimer.current);
    },
    [],
  );

  // Only the pieces that appear at the moment of the commit skip their entry.
  useEffect(() => {
    if (!instant) return;
    const t = setTimeout(() => setInstant(false), 250);
    return () => clearTimeout(t);
  }, [instant]);


  const promoteLevel = () => {
    const p = computePromotion();
    if (typeof p === "string") {
      setError(p);
      setNote(null);
      return;
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInstant(false);
      setRunId((r) => r + 1);
      commitPromotion(p);
      return;
    }
    startPromotionAnimation(p);
  };


  const demoteLevel = () => {
    if (levelStack.current.length === 0) return;
    const snap = levelStack.current.pop()!;
    setYRaw(snap.yRaw);
    setSize(snap.size);
    setChange(snap.change);
    setShift(snap.shift);
    setChangeGap(snap.changeGap);
    setUnit(snap.unit);
    setFloorValue(snap.floorValue);
    setDefined(snap.defined);
    setWBase(snap.wBase);
    setShowLine(snap.showLine);
    setLevel((l) => l - 1);
    setRunId((r) => r + 1);

    setError(null);
    setNote(null);
  };


  const tangentSlope = useMemo(() => {
    try {
      const cleaned = formula.replace(/^\s*y\s*=\s*/i, "");
      const m = Number(midpoint);
      if (!isFinite(m)) return 0;
      try {
        return evalDual(cleaned, { a: m, b: 1 }).b;
      } catch {
        /* fall back to a numeric derivative below */
      }
      const eps = Math.max(1e-7, Math.abs(m) * 1e-7);
      const yPlus = evaluate(cleaned, { x: m + eps });
      const yMinus = evaluate(cleaned, { x: m - eps });
      if (typeof yPlus !== "number" || !isFinite(yPlus) || typeof yMinus !== "number" || !isFinite(yMinus)) return 0;
      return (yPlus - yMinus) / (2 * eps);
    } catch {
      return 0;
    }
  }, [formula, midpoint]);

  // Drag handler: size and change stacks move independently, but pushing into
  // the other color shoves it in the same direction.
  const dragColor = (i: number, color: "size" | "change", delta: number) => {
    if (color === "size") {
      // Size moves: upper stack (change or dark-grey) stays put → compensate
      // via changeGap. If gap hits 0, remaining shift carries the upper stack.
      setShift((curShift) => {
        const oldOff = curShift[i];
        const newOff = Math.max(0, Math.min(MAX_PIECES, oldOff + delta));
        const actualDelta = newOff - oldOff;
        if (actualDelta === 0) return curShift;
        setChangeGap((arr) => {
          const next = arr.slice();
          if (actualDelta < 0) {
            // size stack moved down → grow gap to keep upper stack in place
            next[i] = Math.max(0, Math.min(MAX_PIECES * 2, arr[i] - actualDelta));
          } else {
            // size stack moved up → shrink gap up to its current size
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
      // Change drag
      if (delta > 0) {
        // Change moving up: just grows the gap, size stack stays
        setChangeGap((arr) => {
          const next = arr.slice();
          next[i] = Math.max(0, Math.min(MAX_PIECES * 2, next[i] + delta));
          return next;
        });
      } else {
        // Change moving down: shrink the gap; if it would go negative,
        // push size stack down by the overflow (but not below the board).
        setChangeGap((curGap) => {
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
  const setup = (opts?: { leibniz?: boolean; maxStones?: string }) => {
    const lb = opts?.leibniz ?? leibniz;
    const ms = opts?.maxStones ?? maxStones;
    try {
      const cleaned = formula.replace(/^\s*y\s*=\s*/i, "");
      const m = Number(midpoint);
      const inc = parseIncrement(increment);
      if (!isFinite(m) || !inc) throw new Error("bad m/h");
      const h = inc.value;
      const isW = inc.infinitesimal;
      const xs: number[] = [];
      const xws: number[] = [];
      const ys: number[] = [];
      const def: boolean[] = [];
      let parseFailures = 0;
      let base = 0;
      let approx = false;
      if (isW) {
        // Infinitesimal step: every column shares the real part f(m) and
        // differs only in its w-coefficient, which is (i - 5) * h * f'(m).
        let deriv = 0;
        try {
          const r = evalDual(cleaned, { a: m, b: 1 });
          base = r.a;
          deriv = r.b;
        } catch {
          const eps = Math.max(1e-7, Math.abs(m) * 1e-7);
          const y0 = evaluate(cleaned, { x: m });
          const yp = evaluate(cleaned, { x: m + eps });
          const ym = evaluate(cleaned, { x: m - eps });
          if (
            typeof y0 !== "number" ||
            typeof yp !== "number" ||
            typeof ym !== "number"
          ) {
            throw new Error("all undefined");
          }
          base = y0;
          deriv = (yp - ym) / (2 * eps);
          approx = true;
        }
        if (!isFinite(base) || !isFinite(deriv)) throw new Error("all undefined");
        for (let i = 0; i < COLUMNS; i++) {
          xs.push(m);
          xws.push((i - 5) * h);
          ys.push((i - 5) * h * deriv);
          def.push(true);
        }
      } else {
        for (let i = 0; i < COLUMNS; i++) {
          const xv = m + (i - 5) * h;
          let y: unknown;
          try {
            y = evaluate(cleaned, { x: xv });
          } catch {
            y = null;
            parseFailures++;
          }
          const ok = typeof y === "number" && isFinite(y);
          xs.push(xv);
          xws.push(0);
          ys.push(ok ? (y as number) : 0);
          def.push(ok);
        }
      }
      // Leibniz Mode: orange stones are dy = f'(x)·dx, in the same unit as red.
      const dyVals: (number | null)[] = lb
        ? xs.map((xv, i) => {
            if (!def[i]) return null;
            const d = derivAt(cleaned, isW ? m : xv);
            return d === null ? null : d * h;
          })
        : [];
      // delta-y = f(x + dx) − f(x), the true forward difference.
      const deltaVals: (number | null)[] = lb
        ? xs.map((xv, i) => {
            if (!def[i]) return null;
            if (isW) return dyVals[i];
            try {
              const yn = evaluate(cleaned, { x: xv + h });
              if (typeof yn !== "number" || !isFinite(yn)) return null;
              return yn - ys[i];
            } catch {
              return null;
            }
          })
        : [];
      const lay = lb ? computeLeibnizLayout(ys, def, dyVals, fractional, ms) : null;
      const res: { u: number; floor: number; counts: number[] } | null = lb
        ? lay
        : computeCounts(ys, def, fractional, ms);
      if (!res) {
        throw new Error(parseFailures === COLUMNS ? "bad formula" : "all undefined");
      }
      setFloorValue(res.floor);
      setWMode(isW);
      setWBase(isW ? base : 0);
      setXValues(xs);
      setXW(xws);
      setDefined(def);
      setUnit(res.u);
      setSize(res.counts);
      setYRaw(ys);
      // Reset the difference-level machinery on every fresh fill.
      setLevel(0);
      levelStack.current = [];
      if (lb && lay) {
        setChange(lay.dyCounts);
        setDyValues(dyVals.map((v) => v ?? 0));
        setDyDefined(dyVals.map((v, i) => def[i] && v !== null));
        setDeltaValues(deltaVals.map((v) => v ?? 0));
        setDeltaDefined(deltaVals.map((v, i) => def[i] && v !== null));
        firstRunRef.current = false;
      } else if (firstRunRef.current) {
        const initialChange = ys.map((y, i) => {
          const j = leftCompare ? i - 1 : i + 1;
          if (j < 0 || j >= ys.length || !def[i] || !def[j]) return 0;
          const d = leftCompare ? y - ys[j] : ys[j] - y;
          const raw = d / res.u;
          const v = fractional ? raw : Math.round(raw);
          return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
        });
        setChange(initialChange);
        firstRunRef.current = false;
      } else {
        setChange(Array(COLUMNS).fill(0));
      }
      setShift(Array(COLUMNS).fill(0));
      setChangeGap(Array(COLUMNS).fill(0));
      setRunId((r) => r + 1);

      const missingIdx = xs.map((_, i) => i).filter((i) => !def[i]);
      const missing = missingIdx;
      if (isW) {
        setNote(
          approx
            ? "w is an infinitesimal step. Exact arithmetic isn't available for this formula, so the slope is computed numerically."
            : "w is an infinitesimal step, so the slope estimate is the exact derivative.",
        );
      } else if (missing.length === 0) {
        setNote(null);
      } else {
        const list = missingIdx.map((i) => formatDual(xs[i], xws[i], formatNum)).join(", ");
        const midUndefined = !def[Math.floor(COLUMNS / 2)];
        setNote(
          `f(x) is undefined at x = ${list}${midUndefined ? " — including the midpoint, so no tangent line can be drawn" : ""}`,
        );
      }
      setError(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setNote(null);
      if (msg === "all undefined") {
        setError("f(x) is undefined at every x in this range — try a different midpoint or increment.");
      } else {
        setError("Check your formula, midpoint, and increment.");
      }
    }
  };


  const calcDiff = () => {
    const r = yRaw.map((y, i) => {
      const j = leftCompare ? i - 1 : i + 1;
      if (j < 0 || j >= yRaw.length || !defined[i] || !defined[j]) return 0;
      const d = leftCompare ? y - yRaw[j] : yRaw[j] - y;
      const raw = unit === 0 ? 0 : d / unit;
      const v = fractional ? raw : Math.round(raw);
      return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
    });
    setChange(r);
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
    if (skipMaxRefill.current) {
      skipMaxRefill.current = false;
      return;
    }
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxStones]);

  // Re-round existing size/change in place when the fractional toggle flips,
  // without wiping user drags/shifts or recomputing unit.
  const skipRerollRef = useRef(true);
  useEffect(() => {
    if (skipRerollRef.current) {
      skipRerollRef.current = false;
      return;
    }
    if (!yRaw.length || unit === 0) return;
    const definedYs = yRaw.filter((_, i) => defined[i]);
    if (!definedYs.length) return;
    const isConstant = definedYs.every((y) => y === definedYs[0]);
    const allPositive = definedYs.every((y) => y > 0);
    const baseline = isConstant ? 0 : allPositive ? Math.min(...definedYs) : 0;
    const signed = !isConstant && !allPositive;
    const newSize = yRaw.map((y, i) => {
      if (!defined[i]) return 0;
      const raw = (y - baseline) / unit;
      const v = fractional ? raw : Math.round(raw);
      const lo = signed || isConstant ? -MAX_PIECES : 0;
      return Math.max(lo, Math.min(MAX_PIECES, v));
    });
    setSize(newSize);
    if (leibniz) {
      setChange(
        dyValues.map((d, i) => {
          if (!dyDefined[i]) return 0;
          const raw = d / unit;
          const v = fractional ? raw : Math.round(raw);
          return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
        }),
      );
    } else if (change.some((v) => v !== 0)) {
      const newChange = yRaw.map((y, i) => {
        const j = leftCompare ? i - 1 : i + 1;
        if (j < 0 || j >= yRaw.length || !defined[i] || !defined[j]) return 0;
        const d = leftCompare ? y - yRaw[j] : yRaw[j] - y;
        const raw = d / unit;
        const v = fractional ? raw : Math.round(raw);
        return Math.max(-MAX_PIECES, Math.min(MAX_PIECES, v));
      });
      setChange(newChange);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fractional]);

  const toggleLeibniz = (on: boolean) => {
    if (on) {
      leibnizSnap.current = {
        size: size.slice(),
        change: change.slice(),
        shift: shift.slice(),
        changeGap: changeGap.slice(),
        unit,
        floorValue,
        maxStones,
      };
      const capped =
        Math.round(Number(maxStones)) > LEIBNIZ_MAX_STONES
          ? String(LEIBNIZ_MAX_STONES)
          : maxStones;
      setLeibniz(true);
      if (capped !== maxStones) {
        skipMaxRefill.current = true;
        setMaxStones(capped);
      }
      setup({ leibniz: true, maxStones: capped });
      return;
    }
    setLeibniz(false);
    const snap = leibnizSnap.current;
    leibnizSnap.current = null;
    if (snap) {
      if (snap.maxStones !== maxStones) {
        skipMaxRefill.current = true;
        setMaxStones(snap.maxStones);
      }
      setSize(snap.size);
      setChange(snap.change);
      setShift(snap.shift);
      setChangeGap(snap.changeGap);
      setUnit(snap.unit);
      setFloorValue(snap.floorValue);
      setRunId((r) => r + 1);
    } else {
      setup({ leibniz: false });
    }
    setError(null);
  };





  const incParsed = parseIncrement(increment);
  const incValue = incParsed ? incParsed.value : 0.5;

  const fmtVal = (v: number) => (slopeHighPrecision ? v.toFixed(10) : formatNum(v));

  const fmtCount = (v: number) =>
    slopeHighPrecision
      ? v.toFixed(10)
      : fractional ? (Math.round(v * 100) / 100).toFixed(2) : String(Math.round(v));

  const orderSuffix = (n: number) => {
    if (n % 100 >= 11 && n % 100 <= 13) return "th";
    if (n % 10 === 1) return "st";
    if (n % 10 === 2) return "nd";
    if (n % 10 === 3) return "rd";
    return "th";
  };

  const superscriptDelta = (n: number) => {
    if (n <= 0) return "";
    const digits = String(n).split("");
    const map: Record<string, string> = {
      "0": "⁰",
      "1": "¹",
      "2": "²",
      "3": "³",
      "4": "⁴",
      "5": "⁵",
      "6": "⁶",
      "7": "⁷",
      "8": "⁸",
      "9": "⁹",
    };
    return digits.map((d) => map[d]).join("");
  };

  const sizeHeader =
    level === 0 ? "# size-stones" : "# change-size-stones/increment";

  const changeHeader =
    level === 0
      ? "# change-size-stones"
      : level === 1
        ? "Change-Size (Δ²y/Δx²)"
        : `Change-Size (Δ${superscriptDelta(level + 1)}y/Δx${superscriptDelta(level + 1)})`;


  const slopeHeader =
    level === 0 ? "Slope estimate" : `Slope estimate (${level + 1}${orderSuffix(level + 1)})`;

  const showChangeColumns = level === 0 || change.some((c) => c !== 0);
  const showPromotedSlope = level > 0 && !showChangeColumns;

  const showYColumn = level === 0;

  const gridCols = showChangeColumns
    ? slopeHighPrecision
      ? showYColumn
        ? "2rem 10rem 10rem 10rem 5rem"
        : "2rem 10rem 10rem 5rem"
      : showYColumn
        ? "2rem 6rem 6rem 9rem 2rem"
        : "2rem 6rem 9rem 2rem"
    : slopeHighPrecision
      ? "2rem 10rem 10rem"
      : "2rem 5.5rem 6rem";




  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Canvas shadows camera={{ position: [0, BOARD_CENTER_Y, 29.2], fov: 45 }} dpr={[1, 2]}>
        <Scene
          size={size}
          change={change}
          shift={shift}
          changeGap={changeGap}
          xValues={xValues}
          xW={xW}
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
          increment={incValue}
          unit={unit}
          tangentSlope={tangentSlope}
          defined={defined}
          anim={anim}
          instant={instant}
          leibniz={leibniz}
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
              One stone = <span className="font-mono text-foreground">{wMode ? formatDual(0, unit, fmtVal) : fmtVal(unit)}</span>.
              {(floorValue !== 0 || (wMode && wBase !== 0)) && (
                <> &nbsp;Size-Stone Floor: <span className="font-mono text-foreground">{wMode ? formatDual(wBase, floorValue, fmtVal) : fmtVal(floorValue)}</span></>
              )}
            </p>
            {leibniz ? (
              <>
                <div
                  className="grid items-center gap-2 px-2 py-1 text-[10px] font-bold text-muted-foreground"
                  style={{ gridTemplateColumns: slopeHighPrecision ? "3rem 5rem 10rem 7rem 10rem" : "3rem 5rem 6rem 7rem 6rem" }}
                >
                  <div className="text-center">x</div>
                  <div className="text-center text-[#e8352c]"># size-stones</div>
                  <div className="text-center text-[#e8352c]">y</div>
                  <div className="text-center text-[#ff932a]"># change-size-stones</div>
                  <div className="text-center text-[#ff932a]">delta-y</div>
                  <div className="text-center text-[#ff932a]">dy</div>
                </div>
                {xValues.map((xv, i) => {
                  const isDef = defined[i] !== false;
                  const dyDef = isDef && dyDefined[i];
                  const dDef = isDef && deltaDefined[i];
                  return (
                    <div
                      key={i}
                      className="grid items-center gap-2 rounded-lg bg-background/40 px-2 py-1 text-[10px]"
                      style={{ gridTemplateColumns: leibnizCols }}
                    >
                      <div className={`font-mono ${isDef ? "text-foreground" : "text-muted-foreground"}`}>
                        {formatDual(xv, xW[i] ?? 0, formatNum)}
                      </div>
                      <div className={`text-center font-mono ${isDef ? "text-foreground" : "text-muted-foreground"}`}>
                        {isDef ? fmtCount(size[i]) : "undefined"}
                      </div>
                      <div className={`text-center font-mono ${isDef ? "text-foreground" : "text-muted-foreground"}`}>
                        {isDef
                          ? wMode
                            ? formatDual(wBase, yRaw[i] ?? 0, fmtVal)
                            : fmtVal(yRaw[i] ?? 0)
                          : "undefined"}
                      </div>
                      <div className={`text-center font-mono ${dyDef ? "text-foreground" : "text-muted-foreground"}`}>
                        {dyDef ? fmtCount(change[i]) : "undefined"}
                      </div>
                      <div className={`text-center font-mono ${dDef ? "text-foreground" : "text-muted-foreground"}`}>
                        {dDef
                          ? wMode
                            ? formatDual(0, deltaValues[i] ?? 0, fmtVal)
                            : fmtVal(deltaValues[i] ?? 0)
                          : "undefined"}
                      </div>
                      <div className={`text-center font-mono ${dyDef ? "text-foreground" : "text-muted-foreground"}`}>
                        {dyDef
                          ? wMode
                            ? formatDual(0, dyValues[i] ?? 0, fmtVal)
                            : fmtVal(dyValues[i] ?? 0)
                          : "undefined"}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
            <div
              className="grid items-center gap-2 px-2 py-1 text-[10px] font-bold text-muted-foreground"
              style={{ gridTemplateColumns: gridCols }}
            >
              <div className="text-center">x</div>
              <div className="text-center text-[#e8352c]">{sizeHeader}</div>
              {showYColumn && <div className="text-center text-[#e8352c]">y</div>}
              {showChangeColumns && (
                <>
                  <div className="text-center text-[#ff932a]">{changeHeader}</div>
                  <div className="text-right">{slopeHeader}</div>
                </>
              )}
              {showPromotedSlope && <div className="text-right">Slope estimate</div>}
            </div>
            {xValues.map((xv, i) => {
              const slopeValue = (change[i] ?? 0) * unit / (incValue || 1);
              const isDef = defined[i] !== false;
              const nb = leftCompare ? i - 1 : i + 1;
              const diffDef =
                isDef && nb >= 0 && nb < xValues.length && defined[nb] !== false;
              return (
                <div
                  key={i}
                  className="grid items-center gap-2 rounded-lg bg-background/40 px-2 py-1 text-[10px]"
                  style={{ gridTemplateColumns: gridCols }}
                >
                  <div className={`text-center font-mono ${isDef ? "text-foreground" : "text-muted-foreground"}`}>{formatDual(xv, xW[i] ?? 0, formatNum)}</div>
                  <div className={`text-center font-mono ${isDef ? "text-foreground" : "text-muted-foreground"}`}>
                    {isDef ? fmtCount(size[i]) : "undefined"}
                  </div>
                  {showYColumn && (
                    <div className={`text-center font-mono ${isDef ? "text-foreground" : "text-muted-foreground"}`}>
                      {isDef
                        ? wMode
                          ? formatDual(wBase, yRaw[i] ?? 0, fmtVal)
                          : fmtVal(yRaw[i] ?? 0)
                        : "undefined"}
                    </div>
                  )}
                  {showChangeColumns && (
                    <>
                      <div className={`text-center font-mono ${diffDef ? "text-foreground" : "text-muted-foreground"}`}>
                        {diffDef ? fmtCount(change[i]) : "undefined"}
                      </div>
                      <div className={`whitespace-nowrap text-right font-mono ${diffDef ? "text-foreground" : "text-muted-foreground"}`}>
                        {diffDef
                          ? slopeHighPrecision ? slopeValue.toFixed(10) : slopeValue.toFixed(2)
                          : "undefined"}
                      </div>
                    </>
                  )}
                  {showPromotedSlope && (
                    <div className={`whitespace-nowrap text-right font-mono ${isDef ? "text-foreground" : "text-muted-foreground"}`}>
                      {isDef
                        ? (() => {
                            const v = floorValue + (size[i] ?? 0) * unit;
                            return slopeHighPrecision ? v.toFixed(10) : v.toFixed(2);
                          })()
                        : "undefined"}
                    </div>
                  )}
                </div>
              );
            })}


              </>
            )}


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
              <h2 className="font-serif text-2xl text-foreground">About the Calculus Abacus</h2>
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
                The <span className="text-[#e8352c]">red stones</span> (or size-stones) represent amounts. Columns of red stones represent values of <span className="font-mono text-foreground">y</span> along a given curve. The <span className="text-[#ff932a]">orange stones</span> (or change-size-stones) represent the differences between neighboring columns of red stones. Experiment with succesively smaller increments. Do the orange stones approach a limit as the increment approaches zero? What would happen if the increment were infinitely small?
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
                Click <strong>"Find Differences"</strong> to display the differences between neighboring columns.
              </p>
              <p>
                Drag orange stones up into the empty area to form a new curve.
              </p>
              <h3 className="font-serif text-lg text-foreground pt-2">How the Red (Size) Stones Work</h3>
              <p>
                Each of the 11 columns represents a <span className="font-mono text-foreground">y</span>-value for each <span className="font-mono text-foreground">x</span>. The columns are centered on the chosen midpoint and spaced according to the selected increment.
              </p>
              <p>
                The abacus automatically determines how many red stones belong in each column. To do this, it finds the minimum and maximum of the 11 <span className="font-mono text-foreground">y</span>-values and scales the display so that no column exceeds the maximum number of stones.
              </p>
              <p>
                For every column the app evaluates <span className="font-mono text-foreground">f(x)</span> to get 11 <span className="font-mono text-foreground">y</span>-values. Suppose we choose to limit the number of stones in any one column to 50. We find the min and max of the 11 <span className="font-mono text-foreground">y</span>-values and pick a unit so that one red stone is worth <span className="font-mono">(max − min) / 50</span>. The number of red stones in each column represents <span className="font-mono">f(x) − min</span>.
              </p>
              <p>
                Only the differences between columns matter, so using the minimum value as a baseline makes efficient use of the available stones.
              </p>
              <p>Negative size values are represented by black stones.</p>
              <h3 className="font-serif text-lg text-foreground pt-2">How the Orange (Change-Size) Stones Work</h3>
              <p>
                When you click <strong>"Find Differences,"</strong> the app places orange stones next to each column.
              </p>
              <p>The number of orange stones represents:</p>
              <p className="font-mono text-center">f(x + Δx) − f(x)</p>
              <p>
                where Δx equals the chosen increment. The orange stones show how much the function changes as you move one increment to the right. Negative change-size values are represented by dark grey stones.
              </p>
              <p>
                You can move the orange stones to form a second curve above the red curve. This orange curve represents differences in the <span className="font-mono text-foreground">y</span>-values for points along the curve rather than the <span className="font-mono text-foreground">y</span>-values themselves.
              </p>
              <h3 className="font-serif text-lg text-foreground pt-2">Estimating the Slope of a Tangent</h3>
              <p>The orange stones can be used to estimate the slope of a tangent line.</p>
              <p>For a particular column:</p>
              <ol className="list-decimal space-y-1 pl-6">
                <li>Count the orange stones.</li>
                <li>Multiply by the value represented by one stone.</li>
                <li>Divide by the increment.</li>
              </ol>
              <p>
                As the increment becomes smaller and smaller, the estimate becomes increasingly close to the true slope of the tangent.
              </p>
              <h3 className="font-serif text-lg text-foreground pt-2">Interacting with the Abacus</h3>
              <p>
                <strong>"Midpoint Tangent"</strong> traces a curve through the tops of the red stacks and adds a straight line tangent to that curve at the midpoint column.
              </p>
              <p>
                The <strong>+</strong> and <strong>−</strong> buttons let you add or remove stones manually.
              </p>
              <p>
                You can also drag the red or orange portion of any column. The two colors move independently, but if one stack is pushed into the other, both stacks move together.
              </p>
              
<p>The abacus supports increments as small as 0.001 and as many as 100 stones per column.</p>
              <p>A grey column means that the equation is undefined at that particular value of x.</p>
              <p>
                You can also type <span className="font-mono text-foreground">w</span> as the increment. Here <span className="font-mono text-foreground">w</span> is an infinitesimal: a positive quantity smaller than every positive real number, yet not zero. The values displayed in the left panel are no longer slope estimates. They are exact values for the derivative.
              </p>
              <p>
                Checking <strong>"Difference Curve"</strong> removes the red size stones, divides the orange change-size stones by the increment, and turns them into a new red size curve. The board now shows the slope curve (Δy/Δx). Clicking <strong>"Find Differences"</strong> at this point produces second-order change-size stones (Δ²y/Δx²). Uncheck the box to restore the previous level. This is not available when the increment is <span className="font-mono text-foreground">w</span>, because <span className="font-mono text-foreground">w</span> already makes the first differences exact and higher differences are zero.
              </p>
              <p>
                Checking <strong>"Leibniz Mode"</strong> keeps the red size stones and adds a narrow wooden shelf across the middle of the board. Resting on that shelf, with every stack starting at the same height, are the orange differentials <span className="font-mono text-foreground">dy = f'(x)·dx</span>, drawn in the same unit as the red stones. Max Stones is capped at 50 so the red stacks never reach the shelf. While Leibniz Mode is on, "Find Differences", "Difference Curve" and "Lefthand comparison" are inactive, the orange stones cannot be dragged, and the left panel shows just x, f(x) and dy.
              </p>

              <p className="pt-4 text-sm text-muted-foreground">
                Created by Cliff Landesman, <a href="mailto:cliff.landesman@gmail.com" className="underline">cliff.landesman@gmail.com</a>. Creative Commons BY license 2026
              </p>
            </div>
          </div>
        </div>
      )}

      {!uiHidden && (error || note) && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-4 text-center text-sm ${
            error ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {error ?? note}
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
            <span className="font-serif text-lg text-white">y =</span>
            <input
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="(x^2 + x) / 2"
              className="flex-1 min-w-0 rounded-md bg-background/50 px-2 py-2 font-mono text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <label className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-muted-foreground">Midpoint</span>
            <input
              value={midpoint}
              onChange={(e) => setMidpoint(e.target.value)}
              className="w-20 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />
          </label>
          <label className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-muted-foreground">Increment</span>
            <input
              type="text"
              inputMode="text"
              value={increment}
              onChange={(e) => setIncrement(e.target.value)}
              onBlur={() => {
                const p = parseIncrement(increment);
                if (!p) {
                  setIncrement("0.001");
                } else if (!p.infinitesimal && Math.abs(p.value) < 0.001) {
                  setIncrement("0.001");
                }
              }}
              className="w-20 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />

          </label>
          <label className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-muted-foreground">Max Stones</span>
            <input
              type="number"
              min={25}
              max={leibniz ? LEIBNIZ_MAX_STONES : 100}
              step={1}
              value={maxStones}
              onChange={(e) => {
                const v = e.target.value;
                const n = Math.round(Number(v));
                setMaxStones(leibniz && isFinite(n) && n > LEIBNIZ_MAX_STONES ? String(LEIBNIZ_MAX_STONES) : v);
              }}
              className="w-20 rounded-md bg-background/50 px-2 py-1 text-center font-mono text-base text-foreground outline-none"
            />
          </label>
          <button
            type="submit"
            disabled={!!anim}
            className="rounded-xl border border-[#e8352c] bg-[#e8352c]/90 px-4 py-2 font-medium text-white transition hover:bg-[#e8352c] disabled:opacity-50"
          >
            Fill Board
          </button>
          <button
            type="button"
            onClick={calcDiff}
            disabled={!!anim || leibniz}
            title={leibniz ? "Not available in Leibniz Mode." : undefined}
            className="rounded-xl border border-[#ff932a] bg-[#ff932a]/90 px-4 py-2 font-medium text-white transition hover:bg-[#ff932a] disabled:opacity-50"
          >
            Find Differences
          </button>
          {error && <p className="text-center text-sm text-destructive">{error}</p>}
          <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3 text-xs">
            <label
              title={
                level === 0 && !change.some((v) => v !== 0)
                  ? "Find differences first."
                  : ""
              }
              className={`flex items-center gap-2 ${level === 0 && !change.some((v) => v !== 0) ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <input
                type="checkbox"
                checked={level > 0}
                disabled={(level === 0 && !change.some((v) => v !== 0) && !wMode) || !!anim || leibniz}
                onChange={(e) => {
                  if (wMode) {
                    setError("Difference Curve cannot be used with the infinitesimal increment w.");
                    setNote(null);
                    return;
                  }
                  if (e.target.checked) {
                    if (!change.some((v) => v !== 0)) {
                      setError("No change-size stones to promote.");
                      setNote(null);
                      return;
                    }
                    promoteLevel();
                  } else {
                    demoteLevel();
                  }
                }}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className={wMode || leibniz ? "text-muted-foreground" : "text-foreground"}>Difference Curve</span>
            </label>
            <label className={`flex items-center gap-2 ${anim || level > 0 ? "cursor-not-allowed" : "cursor-pointer"}`}>
              <input
                type="checkbox"
                checked={leibniz}
                disabled={!!anim || level > 0}
                onChange={(e) => toggleLeibniz(e.target.checked)}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className={anim || level > 0 ? "text-muted-foreground" : "text-foreground"}>Leibniz Mode</span>
            </label>
            <label
              className={`flex items-center gap-2 ${level > 0 || anim ? "cursor-not-allowed" : "cursor-pointer"}`}
              title={
                level > 0 || anim
                  ? "Fractional rounding is fixed once stones have been removed."
                  : undefined
              }
            >
              <input
                type="checkbox"
                checked={fractional}
                disabled={level > 0 || !!anim}
                onChange={(e) => setFractional(e.target.checked)}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className={level > 0 || anim ? "text-muted-foreground" : "text-foreground"}>Fractional stones</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={showLine}
                disabled={level > 0 || wMode || !!anim}
                onChange={(e) => setShowLine(e.target.checked)}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className={level > 0 || wMode ? "text-muted-foreground" : "text-foreground"}>Midpoint Tangent</span>
            </label>
            <label
              className="flex cursor-pointer items-center gap-2"
              title={
                level > 0 || anim
                  ? "The comparison direction is fixed once stones have been removed."
                  : undefined
              }
            >
              <input
                type="checkbox"
                checked={leftCompare}
                disabled={level > 0 || !!anim || leibniz}
                onChange={(e) => setLeftCompare(e.target.checked)}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className={level > 0 || anim || leibniz ? "text-muted-foreground" : "text-foreground"}>
                Lefthand comparison
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={slopeHighPrecision}
                onChange={(e) => setSlopeHighPrecision(e.target.checked)}
                className="accent-[hsl(199_89%_70%)]"
              />
              <span className="text-foreground">10 decimals</span>
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
