import type { Item } from "./types";

/*
 * Scene viewBox: 1200 x 750
 * Floor horizon: y = 530
 * Each scene item returns a <g> positioned absolutely.
 * Multi-instance items (monitor) use the index argument.
 */

const C = {
  paper: "#FAFAF7",
  paperSoft: "#F3F2EC",
  paperDeep: "#EBEAE2",
  ink: "#0E0E0F",
  inkSoft: "#3A3A3C",
  line: "#D8D6CC",
  lime: "#D4FF00",
  limeDeep: "#B6DC00",
  teal: "#14564B",
  tealDeep: "#0B3A32",
  walnut: "#6F4F37",
  walnutLight: "#A07E60",
  walnutDeep: "#4D3624",
  rattan: "#C9A876",
  rattanShade: "#9F7F4F",
  concrete: "#BCB6AB",
  concreteShade: "#8E8A82",
  brass: "#C8A356",
  brassShade: "#9C7D3E",
  shadow: "rgba(14,14,15,0.18)",
};

const Shadow = ({ cx, cy, rx, ry, opacity = 1 }: { cx: number; cy: number; rx: number; ry: number; opacity?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={C.shadow} opacity={opacity} />
);

/* ----- THUMB wrapper (60x60 standalone SVG) ----- */
const Thumb = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true">
    <rect width="60" height="60" rx="10" fill={C.paperDeep} />
    {children}
  </svg>
);

/* =========================================================
   DESKS — anchor: translate(360, 400). Desk surface y=0..20 local.
   ========================================================= */

const deskPandanus = () => (
  <g transform="translate(360, 400)">
    <Shadow cx={240} cy={172} rx={250} ry={10} />
    {/* hairpin legs */}
    <path
      d="M 36 22 Q 22 90 32 168 M 36 22 Q 42 90 54 168"
      stroke={C.ink}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 444 22 Q 430 90 440 168 M 444 22 Q 450 90 462 168"
      stroke={C.ink}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    {/* surface */}
    <rect x={0} y={0} width={480} height={20} fill={C.walnutLight} />
    <rect x={0} y={16} width={480} height={4} fill={C.walnut} />
    {/* grain */}
    <path d="M 30 8 L 460 8" stroke={C.walnut} strokeWidth={0.6} opacity={0.4} />
    <path d="M 60 12 L 430 12" stroke={C.walnut} strokeWidth={0.4} opacity={0.4} />
  </g>
);
const deskPandanusThumb = (
  <Thumb>
    <rect x={8} y={24} width={44} height={6} fill={C.walnutLight} />
    <rect x={8} y={28} width={44} height={2} fill={C.walnut} />
    <path d="M12 30 v18 M48 30 v18" stroke={C.ink} strokeWidth={2} strokeLinecap="round" />
  </Thumb>
);

const deskBatu = () => (
  <g transform="translate(360, 400)">
    <Shadow cx={240} cy={172} rx={250} ry={10} />
    {/* block legs */}
    <rect x={26} y={26} width={36} height={146} fill={C.walnutDeep} />
    <rect x={26} y={26} width={36} height={146} fill={C.walnut} clipPath="inset(0 10px 0 0)" />
    <rect x={418} y={26} width={36} height={146} fill={C.walnutDeep} />
    <rect x={418} y={26} width={36} height={146} fill={C.walnut} clipPath="inset(0 10px 0 0)" />
    {/* surface */}
    <rect x={-10} y={0} width={500} height={26} fill={C.walnut} />
    <rect x={-10} y={22} width={500} height={4} fill={C.walnutDeep} />
    <path d="M 20 10 L 460 10" stroke={C.walnutDeep} strokeWidth={0.7} opacity={0.4} />
    <path d="M 60 16 L 420 16" stroke={C.walnutDeep} strokeWidth={0.5} opacity={0.4} />
  </g>
);
const deskBatuThumb = (
  <Thumb>
    <rect x={6} y={22} width={48} height={9} fill={C.walnut} />
    <rect x={6} y={30} width={48} height={2} fill={C.walnutDeep} />
    <rect x={11} y={32} width={9} height={18} fill={C.walnutDeep} />
    <rect x={40} y={32} width={9} height={18} fill={C.walnutDeep} />
  </Thumb>
);

const deskRotan = () => (
  <g transform="translate(360, 400)">
    <Shadow cx={240} cy={172} rx={250} ry={10} />
    {/* rattan front */}
    <rect x={0} y={20} width={480} height={150} fill={C.rattan} />
    {Array.from({ length: 24 }).map((_, i) => (
      <line
        key={`v${i}`}
        x1={20 + i * 18}
        y1={28}
        x2={20 + i * 18}
        y2={166}
        stroke={C.rattanShade}
        strokeWidth={1.2}
        opacity={0.7}
      />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <line
        key={`h${i}`}
        x1={4}
        y1={34 + i * 18}
        x2={476}
        y2={34 + i * 18}
        stroke={C.rattanShade}
        strokeWidth={1.2}
        opacity={0.5}
      />
    ))}
    {/* top */}
    <rect x={-6} y={0} width={492} height={24} fill={C.paper} />
    <rect x={-6} y={20} width={492} height={4} fill={C.rattanShade} />
  </g>
);
const deskRotanThumb = (
  <Thumb>
    <rect x={6} y={22} width={48} height={4} fill={C.paper} stroke={C.rattanShade} />
    <rect x={8} y={26} width={44} height={24} fill={C.rattan} />
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1={12 + i * 8} y1={27} x2={12 + i * 8} y2={49} stroke={C.rattanShade} strokeWidth={1} />
    ))}
  </Thumb>
);

/* =========================================================
   CHAIRS — anchor: translate(620, 370). Sits to right of desk.
   ========================================================= */

const chairUluwatu = () => (
  <g transform="translate(620, 370)">
    <Shadow cx={78} cy={210} rx={78} ry={9} />
    {/* base */}
    <path d="M 34 192 L 122 192 L 110 208 L 46 208 Z" fill={C.ink} />
    {/* pole */}
    <rect x={74} y={150} width={8} height={44} fill={C.inkSoft} />
    {/* seat */}
    <rect x={34} y={128} width={88} height={24} rx={4} fill={C.ink} />
    <rect x={34} y={146} width={88} height={6} fill={C.inkSoft} />
    {/* back (mesh) */}
    <path d="M 42 26 Q 78 0 114 26 L 114 128 L 42 128 Z" fill={C.teal} />
    <path d="M 42 26 Q 78 0 114 26 L 114 128 L 42 128 Z" fill="none" stroke={C.tealDeep} strokeWidth={2} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={i} x1={46} y1={40 + i * 14} x2={110} y2={40 + i * 14} stroke={C.tealDeep} strokeWidth={0.6} opacity={0.5} />
    ))}
    {/* arm */}
    <path d="M 114 92 Q 134 92 134 118 L 130 118 Q 130 96 114 96 Z" fill={C.inkSoft} />
  </g>
);
const chairUluwatuThumb = (
  <Thumb>
    <path d="M 18 12 Q 30 4 42 12 L 42 34 L 18 34 Z" fill={C.teal} />
    <rect x={20} y={34} width={20} height={6} fill={C.ink} />
    <rect x={28} y={40} width={4} height={8} fill={C.inkSoft} />
    <path d="M 22 48 L 38 48 L 36 52 L 24 52 Z" fill={C.ink} />
  </Thumb>
);

const chairBambu = () => (
  <g transform="translate(620, 360)">
    <Shadow cx={80} cy={220} rx={75} ry={9} />
    {/* back curve */}
    <path d="M 26 32 Q 24 138 32 214 L 54 214 Q 42 138 48 38 Z" fill={C.walnutLight} />
    {/* seat cushion */}
    <path d="M 30 148 Q 96 140 138 148 L 138 180 Q 96 174 30 180 Z" fill={C.paperSoft} />
    <path d="M 30 148 Q 96 140 138 148" stroke={C.walnut} strokeWidth={1} fill="none" />
    {/* front legs */}
    <path d="M 38 180 Q 38 202 32 214" stroke={C.walnutLight} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M 132 180 Q 132 202 138 214" stroke={C.walnutLight} strokeWidth={6} fill="none" strokeLinecap="round" />
    {/* back top curve */}
    <path d="M 26 32 Q 92 14 154 34 L 152 46 Q 92 28 26 44 Z" fill={C.walnut} />
    {/* right back rail */}
    <path d="M 148 38 Q 154 138 142 214 L 132 214 Q 140 138 134 40 Z" fill={C.walnutLight} />
    {/* lime accent throw pillow */}
    <rect x={88} y={142} width={26} height={14} rx={2} fill={C.lime} opacity={0.85} />
  </g>
);
const chairBambuThumb = (
  <Thumb>
    <path d="M 14 14 Q 30 8 46 14 L 46 22 Q 30 18 14 22 Z" fill={C.walnut} />
    <path d="M 16 22 Q 14 38 22 48 L 38 48 Q 46 38 44 22 Z" fill={C.walnutLight} />
    <path d="M 18 34 Q 30 30 42 34 L 42 42 Q 30 38 18 42 Z" fill={C.paperSoft} />
    <rect x={26} y={32} width={8} height={4} rx={1} fill={C.lime} />
  </Thumb>
);

const chairAnyam = () => (
  <g transform="translate(620, 350)">
    <Shadow cx={78} cy={224} rx={75} ry={9} />
    {/* round woven back */}
    <ellipse cx={78} cy={78} rx={68} ry={68} fill={C.rattan} />
    <ellipse cx={78} cy={78} rx={68} ry={68} fill="none" stroke={C.rattanShade} strokeWidth={2} />
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={i}
        d={`M ${22 + i * 7} 34 Q 78 ${54 + i * 4} ${134 - i * 7} 34`}
        stroke={C.rattanShade}
        strokeWidth={0.8}
        fill="none"
        opacity={0.6}
      />
    ))}
    {/* cushion */}
    <path d="M 18 140 Q 78 132 138 140 L 138 170 Q 78 164 18 170 Z" fill={C.lime} />
    <path d="M 18 140 Q 78 132 138 140" stroke={C.limeDeep} strokeWidth={1} fill="none" />
    {/* legs */}
    <path d="M 34 170 L 30 220" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
    <path d="M 122 170 L 126 220" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
  </g>
);
const chairAnyamThumb = (
  <Thumb>
    <ellipse cx={30} cy={24} rx={16} ry={16} fill={C.rattan} stroke={C.rattanShade} />
    <rect x={16} y={36} width={28} height={8} rx={2} fill={C.lime} />
    <line x1={20} y1={44} x2={20} y2={52} stroke={C.ink} strokeWidth={2} />
    <line x1={40} y1={44} x2={40} y2={52} stroke={C.ink} strokeWidth={2} />
  </Thumb>
);

/* =========================================================
   MONITORS — multi-instance. anchor varies by index.
   index 0: center. index 1: right. index 2: left.
   ========================================================= */

const MONITOR_ANCHORS = [
  { x: 480, y: 240, depth: 0 }, // center
  { x: 680, y: 252, depth: 1 }, // right, slightly back/smaller
  { x: 280, y: 252, depth: 1 }, // left, slightly back/smaller
];

const monitorUltrawide = (index: number) => {
  const a = MONITOR_ANCHORS[index] ?? MONITOR_ANCHORS[0];
  return (
    <g transform={`translate(${a.x}, ${a.y})`}>
      <path d="M 0 20 Q 130 0 260 20 L 260 120 Q 130 134 0 120 Z" fill={C.ink} />
      <path d="M 8 26 Q 130 10 252 26 L 252 112 Q 130 124 8 112 Z" fill={C.tealDeep} />
      <path d="M 14 30 Q 130 18 246 30 L 246 106 Q 130 116 14 106 Z" fill={C.teal} />
      <path d="M 32 40 L 96 40 L 84 60 L 32 60 Z" fill={C.lime} opacity={0.35} />
      <rect x={118} y={132} width={24} height={14} fill={C.inkSoft} />
      <ellipse cx={130} cy={146} rx={42} ry={4} fill={C.ink} />
    </g>
  );
};
const monitorUltrawideThumb = (
  <Thumb>
    <path d="M 8 18 Q 30 12 52 18 L 52 36 Q 30 42 8 36 Z" fill={C.ink} />
    <path d="M 12 22 Q 30 18 48 22 L 48 32 Q 30 36 12 32 Z" fill={C.teal} />
    <rect x={26} y={40} width={8} height={4} fill={C.inkSoft} />
    <ellipse cx={30} cy={46} rx={12} ry={2} fill={C.ink} />
  </Thumb>
);

const monitorStudio = (index: number) => {
  const a = MONITOR_ANCHORS[index] ?? MONITOR_ANCHORS[0];
  // smaller width than ultrawide
  return (
    <g transform={`translate(${a.x + 30}, ${a.y})`}>
      <rect x={0} y={0} width={150} height={104} rx={4} fill={C.ink} />
      <rect x={6} y={6} width={138} height={88} fill={C.paper} opacity={0.96} />
      <rect x={14} y={16} width={56} height={5} fill={C.lime} opacity={0.85} />
      <rect x={14} y={26} width={92} height={3} fill={C.inkSoft} opacity={0.4} />
      <rect x={14} y={34} width={76} height={3} fill={C.inkSoft} opacity={0.3} />
      <rect x={14} y={42} width={64} height={3} fill={C.inkSoft} opacity={0.3} />
      <rect x={66} y={104} width={18} height={16} fill={C.inkSoft} />
      <rect x={42} y={118} width={66} height={8} rx={2} fill={C.walnut} />
      <rect x={42} y={124} width={66} height={2} fill={C.walnutDeep} />
    </g>
  );
};
const monitorStudioThumb = (
  <Thumb>
    <rect x={12} y={16} width={36} height={24} rx={2} fill={C.ink} />
    <rect x={14} y={18} width={32} height={20} fill={C.paper} />
    <rect x={16} y={22} width={12} height={3} fill={C.lime} />
    <rect x={26} y={40} width={8} height={4} fill={C.inkSoft} />
    <rect x={18} y={44} width={24} height={4} fill={C.walnut} />
  </Thumb>
);

// Vertical portrait monitor — narrow, taller. Same MONITOR_ANCHORS positions.
const monitorVertical = (index: number) => {
  const a = MONITOR_ANCHORS[index] ?? MONITOR_ANCHORS[0];
  return (
    <g transform={`translate(${a.x + 80}, ${a.y - 30})`}>
      <rect x={0} y={0} width={70} height={150} rx={4} fill={C.ink} />
      <rect x={5} y={5} width={60} height={130} fill={C.paper} />
      {/* doc-style content */}
      <rect x={10} y={14} width={28} height={4} fill={C.ink} opacity={0.7} />
      <rect x={10} y={22} width={48} height={2} fill={C.inkSoft} opacity={0.4} />
      <rect x={10} y={27} width={42} height={2} fill={C.inkSoft} opacity={0.4} />
      <rect x={10} y={32} width={36} height={2} fill={C.inkSoft} opacity={0.3} />
      <rect x={10} y={42} width={18} height={3} fill={C.lime} />
      <rect x={10} y={50} width={48} height={2} fill={C.inkSoft} opacity={0.4} />
      <rect x={10} y={55} width={40} height={2} fill={C.inkSoft} opacity={0.4} />
      <rect x={10} y={60} width={44} height={2} fill={C.inkSoft} opacity={0.3} />
      <rect x={10} y={72} width={24} height={3} fill={C.teal} opacity={0.7} />
      <rect x={10} y={80} width={48} height={2} fill={C.inkSoft} opacity={0.4} />
      <rect x={10} y={85} width={42} height={2} fill={C.inkSoft} opacity={0.4} />
      <rect x={10} y={90} width={46} height={2} fill={C.inkSoft} opacity={0.3} />
      <rect x={10} y={102} width={20} height={3} fill={C.ink} opacity={0.6} />
      <rect x={10} y={110} width={48} height={2} fill={C.inkSoft} opacity={0.4} />
      <rect x={10} y={115} width={36} height={2} fill={C.inkSoft} opacity={0.3} />
      {/* stand */}
      <rect x={26} y={150} width={18} height={14} fill={C.inkSoft} />
      <rect x={10} y={162} width={50} height={6} rx={2} fill={C.walnut} />
    </g>
  );
};
const monitorVerticalThumb = (
  <Thumb>
    <rect x={22} y={10} width={16} height={36} rx={2} fill={C.ink} />
    <rect x={24} y={12} width={12} height={32} fill={C.paper} />
    <rect x={26} y={16} width={6} height={2} fill={C.ink} />
    <rect x={26} y={22} width={8} height={1} fill={C.inkSoft} />
    <rect x={26} y={26} width={6} height={1} fill={C.lime} />
    <rect x={26} y={32} width={8} height={1} fill={C.inkSoft} />
    <rect x={28} y={46} width={4} height={4} fill={C.inkSoft} />
  </Thumb>
);

/* =========================================================
   ACCESSORIES — fixed positions per item (on desk surface y=400)
   Desk surface is at y=400 in global coords. Local positions
   are on top of the desk.
   ========================================================= */

// Keyboard: front center
const accKeyboard = () => (
  <g transform="translate(540, 388)">
    <rect x={0} y={0} width={150} height={14} rx={2} fill={C.ink} />
    <rect x={0} y={11} width={150} height={3} fill={C.inkSoft} />
    {/* keys */}
    {Array.from({ length: 14 }).map((_, i) => (
      <rect key={i} x={4 + i * 10} y={3} width={7} height={4} rx={0.5} fill={C.paper} opacity={0.85} />
    ))}
    {[0, 1, 2].map((i) => (
      <rect key={i} x={4 + i * 10} y={3} width={7} height={4} rx={0.5} fill={C.lime} />
    ))}
  </g>
);
const accKeyboardThumb = (
  <Thumb>
    <rect x={8} y={26} width={44} height={10} rx={1} fill={C.ink} />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={11 + i * 8} y={29} width={5} height={3} fill={C.paper} />
    ))}
    <rect x={11} y={29} width={5} height={3} fill={C.lime} />
  </Thumb>
);

// Mouse: front right
const accMouse = () => (
  <g transform="translate(720, 390)">
    <path d="M 0 6 Q 0 0 14 0 Q 28 0 28 6 L 28 18 Q 28 24 14 24 Q 0 24 0 18 Z" fill={C.ink} />
    <path d="M 14 4 L 14 12" stroke={C.inkSoft} strokeWidth={1} />
    <ellipse cx={14} cy={6} rx={3} ry={2} fill={C.lime} opacity={0.7} />
  </g>
);
const accMouseThumb = (
  <Thumb>
    <path d="M 22 24 Q 22 18 30 18 Q 38 18 38 24 L 38 38 Q 38 44 30 44 Q 22 44 22 38 Z" fill={C.ink} />
    <ellipse cx={30} cy={22} rx={3} ry={1.5} fill={C.lime} />
  </Thumb>
);

// Mug: top right area on desk
const accMug = () => (
  <g transform="translate(770, 358)">
    <Shadow cx={20} cy={44} rx={20} ry={3} />
    <path d="M 4 6 L 34 6 L 32 38 L 6 38 Z" fill={C.lime} />
    <path d="M 4 6 L 34 6 L 32 38 L 6 38 Z" fill="none" stroke={C.limeDeep} strokeWidth={1} />
    <ellipse cx={19} cy={6} rx={15} ry={3} fill={C.paper} />
    <ellipse cx={19} cy={6} rx={15} ry={3} fill="none" stroke={C.limeDeep} strokeWidth={1} />
    {/* handle */}
    <path d="M 34 14 Q 44 18 42 28 Q 40 32 34 30" fill="none" stroke={C.lime} strokeWidth={3} />
    {/* steam */}
    <path d="M 12 -4 Q 14 -10 12 -16 M 22 -4 Q 24 -10 22 -16" stroke={C.inkSoft} strokeWidth={1} fill="none" opacity={0.4} strokeLinecap="round" />
  </g>
);
const accMugThumb = (
  <Thumb>
    <path d="M 18 20 L 38 20 L 36 42 L 20 42 Z" fill={C.lime} />
    <ellipse cx={28} cy={20} rx={10} ry={2} fill={C.paper} />
    <path d="M 38 24 Q 46 26 44 34 Q 42 36 38 34" fill="none" stroke={C.lime} strokeWidth={2} />
  </Thumb>
);

// Headphones: top left area on desk
const accHeadphones = () => (
  <g transform="translate(420, 354)">
    <Shadow cx={36} cy={48} rx={36} ry={4} />
    {/* headband */}
    <path d="M 8 36 Q 36 -2 64 36" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* cups */}
    <rect x={0} y={28} width={20} height={26} rx={4} fill={C.ink} />
    <rect x={2} y={32} width={16} height={18} rx={2} fill={C.teal} />
    <rect x={52} y={28} width={20} height={26} rx={4} fill={C.ink} />
    <rect x={54} y={32} width={16} height={18} rx={2} fill={C.teal} />
  </g>
);
const accHeadphonesThumb = (
  <Thumb>
    <path d="M 16 30 Q 30 8 44 30" stroke={C.ink} strokeWidth={3} fill="none" />
    <rect x={12} y={26} width={10} height={16} rx={2} fill={C.ink} />
    <rect x={38} y={26} width={10} height={16} rx={2} fill={C.ink} />
    <rect x={14} y={29} width={6} height={10} rx={1} fill={C.teal} />
    <rect x={40} y={29} width={6} height={10} rx={1} fill={C.teal} />
  </Thumb>
);

/* =========================================================
   LIGHTING
   - lamp-bukit: floor lamp, left of desk. translate(180, 210)
   - lamp-warung: desk lamp on top of desk. translate(780, 320)
   ========================================================= */

const lampBukit = () => (
  <g transform="translate(180, 200)">
    <Shadow cx={70} cy={328} rx={50} ry={6} />
    <ellipse cx={70} cy={324} rx={28} ry={6} fill={C.ink} />
    <rect x={66} y={292} width={8} height={36} fill={C.inkSoft} />
    <path d="M 70 292 Q 70 60 180 60" stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 150 60 Q 180 30 210 60 L 204 90 L 156 90 Z" fill={C.lime} />
    <path d="M 150 60 Q 180 30 210 60" stroke={C.limeDeep} strokeWidth={2} fill="none" />
    <ellipse cx={180} cy={90} rx={24} ry={4} fill={C.limeDeep} />
    <path d="M 160 92 L 200 92 L 220 200 L 140 200 Z" fill={C.lime} opacity={0.14} />
  </g>
);
const lampBukitThumb = (
  <Thumb>
    <path d="M 16 46 Q 16 16 38 16" stroke={C.ink} strokeWidth={2} fill="none" />
    <path d="M 30 16 Q 38 8 46 16 L 44 22 L 32 22 Z" fill={C.lime} />
    <ellipse cx={16} cy={48} rx={6} ry={2} fill={C.ink} />
  </Thumb>
);

const lampWarung = () => (
  <g transform="translate(780, 310)">
    <path d="M 20 80 L 60 80 L 56 96 L 24 96 Z" fill={C.teal} />
    <ellipse cx={40} cy={80} rx={20} ry={4} fill={C.tealDeep} />
    <rect x={36} y={62} width={8} height={20} fill={C.inkSoft} />
    <path d="M 14 30 L 66 30 L 56 64 L 24 64 Z" fill={C.paperSoft} />
    <path d="M 14 30 L 66 30" stroke={C.line} strokeWidth={1} fill="none" />
    <path d="M 24 64 L 56 64 L 64 90 L 16 90 Z" fill={C.lime} opacity={0.25} />
  </g>
);
const lampWarungThumb = (
  <Thumb>
    <path d="M 16 16 L 44 16 L 38 36 L 22 36 Z" fill={C.paperSoft} stroke={C.line} />
    <rect x={28} y={36} width={4} height={8} fill={C.inkSoft} />
    <path d="M 18 44 L 42 44 L 40 50 L 20 50 Z" fill={C.teal} />
  </Thumb>
);

/* =========================================================
   GREENERY — floor plant. translate(880, 320) right of desk.
   ========================================================= */

const greeneryMonstera = () => (
  <g transform="translate(880, 320)">
    <Shadow cx={50} cy={224} rx={56} ry={8} />
    <path d="M 18 168 L 82 168 L 74 220 L 26 220 Z" fill={C.concrete} />
    <ellipse cx={50} cy={168} rx={32} ry={5} fill={C.concreteShade} />
    {/* leaves */}
    <path d="M 50 170 Q 10 116 14 64 Q 30 86 50 96 Z" fill={C.teal} />
    <path d="M 22 92 L 30 100 M 18 74 L 28 80" stroke={C.paper} strokeWidth={1.2} fill="none" />
    <path d="M 50 170 Q 80 106 100 54 Q 80 96 60 100 Z" fill={C.tealDeep} />
    <path d="M 88 74 L 78 80 M 92 92 L 82 94" stroke={C.paper} strokeWidth={1.2} fill="none" />
    <path d="M 50 170 Q 50 106 40 34 Q 56 64 60 104 Z" fill={C.teal} />
    <path d="M 50 64 L 46 68 M 52 84 L 48 88" stroke={C.paper} strokeWidth={1} fill="none" />
  </g>
);
const greeneryMonsteraThumb = (
  <Thumb>
    <path d="M 30 30 Q 14 20 12 8 Q 22 18 30 18 Z" fill={C.teal} />
    <path d="M 30 30 Q 46 20 48 8 Q 38 18 30 18 Z" fill={C.tealDeep} />
    <path d="M 30 30 Q 28 14 24 4 Q 32 12 32 22 Z" fill={C.teal} />
    <path d="M 20 30 L 40 30 L 38 50 L 22 50 Z" fill={C.concrete} />
  </Thumb>
);

const greeneryPalm = () => (
  <g transform="translate(60, 260)">
    <Shadow cx={70} cy={278} rx={68} ry={8} />
    <path d="M 22 216 L 118 216 L 108 276 L 32 276 Z" fill={C.rattan} />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={26 + i * 5} y1={218} x2={24 + i * 5} y2={274} stroke={C.rattanShade} strokeWidth={0.8} opacity={0.7} />
    ))}
    <ellipse cx={70} cy={216} rx={48} ry={6} fill={C.rattanShade} />
    {/* fronds */}
    <path d="M 70 216 Q 36 130 8 80 Q 28 130 50 168" stroke={C.teal} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 70 216 Q 104 130 132 80 Q 112 130 90 168" stroke={C.tealDeep} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 70 216 Q 58 120 46 30" stroke={C.teal} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 70 216 Q 82 120 94 30" stroke={C.tealDeep} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 70 216 L 70 36" stroke={C.teal} strokeWidth={4} strokeLinecap="round" />
  </g>
);
const greeneryPalmThumb = (
  <Thumb>
    <path d="M 30 36 Q 16 22 8 10" stroke={C.teal} strokeWidth={2} fill="none" />
    <path d="M 30 36 Q 44 22 52 10" stroke={C.tealDeep} strokeWidth={2} fill="none" />
    <path d="M 30 36 L 30 6" stroke={C.teal} strokeWidth={2} />
    <path d="M 18 38 L 42 38 L 40 52 L 20 52 Z" fill={C.rattan} />
  </Thumb>
);

const greenerySnake = () => (
  <g transform="translate(900, 360)">
    <Shadow cx={40} cy={180} rx={42} ry={6} />
    <rect x={10} y={130} width={60} height={56} fill={C.concrete} />
    <rect x={10} y={130} width={60} height={8} fill={C.concreteShade} opacity={0.6} />
    <path d="M 40 130 L 36 36 L 44 36 L 48 130" fill={C.teal} />
    <path d="M 28 130 L 22 56 L 30 56 L 32 130" fill={C.tealDeep} />
    <path d="M 52 130 L 58 66 L 50 66 L 48 130" fill={C.teal} />
    <path d="M 38 56 L 42 60 M 26 76 L 30 80 M 52 86 L 56 90" stroke={C.paper} strokeWidth={0.8} />
  </g>
);
const greenerySnakeThumb = (
  <Thumb>
    <path d="M 30 40 L 28 10 L 32 10 L 34 40" fill={C.teal} />
    <path d="M 22 40 L 18 18 L 22 18 L 26 40" fill={C.tealDeep} />
    <path d="M 38 40 L 42 18 L 38 18 L 34 40" fill={C.teal} />
    <rect x={16} y={40} width={28} height={14} fill={C.concrete} />
  </Thumb>
);

/* =========================================================
   COFFEE STATION — far left, sits on the shared CoffeeTable.
   Slot anchors on the table top (y=470 in scene coords).
   index 0: left slot, index 1: right slot.
   ========================================================= */

const COFFEE_SLOTS = [
  { x: 30, y: 380 },  // left slot
  { x: 180, y: 380 }, // right slot
];

const coffeeEspresso = (index: number) => {
  const a = COFFEE_SLOTS[index] ?? COFFEE_SLOTS[0];
  return (
    <g transform={`translate(${a.x}, ${a.y})`}>
      {/* machine body */}
      <rect x={2} y={50} width={84} height={70} rx={3} fill={C.ink} />
      <rect x={2} y={50} width={84} height={6} fill={C.inkSoft} />
      {/* group head */}
      <rect x={30} y={90} width={28} height={20} fill={C.brass} />
      <rect x={34} y={106} width={20} height={6} fill={C.brassShade} />
      {/* portafilter handle */}
      <rect x={38} y={112} width={12} height={18} fill={C.walnutDeep} />
      {/* drip cup */}
      <ellipse cx={44} cy={120} rx={10} ry={2} fill={C.paper} />
      {/* steam wand */}
      <line x1={78} y1={66} x2={88} y2={86} stroke={C.brass} strokeWidth={2} strokeLinecap="round" />
      {/* power indicator */}
      <circle cx={14} cy={68} r={3} fill={C.lime} />
      {/* portafilter label */}
      <rect x={10} y={62} width={28} height={10} fill={C.paper} />
      <line x1={16} y1={67} x2={32} y2={67} stroke={C.ink} strokeWidth={0.7} />
    </g>
  );
};
const coffeeEspressoThumb = (
  <Thumb>
    <rect x={6} y={42} width={48} height={10} fill={C.walnut} />
    <rect x={14} y={16} width={32} height={26} fill={C.ink} />
    <rect x={22} y={28} width={16} height={10} fill={C.brass} />
    <rect x={26} y={36} width={8} height={6} fill={C.walnutDeep} />
    <circle cx={18} cy={22} r={1.5} fill={C.lime} />
  </Thumb>
);

const coffeeV60 = (index: number) => {
  const a = COFFEE_SLOTS[index] ?? COFFEE_SLOTS[0];
  return (
    <g transform={`translate(${a.x + 6}, ${a.y + 30})`}>
      {/* kettle */}
      <path d="M 14 30 L 26 30 L 34 70 L 6 70 Z" fill={C.ink} />
      <rect x={10} y={26} width={20} height={6} rx={2} fill={C.inkSoft} />
      {/* gooseneck spout */}
      <path d="M 26 40 Q 56 30 56 62" stroke={C.ink} strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* handle */}
      <path d="M 6 40 Q -4 48 0 62 L 6 62" stroke={C.ink} strokeWidth={3} fill="none" />
      {/* V60 dripper */}
      <path d="M 70 46 L 110 46 L 92 74 L 88 74 Z" fill={C.paper} />
      <path d="M 70 46 L 110 46" stroke={C.lime} strokeWidth={2} />
      <path d="M 76 48 L 104 48 L 92 70 L 88 70 Z" fill={C.paperSoft} />
      {/* server jug */}
      <rect x={78} y={64} width={24} height={14} fill={C.paperSoft} stroke={C.ink} strokeWidth={1} />
    </g>
  );
};

/* Coffee table — structural element drawn when any coffee item is selected.
   Always at the same position. Rendered by the Workspace component, not as
   a regular catalog item. */
export const CoffeeTable = () => (
  <g transform="translate(20, 470)">
    <Shadow cx={150} cy={68} rx={150} ry={9} />
    {/* table surface */}
    <rect x={0} y={0} width={300} height={20} fill={C.walnut} />
    <rect x={0} y={16} width={300} height={4} fill={C.walnutDeep} />
    {/* legs (hairpin style) */}
    <path d="M 16 20 Q 8 40 18 64" stroke={C.ink} strokeWidth={2.5} fill="none" strokeLinecap="round" />
    <path d="M 284 20 Q 292 40 282 64" stroke={C.ink} strokeWidth={2.5} fill="none" strokeLinecap="round" />
    {/* lower shelf */}
    <rect x={10} y={48} width={280} height={10} fill={C.walnutLight} />
    <rect x={10} y={56} width={280} height={2} fill={C.walnut} />
    {/* coffee beans stash on lower shelf */}
    <rect x={30} y={36} width={20} height={12} fill={C.walnutDeep} rx={1} />
    <rect x={56} y={36} width={20} height={12} fill={C.walnutDeep} rx={1} />
    {/* lime label */}
    <rect x={32} y={40} width={16} height={4} fill={C.lime} opacity={0.85} />
    {/* poster on wall above table */}
    <rect x={70} y={-160} width={120} height={140} fill={C.paper} stroke={C.line} strokeWidth={1} />
    <rect x={78} y={-150} width={104} height={80} fill={C.lime} opacity={0.3} />
    <rect x={78} y={-62} width={50} height={6} fill={C.ink} />
    <rect x={78} y={-50} width={70} height={4} fill={C.inkSoft} />
    <rect x={78} y={-42} width={40} height={4} fill={C.inkSoft} opacity={0.5} />
  </g>
);
const coffeeV60Thumb = (
  <Thumb>
    <rect x={6} y={40} width={48} height={8} fill={C.walnut} />
    <path d="M 8 20 L 18 20 L 24 40 L 4 40 Z" fill={C.ink} />
    <path d="M 28 24 L 50 24 L 44 38 L 34 38 Z" fill={C.paper} stroke={C.lime} strokeWidth={1} />
  </Thumb>
);

/* =========================================================
   OUTDOOR GEAR — leans against right wall. translate(1040, 220)
   ========================================================= */

const outdoorSurfboard = () => (
  <g transform="translate(1090, 180)">
    <Shadow cx={60} cy={350} rx={42} ry={7} />
    {/* board leaning */}
    <g transform="rotate(-12, 60, 180)">
      <path d="M 56 0 Q 78 6 80 60 L 78 320 Q 66 350 56 350 Q 46 350 34 320 L 36 60 Q 38 6 56 0 Z" fill={C.paper} stroke={C.line} strokeWidth={1} />
      {/* stripe */}
      <rect x={46} y={60} width={20} height={240} fill={C.lime} opacity={0.85} />
      {/* fin */}
      <path d="M 56 280 L 56 326 L 50 326 Z" fill={C.teal} />
      {/* leash plug */}
      <circle cx={57} cy={336} r={2.5} fill={C.ink} />
    </g>
  </g>
);
const outdoorSurfboardThumb = (
  <Thumb>
    <g transform="rotate(-15, 30, 30)">
      <path d="M 28 8 Q 36 12 36 28 L 36 50 Q 32 54 28 54 Q 24 54 20 50 L 20 28 Q 20 12 28 8 Z" fill={C.paper} stroke={C.line} />
      <rect x={24} y={20} width={8} height={28} fill={C.lime} />
    </g>
  </Thumb>
);

const outdoorMotorcycle = () => (
  <g transform="translate(1000, 370) scale(0.85)">
    <Shadow cx={120} cy={150} rx={120} ry={6} />
    {/* rear wheel */}
    <circle cx={40} cy={130} r={26} fill={C.ink} />
    <circle cx={40} cy={130} r={14} fill={C.inkSoft} />
    <circle cx={40} cy={130} r={4} fill={C.paper} />
    {/* front wheel */}
    <circle cx={200} cy={130} r={26} fill={C.ink} />
    <circle cx={200} cy={130} r={14} fill={C.inkSoft} />
    <circle cx={200} cy={130} r={4} fill={C.paper} />
    {/* body */}
    <path d="M 20 110 Q 60 80 130 80 L 160 80 Q 180 80 200 105 L 200 120 L 160 120 Q 120 116 60 120 L 20 120 Z" fill={C.teal} />
    <path d="M 60 90 L 150 80 L 150 100 L 60 100 Z" fill={C.tealDeep} />
    {/* seat */}
    <path d="M 90 70 L 150 70 L 156 80 L 84 80 Z" fill={C.ink} />
    {/* handlebars */}
    <path d="M 180 50 L 200 80" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
    <path d="M 180 50 L 200 50 L 200 60" stroke={C.ink} strokeWidth={3} fill="none" />
    {/* headlight */}
    <circle cx={210} cy={92} r={6} fill={C.lime} />
    {/* mirror */}
    <line x1={196} y1={50} x2={196} y2={40} stroke={C.ink} strokeWidth={2} />
    <ellipse cx={196} cy={36} rx={4} ry={3} fill={C.ink} />
  </g>
);
const outdoorMotorcycleThumb = (
  <Thumb>
    <circle cx={16} cy={42} r={8} fill={C.ink} />
    <circle cx={44} cy={42} r={8} fill={C.ink} />
    <path d="M 10 32 Q 22 22 42 22 L 50 32 L 50 38 L 14 38 Z" fill={C.teal} />
    <path d="M 24 18 L 42 18 L 44 24 L 22 24 Z" fill={C.ink} />
    <circle cx={50} cy={28} r={2} fill={C.lime} />
  </Thumb>
);

/* =========================================================
   RELAX ZONE — front right floor. translate(870, 470)
   ========================================================= */

const relaxBeanBag = () => (
  <g transform="translate(870, 460)">
    <Shadow cx={120} cy={108} rx={120} ry={8} />
    {/* bean bag — squishy organic shape */}
    <path
      d="M 22 80 Q 0 28 70 14 Q 130 4 190 22 Q 240 36 232 84 Q 226 116 180 116 Q 120 122 60 116 Q 22 110 22 80 Z"
      fill={C.walnut}
    />
    {/* highlight */}
    <path
      d="M 40 60 Q 80 38 130 38"
      stroke={C.walnutLight}
      strokeWidth={4}
      fill="none"
      strokeLinecap="round"
      opacity={0.7}
    />
    {/* stitching */}
    <path d="M 70 70 Q 100 64 134 68" stroke={C.walnutDeep} strokeWidth={1} fill="none" opacity={0.6} />
    <path d="M 80 84 Q 120 80 170 84" stroke={C.walnutDeep} strokeWidth={1} fill="none" opacity={0.5} />
    {/* lime cushion on top */}
    <ellipse cx={130} cy={28} rx={36} ry={10} fill={C.lime} opacity={0.85} />
  </g>
);
const relaxBeanBagThumb = (
  <Thumb>
    <path d="M 10 40 Q 6 22 30 16 Q 50 12 52 36 Q 50 48 30 48 Q 14 48 10 40 Z" fill={C.walnut} />
    <ellipse cx={32} cy={20} rx={12} ry={4} fill={C.lime} />
  </Thumb>
);

const relaxHammock = () => (
  <g transform="translate(880, 280)">
    <Shadow cx={120} cy={258} rx={70} ry={6} />
    {/* rope */}
    <path d="M 110 0 L 60 70 M 110 0 L 180 70" stroke={C.ink} strokeWidth={2} fill="none" />
    {/* hammock chair body */}
    <path d="M 50 70 Q 60 60 80 60 L 160 60 Q 180 60 190 70 L 200 130 Q 175 170 150 180 L 90 180 Q 65 170 40 130 Z" fill={C.rattan} />
    {/* weave */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <path
        key={i}
        d={`M ${52 + i * 22} 70 Q ${52 + i * 22 - 2} 120 ${52 + i * 22} 170`}
        stroke={C.rattanShade}
        strokeWidth={0.8}
        fill="none"
        opacity={0.6}
      />
    ))}
    <path d="M 50 70 Q 120 80 190 70" stroke={C.rattanShade} strokeWidth={1.5} fill="none" />
    {/* cushion */}
    <path d="M 70 110 Q 120 102 170 110 L 168 158 Q 120 152 72 158 Z" fill={C.paperSoft} />
  </g>
);
const relaxHammockThumb = (
  <Thumb>
    <path d="M 30 6 L 18 22 M 30 6 L 42 22" stroke={C.ink} strokeWidth={1} fill="none" />
    <path d="M 14 22 Q 18 18 26 18 L 34 18 Q 42 18 46 22 L 46 42 Q 38 50 30 50 Q 22 50 14 42 Z" fill={C.rattan} />
    <path d="M 18 30 Q 30 26 42 30 L 42 40 Q 30 36 18 40 Z" fill={C.paperSoft} />
  </Thumb>
);

/* =========================================================
   CATALOG
   ========================================================= */

export const CATALOG: Item[] = [
  // Desks
  { id: "desk-pandanus", category: "desk", name: "Pandanus desk", blurb: "Light walnut top, hairpin legs.", pricePerDay: 6, scene: deskPandanus, thumb: deskPandanusThumb },
  { id: "desk-batu", category: "desk", name: "Batu workbench", blurb: "Solid walnut slab on chunky block legs.", pricePerDay: 9, scene: deskBatu, thumb: deskBatuThumb },
  { id: "desk-rotan", category: "desk", name: "Rotan writing table", blurb: "Paper top, woven rattan front.", pricePerDay: 8, scene: deskRotan, thumb: deskRotanThumb },

  // Chairs
  { id: "chair-uluwatu", category: "chair", name: "Uluwatu task chair", blurb: "Mesh back, 8-hour comfort.", pricePerDay: 5, scene: chairUluwatu, thumb: chairUluwatuThumb },
  { id: "chair-bambu", category: "chair", name: "Bambu lounge", blurb: "Walnut frame, paper cushion, lime accent.", pricePerDay: 6, scene: chairBambu, thumb: chairBambuThumb },
  { id: "chair-anyam", category: "chair", name: "Anyam woven", blurb: "Rattan dome back, lime cushion.", pricePerDay: 7, scene: chairAnyam, thumb: chairAnyamThumb },

  // Monitors
  { id: "monitor-ultrawide", category: "monitor", name: "34″ ultrawide", blurb: "Curved 34″ panel for serious focus.", pricePerDay: 4, scene: monitorUltrawide, thumb: monitorUltrawideThumb },
  { id: "monitor-studio", category: "monitor", name: "27″ studio", blurb: "Single 27″ on a walnut riser.", pricePerDay: 3, scene: monitorStudio, thumb: monitorStudioThumb },
  { id: "monitor-vertical", category: "monitor", name: "24″ vertical", blurb: "Portrait 24″ — great for docs & code.", pricePerDay: 3, scene: monitorVertical, thumb: monitorVerticalThumb },

  // Accessories
  { id: "acc-keyboard", category: "accessory", name: "Mechanical keyboard", blurb: "Tactile switches, lime keycap accents.", pricePerDay: 2, scene: accKeyboard, thumb: accKeyboardThumb },
  { id: "acc-mouse", category: "accessory", name: "Ergonomic mouse", blurb: "Low-profile, palm-friendly.", pricePerDay: 1, scene: accMouse, thumb: accMouseThumb },
  { id: "acc-mug", category: "accessory", name: "Lime mug", blurb: "Stoneware coffee mug.", pricePerDay: 1, scene: accMug, thumb: accMugThumb },
  { id: "acc-headphones", category: "accessory", name: "Over-ear headphones", blurb: "ANC closed-back for focus.", pricePerDay: 2, scene: accHeadphones, thumb: accHeadphonesThumb },

  // Lighting
  { id: "lamp-bukit", category: "lighting", name: "Bukit arc lamp", blurb: "Tall arc floor lamp with lime dome.", pricePerDay: 3, scene: lampBukit, thumb: lampBukitThumb },
  { id: "lamp-warung", category: "lighting", name: "Warung desk lamp", blurb: "Teal base, warm paper shade.", pricePerDay: 2, scene: lampWarung, thumb: lampWarungThumb },

  // Greenery
  { id: "plant-monstera", category: "greenery", name: "Monstera", blurb: "Split leaves in a concrete pot.", pricePerDay: 2, scene: greeneryMonstera, thumb: greeneryMonsteraThumb },
  { id: "plant-palm", category: "greenery", name: "Areca palm", blurb: "Tall fronds in a woven basket.", pricePerDay: 3, scene: greeneryPalm, thumb: greeneryPalmThumb },
  { id: "plant-snake", category: "greenery", name: "Snake plant", blurb: "Sculptural and forgiving.", pricePerDay: 2, scene: greenerySnake, thumb: greenerySnakeThumb },

  // Coffee
  { id: "coffee-espresso", category: "coffee", name: "Espresso machine", blurb: "Single-group, brass details.", pricePerDay: 5, scene: coffeeEspresso, thumb: coffeeEspressoThumb },
  { id: "coffee-v60", category: "coffee", name: "V60 pour-over kit", blurb: "Gooseneck kettle, dripper, server.", pricePerDay: 3, scene: coffeeV60, thumb: coffeeV60Thumb },

  // Outdoor
  { id: "outdoor-surfboard", category: "outdoor", name: "Longboard", blurb: "9'2″ glassed longboard, lime stripe.", pricePerDay: 4, scene: outdoorSurfboard, thumb: outdoorSurfboardThumb },
  { id: "outdoor-motorcycle", category: "outdoor", name: "Scooter", blurb: "125cc automatic, helmet included.", pricePerDay: 7, scene: outdoorMotorcycle, thumb: outdoorMotorcycleThumb },

  // Relax
  { id: "relax-beanbag", category: "relax", name: "Bean bag", blurb: "Oversized, walnut linen, lime cushion.", pricePerDay: 3, scene: relaxBeanBag, thumb: relaxBeanBagThumb },
  { id: "relax-hammock", category: "relax", name: "Hammock chair", blurb: "Rattan weave, paper cushion.", pricePerDay: 4, scene: relaxHammock, thumb: relaxHammockThumb },
];

export const CATALOG_BY_ID: Record<string, Item> = Object.fromEntries(
  CATALOG.map((i) => [i.id, i]),
);
