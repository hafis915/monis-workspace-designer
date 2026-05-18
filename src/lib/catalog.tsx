import type { Item } from "./types";

/*
 * Scene viewBox: 800 x 600
 * Floor horizon: y = 460
 * Each scene item returns a <g> positioned absolutely.
 * Each thumb returns a standalone <svg>.
 */

const C = {
  sand: "#F5EFE6",
  sandDeep: "#EBE2D3",
  terracotta: "#C97B5F",
  terracottaDeep: "#A85E44",
  jungle: "#3D5B4A",
  jungleDeep: "#2A4334",
  charcoal: "#1F1B16",
  charcoalSoft: "#57514A",
  woodLight: "#D9B98E",
  woodLightShade: "#B89368",
  woodDark: "#6F4F37",
  woodDarkShade: "#4E3624",
  rattan: "#C9A876",
  rattanShade: "#9F7F4F",
  brass: "#C8A356",
  brassShade: "#9C7D3E",
  linen: "#E8DEC8",
  concrete: "#BCB6AB",
  paper: "#F7F1E3",
  shadow: "rgba(31,27,22,0.18)",
};

const Shadow = ({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={C.shadow} />
);

/* ----- THUMBS (60x60 standalone SVGs) ----- */
const Thumb = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true">
    <rect width="60" height="60" rx="10" fill={C.sandDeep} />
    {children}
  </svg>
);

/* =========================================================
   DESKS — anchor: translate(220, 320). Local 0,0 is top-left.
   Desk surface should sit at local y=0..18. Legs go down to y=140.
   ========================================================= */

const DeskPandanus = (
  <g transform="translate(200, 320)">
    <Shadow cx={200} cy={158} rx={210} ry={10} />
    {/* legs (hairpin) */}
    <path
      d="M 30 18 Q 18 80 28 152 M 30 18 Q 36 80 48 152"
      stroke={C.charcoal}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 360 18 Q 348 80 358 152 M 360 18 Q 366 80 378 152"
      stroke={C.charcoal}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    {/* surface */}
    <rect x={0} y={0} width={400} height={18} fill={C.woodLight} />
    <rect x={0} y={14} width={400} height={4} fill={C.woodLightShade} />
    {/* grain */}
    <path d="M 30 7 L 380 7" stroke={C.woodLightShade} strokeWidth={0.6} opacity={0.6} />
    <path d="M 60 11 L 360 11" stroke={C.woodLightShade} strokeWidth={0.4} opacity={0.5} />
  </g>
);
const DeskPandanusThumb = (
  <Thumb>
    <rect x={10} y={26} width={40} height={6} fill={C.woodLight} />
    <path d="M14 32 v18 M46 32 v18" stroke={C.charcoal} strokeWidth={2} strokeLinecap="round" />
  </Thumb>
);

const DeskBatu = (
  <g transform="translate(200, 320)">
    <Shadow cx={200} cy={158} rx={210} ry={10} />
    {/* legs (block) */}
    <rect x={20} y={20} width={32} height={132} fill={C.woodDarkShade} />
    <rect x={20} y={20} width={32} height={132} fill={C.woodDark} clipPath="inset(0 8px 0 0)" />
    <rect x={348} y={20} width={32} height={132} fill={C.woodDarkShade} />
    <rect x={348} y={20} width={32} height={132} fill={C.woodDark} clipPath="inset(0 8px 0 0)" />
    {/* surface */}
    <rect x={-10} y={0} width={420} height={24} fill={C.woodDark} />
    <rect x={-10} y={20} width={420} height={4} fill={C.woodDarkShade} />
    <path d="M 20 9 L 380 9" stroke={C.woodDarkShade} strokeWidth={0.7} opacity={0.6} />
    <path d="M 50 14 L 350 14" stroke={C.woodDarkShade} strokeWidth={0.5} opacity={0.5} />
  </g>
);
const DeskBatuThumb = (
  <Thumb>
    <rect x={8} y={26} width={44} height={8} fill={C.woodDark} />
    <rect x={13} y={34} width={8} height={16} fill={C.woodDarkShade} />
    <rect x={39} y={34} width={8} height={16} fill={C.woodDarkShade} />
  </Thumb>
);

const DeskRotan = (
  <g transform="translate(200, 320)">
    <Shadow cx={200} cy={158} rx={210} ry={10} />
    {/* front rattan panel */}
    <rect x={0} y={18} width={400} height={130} fill={C.rattan} />
    {/* rattan weave */}
    {Array.from({ length: 20 }).map((_, i) => (
      <line
        key={`v${i}`}
        x1={20 + i * 18}
        y1={26}
        x2={20 + i * 18}
        y2={140}
        stroke={C.rattanShade}
        strokeWidth={1.2}
        opacity={0.7}
      />
    ))}
    {Array.from({ length: 7 }).map((_, i) => (
      <line
        key={`h${i}`}
        x1={4}
        y1={32 + i * 18}
        x2={396}
        y2={32 + i * 18}
        stroke={C.rattanShade}
        strokeWidth={1.2}
        opacity={0.5}
      />
    ))}
    {/* top */}
    <rect x={-6} y={0} width={412} height={22} fill={C.paper} />
    <rect x={-6} y={18} width={412} height={4} fill={C.rattanShade} />
  </g>
);
const DeskRotanThumb = (
  <Thumb>
    <rect x={8} y={24} width={44} height={4} fill={C.paper} stroke={C.rattanShade} />
    <rect x={10} y={28} width={40} height={22} fill={C.rattan} />
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1={14 + i * 8} y1={29} x2={14 + i * 8} y2={49} stroke={C.rattanShade} strokeWidth={1} />
    ))}
  </Thumb>
);

/* =========================================================
   CHAIRS — anchor: translate(440, 290). Sits to right of desk.
   ========================================================= */

const ChairUluwatu = (
  <g transform="translate(440, 290)">
    <Shadow cx={70} cy={195} rx={70} ry={8} />
    {/* base */}
    <path d="M 30 178 L 110 178 L 100 192 L 40 192 Z" fill={C.charcoal} />
    {/* pole */}
    <rect x={66} y={140} width={8} height={40} fill={C.charcoalSoft} />
    {/* seat */}
    <rect x={30} y={120} width={80} height={22} rx={4} fill={C.charcoal} />
    <rect x={30} y={136} width={80} height={6} fill={C.charcoalSoft} />
    {/* back (mesh) */}
    <path d="M 38 24 Q 70 0 102 24 L 102 120 L 38 120 Z" fill={C.jungle} />
    <path d="M 38 24 Q 70 0 102 24 L 102 120 L 38 120 Z" fill="none" stroke={C.jungleDeep} strokeWidth={2} />
    {/* mesh lines */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={i} x1={42} y1={36 + i * 14} x2={98} y2={36 + i * 14} stroke={C.jungleDeep} strokeWidth={0.6} opacity={0.5} />
    ))}
    {/* arm */}
    <path d="M 102 86 Q 122 86 122 110 L 118 110 Q 118 90 102 90 Z" fill={C.charcoalSoft} />
  </g>
);
const ChairUluwatuThumb = (
  <Thumb>
    <path d="M 18 14 Q 30 6 42 14 L 42 34 L 18 34 Z" fill={C.jungle} />
    <rect x={20} y={34} width={20} height={6} fill={C.charcoal} />
    <rect x={28} y={40} width={4} height={8} fill={C.charcoalSoft} />
    <path d="M 22 48 L 38 48 L 36 52 L 24 52 Z" fill={C.charcoal} />
  </Thumb>
);

const ChairBambu = (
  <g transform="translate(440, 280)">
    <Shadow cx={75} cy={205} rx={70} ry={8} />
    {/* back curve */}
    <path d="M 24 30 Q 22 130 30 200 L 50 200 Q 38 130 44 36 Z" fill={C.woodLight} />
    <path d="M 28 32 Q 26 130 34 198" stroke={C.woodLightShade} strokeWidth={1} fill="none" />
    {/* seat cushion */}
    <path d="M 28 138 Q 90 130 130 138 L 130 168 Q 90 162 28 168 Z" fill={C.linen} />
    <path d="M 28 138 Q 90 130 130 138" stroke={C.woodLightShade} strokeWidth={1} fill="none" />
    {/* front legs */}
    <path d="M 36 168 Q 36 188 30 200" stroke={C.woodLight} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M 124 168 Q 124 188 130 200" stroke={C.woodLight} strokeWidth={6} fill="none" strokeLinecap="round" />
    {/* back top curve */}
    <path d="M 24 30 Q 86 12 144 32 L 142 44 Q 86 26 24 42 Z" fill={C.woodLightShade} />
    {/* right back rail */}
    <path d="M 138 36 Q 144 130 132 200 L 122 200 Q 130 130 124 38 Z" fill={C.woodLight} />
  </g>
);
const ChairBambuThumb = (
  <Thumb>
    <path d="M 16 14 Q 30 8 44 14 L 44 22 Q 30 18 16 22 Z" fill={C.woodLightShade} />
    <path d="M 18 22 Q 16 38 22 48 L 38 48 Q 44 38 42 22 Z" fill={C.woodLight} />
    <path d="M 18 34 Q 30 30 42 34 L 42 42 Q 30 38 18 42 Z" fill={C.linen} />
  </Thumb>
);

const ChairAnyam = (
  <g transform="translate(440, 270)">
    <Shadow cx={70} cy={215} rx={70} ry={8} />
    {/* round woven back */}
    <ellipse cx={70} cy={70} rx={62} ry={62} fill={C.rattan} />
    <ellipse cx={70} cy={70} rx={62} ry={62} fill="none" stroke={C.rattanShade} strokeWidth={2} />
    {/* weave detail */}
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={i}
        d={`M ${20 + i * 6} 30 Q 70 ${50 + i * 4} ${120 - i * 6} 30`}
        stroke={C.rattanShade}
        strokeWidth={0.8}
        fill="none"
        opacity={0.6}
      />
    ))}
    {/* cushion */}
    <path d="M 16 130 Q 70 122 124 130 L 124 158 Q 70 152 16 158 Z" fill={C.terracotta} />
    <path d="M 16 130 Q 70 122 124 130" stroke={C.terracottaDeep} strokeWidth={1} fill="none" />
    {/* legs */}
    <path d="M 32 158 L 28 210" stroke={C.charcoal} strokeWidth={4} strokeLinecap="round" />
    <path d="M 108 158 L 112 210" stroke={C.charcoal} strokeWidth={4} strokeLinecap="round" />
  </g>
);
const ChairAnyamThumb = (
  <Thumb>
    <ellipse cx={30} cy={24} rx={16} ry={16} fill={C.rattan} stroke={C.rattanShade} />
    <rect x={16} y={36} width={28} height={8} rx={2} fill={C.terracotta} />
    <line x1={20} y1={44} x2={20} y2={52} stroke={C.charcoal} strokeWidth={2} />
    <line x1={40} y1={44} x2={40} y2={52} stroke={C.charcoal} strokeWidth={2} />
  </Thumb>
);

/* =========================================================
   MONITORS — anchor: translate(310, 200). Sits on desk surface (y~320).
   ========================================================= */

const MonitorUltrawide = (
  <g transform="translate(280, 200)">
    {/* curve */}
    <path
      d="M 0 18 Q 120 0 240 18 L 240 110 Q 120 122 0 110 Z"
      fill={C.charcoal}
    />
    <path
      d="M 8 24 Q 120 10 232 24 L 232 102 Q 120 112 8 102 Z"
      fill={C.jungleDeep}
    />
    <path
      d="M 14 28 Q 120 18 226 28 L 226 96 Q 120 104 14 96 Z"
      fill={C.jungle}
    />
    {/* glow */}
    <path d="M 30 36 L 90 36 L 80 56 L 30 56 Z" fill={C.sand} opacity={0.18} />
    {/* stand */}
    <rect x={108} y={120} width={24} height={14} fill={C.charcoalSoft} />
    <ellipse cx={120} cy={134} rx={40} ry={4} fill={C.charcoal} />
  </g>
);
const MonitorUltrawideThumb = (
  <Thumb>
    <path d="M 8 18 Q 30 12 52 18 L 52 36 Q 30 42 8 36 Z" fill={C.charcoal} />
    <path d="M 12 22 Q 30 18 48 22 L 48 32 Q 30 36 12 32 Z" fill={C.jungle} />
    <rect x={26} y={40} width={8} height={4} fill={C.charcoalSoft} />
    <ellipse cx={30} cy={46} rx={12} ry={2} fill={C.charcoal} />
  </Thumb>
);

const MonitorStudio = (
  <g transform="translate(330, 200)">
    <rect x={0} y={0} width={140} height={96} rx={4} fill={C.charcoal} />
    <rect x={6} y={6} width={128} height={80} fill={C.sand} opacity={0.92} />
    <rect x={14} y={16} width={50} height={5} fill={C.terracotta} opacity={0.7} />
    <rect x={14} y={26} width={80} height={3} fill={C.charcoalSoft} opacity={0.4} />
    <rect x={14} y={34} width={66} height={3} fill={C.charcoalSoft} opacity={0.3} />
    {/* stand */}
    <rect x={62} y={96} width={16} height={14} fill={C.charcoalSoft} />
    <rect x={40} y={108} width={60} height={8} rx={2} fill={C.woodLight} />
    <rect x={40} y={114} width={60} height={2} fill={C.woodLightShade} />
  </g>
);
const MonitorStudioThumb = (
  <Thumb>
    <rect x={12} y={16} width={36} height={24} rx={2} fill={C.charcoal} />
    <rect x={14} y={18} width={32} height={20} fill={C.sand} />
    <rect x={26} y={40} width={8} height={4} fill={C.charcoalSoft} />
    <rect x={18} y={44} width={24} height={4} fill={C.woodLight} />
  </Thumb>
);

/* =========================================================
   LIGHTING
   - lamp-bukit: floor lamp, left of desk. translate(60, 160)
   - lamp-warung: desk lamp, right edge of desk. translate(540, 250)
   ========================================================= */

const LampBukit = (
  <g transform="translate(60, 160)">
    <Shadow cx={70} cy={300} rx={50} ry={6} />
    {/* base */}
    <ellipse cx={70} cy={296} rx={28} ry={6} fill={C.charcoal} />
    <rect x={66} y={264} width={8} height={36} fill={C.charcoalSoft} />
    {/* pole */}
    <path d="M 70 264 Q 70 60 160 60" stroke={C.charcoal} strokeWidth={4} fill="none" strokeLinecap="round" />
    {/* shade (brass dome) */}
    <path d="M 130 60 Q 160 30 190 60 L 184 90 L 136 90 Z" fill={C.brass} />
    <path d="M 130 60 Q 160 30 190 60" stroke={C.brassShade} strokeWidth={2} fill="none" />
    <ellipse cx={160} cy={90} rx={24} ry={4} fill={C.brassShade} />
    {/* light glow */}
    <path d="M 140 92 L 180 92 L 200 160 L 120 160 Z" fill={C.brass} opacity={0.18} />
  </g>
);
const LampBukitThumb = (
  <Thumb>
    <path d="M 16 46 Q 16 16 38 16" stroke={C.charcoal} strokeWidth={2} fill="none" />
    <path d="M 30 16 Q 38 8 46 16 L 44 22 L 32 22 Z" fill={C.brass} />
    <ellipse cx={16} cy={48} rx={6} ry={2} fill={C.charcoal} />
  </Thumb>
);

const LampWarung = (
  <g transform="translate(540, 240)">
    {/* base ceramic */}
    <path d="M 20 80 L 60 80 L 56 96 L 24 96 Z" fill={C.terracotta} />
    <ellipse cx={40} cy={80} rx={20} ry={4} fill={C.terracottaDeep} />
    {/* neck */}
    <rect x={36} y={62} width={8} height={20} fill={C.charcoalSoft} />
    {/* shade */}
    <path d="M 14 30 L 66 30 L 56 64 L 24 64 Z" fill={C.linen} />
    <path d="M 14 30 L 66 30" stroke={C.woodLightShade} strokeWidth={1} fill="none" />
    {/* glow */}
    <path d="M 24 64 L 56 64 L 64 90 L 16 90 Z" fill={C.linen} opacity={0.3} />
  </g>
);
const LampWarungThumb = (
  <Thumb>
    <path d="M 16 16 L 44 16 L 38 36 L 22 36 Z" fill={C.linen} stroke={C.woodLightShade} />
    <rect x={28} y={36} width={4} height={8} fill={C.charcoalSoft} />
    <path d="M 18 44 L 42 44 L 40 50 L 20 50 Z" fill={C.terracotta} />
  </Thumb>
);

/* =========================================================
   PLANTS
   - monstera: floor right. translate(620, 250)
   - palm: floor left (between lamp and desk). translate(140, 230)
   - snake: on desk right. translate(620, 250) — actually use floor right too
   Picking different anchors so they don't overlap others. We pick only one
   plant per scene, so they can share an anchor.
   ========================================================= */

const PlantMonstera = (
  <g transform="translate(620, 250)">
    <Shadow cx={50} cy={210} rx={56} ry={8} />
    {/* pot */}
    <path d="M 18 158 L 82 158 L 74 208 L 26 208 Z" fill={C.terracotta} />
    <path d="M 18 158 L 82 158" stroke={C.terracottaDeep} strokeWidth={2} fill="none" />
    <ellipse cx={50} cy={158} rx={32} ry={5} fill={C.terracottaDeep} />
    {/* leaves */}
    <path d="M 50 160 Q 10 110 14 60 Q 30 80 50 90 Z" fill={C.jungle} />
    <path d="M 22 88 L 30 96 M 18 70 L 28 76" stroke={C.sand} strokeWidth={1.2} fill="none" />
    <path d="M 50 160 Q 80 100 100 50 Q 80 90 60 96 Z" fill={C.jungleDeep} />
    <path d="M 88 70 L 78 76 M 92 88 L 82 90" stroke={C.sand} strokeWidth={1.2} fill="none" />
    <path d="M 50 160 Q 50 100 40 30 Q 56 60 60 100 Z" fill={C.jungle} />
    <path d="M 50 60 L 46 64 M 52 80 L 48 84" stroke={C.sand} strokeWidth={1} fill="none" />
  </g>
);
const PlantMonsteraThumb = (
  <Thumb>
    <path d="M 30 30 Q 14 20 12 8 Q 22 18 30 18 Z" fill={C.jungle} />
    <path d="M 30 30 Q 46 20 48 8 Q 38 18 30 18 Z" fill={C.jungleDeep} />
    <path d="M 30 30 Q 28 14 24 4 Q 32 12 32 22 Z" fill={C.jungle} />
    <path d="M 20 30 L 40 30 L 38 50 L 22 50 Z" fill={C.terracotta} />
  </Thumb>
);

const PlantPalm = (
  <g transform="translate(140, 230)">
    <Shadow cx={60} cy={224} rx={60} ry={8} />
    {/* basket */}
    <path d="M 18 168 L 102 168 L 94 222 L 26 222 Z" fill={C.rattan} />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={22 + i * 5} y1={170} x2={20 + i * 5} y2={220} stroke={C.rattanShade} strokeWidth={0.8} opacity={0.7} />
    ))}
    <ellipse cx={60} cy={168} rx={42} ry={6} fill={C.rattanShade} />
    {/* fronds */}
    <path d="M 60 168 Q 30 100 6 60 Q 24 100 40 130" stroke={C.jungle} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 60 168 Q 90 100 114 60 Q 96 100 80 130" stroke={C.jungleDeep} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 60 168 Q 50 90 38 20" stroke={C.jungle} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 60 168 Q 70 90 82 20" stroke={C.jungleDeep} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 60 168 L 60 30" stroke={C.jungle} strokeWidth={4} strokeLinecap="round" />
    {/* leaflets */}
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <path d={`M ${30 - i * 4} ${110 - i * 16} l -6 -2`} stroke={C.jungle} strokeWidth={1.5} />
        <path d={`M ${90 + i * 4} ${110 - i * 16} l 6 -2`} stroke={C.jungleDeep} strokeWidth={1.5} />
      </g>
    ))}
  </g>
);
const PlantPalmThumb = (
  <Thumb>
    <path d="M 30 36 Q 16 22 8 10" stroke={C.jungle} strokeWidth={2} fill="none" />
    <path d="M 30 36 Q 44 22 52 10" stroke={C.jungleDeep} strokeWidth={2} fill="none" />
    <path d="M 30 36 L 30 6" stroke={C.jungle} strokeWidth={2} />
    <path d="M 18 38 L 42 38 L 40 52 L 20 52 Z" fill={C.rattan} />
  </Thumb>
);

const PlantSnake = (
  <g transform="translate(640, 290)">
    <Shadow cx={40} cy={172} rx={42} ry={6} />
    {/* concrete pot */}
    <rect x={10} y={120} width={60} height={56} fill={C.concrete} />
    <rect x={10} y={120} width={60} height={8} fill={C.charcoalSoft} opacity={0.2} />
    {/* leaves */}
    <path d="M 40 120 L 36 30 L 44 30 L 48 120" fill={C.jungle} />
    <path d="M 28 120 L 22 50 L 30 50 L 32 120" fill={C.jungleDeep} />
    <path d="M 52 120 L 58 60 L 50 60 L 48 120" fill={C.jungle} />
    {/* speckle */}
    <path d="M 38 50 L 42 54 M 26 70 L 30 74 M 52 80 L 56 84" stroke={C.sand} strokeWidth={0.8} />
  </g>
);
const PlantSnakeThumb = (
  <Thumb>
    <path d="M 30 40 L 28 10 L 32 10 L 34 40" fill={C.jungle} />
    <path d="M 22 40 L 18 18 L 22 18 L 26 40" fill={C.jungleDeep} />
    <path d="M 38 40 L 42 18 L 38 18 L 34 40" fill={C.jungle} />
    <rect x={16} y={40} width={28} height={14} fill={C.concrete} />
  </Thumb>
);

/* =========================================================
   EXTRAS
   - rug: floor. translate(150, 440)
   - shelf: wall. translate(80, 110)
   ========================================================= */

const ExtraRug = (
  <g transform="translate(140, 432)">
    <ellipse cx={260} cy={48} rx={260} ry={28} fill={C.terracotta} />
    <ellipse cx={260} cy={46} rx={240} ry={22} fill={C.terracottaDeep} />
    <ellipse cx={260} cy={44} rx={220} ry={18} fill={C.terracotta} />
    {/* pattern */}
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={i}
        d={`M ${100 + i * 80} 36 l 8 8 l -8 8 l -8 -8 Z`}
        fill={C.sand}
        opacity={0.6}
      />
    ))}
    {/* fringe */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={`fl${i}`} x1={20 + i * 6} y1={56} x2={18 + i * 6} y2={68} stroke={C.terracottaDeep} strokeWidth={1.4} />
    ))}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <line key={`fr${i}`} x1={480 + i * 6} y1={56} x2={482 + i * 6} y2={68} stroke={C.terracottaDeep} strokeWidth={1.4} />
    ))}
  </g>
);
const ExtraRugThumb = (
  <Thumb>
    <ellipse cx={30} cy={36} rx={22} ry={8} fill={C.terracotta} />
    <ellipse cx={30} cy={34} rx={18} ry={5} fill={C.terracottaDeep} />
    <path d="M 22 34 l 3 3 l -3 3 l -3 -3 Z" fill={C.sand} opacity={0.7} />
    <path d="M 36 34 l 3 3 l -3 3 l -3 -3 Z" fill={C.sand} opacity={0.7} />
  </Thumb>
);

const ExtraShelf = (
  <g transform="translate(80, 110)">
    <Shadow cx={120} cy={36} rx={130} ry={4} />
    {/* shelf */}
    <rect x={0} y={20} width={240} height={10} fill={C.woodDark} />
    <rect x={0} y={28} width={240} height={2} fill={C.woodDarkShade} />
    {/* books */}
    <rect x={14} y={0} width={10} height={20} fill={C.terracotta} />
    <rect x={26} y={4} width={8} height={16} fill={C.jungle} />
    <rect x={36} y={2} width={9} height={18} fill={C.charcoalSoft} />
    <rect x={47} y={6} width={7} height={14} fill={C.brass} />
    {/* leaning book */}
    <path d="M 60 18 L 80 8 L 84 14 L 64 24 Z" fill={C.linen} />
    {/* candle */}
    <rect x={120} y={4} width={16} height={16} fill={C.linen} />
    <rect x={120} y={4} width={16} height={3} fill={C.woodDarkShade} opacity={0.4} />
    <path d="M 128 0 L 128 4" stroke={C.charcoal} strokeWidth={1.4} />
    {/* small plant pot */}
    <rect x={180} y={8} width={20} height={12} fill={C.terracottaDeep} />
    <path d="M 184 8 Q 188 -2 190 4" stroke={C.jungle} strokeWidth={2} fill="none" />
    <path d="M 196 8 Q 200 -2 198 4" stroke={C.jungleDeep} strokeWidth={2} fill="none" />
  </g>
);
const ExtraShelfThumb = (
  <Thumb>
    <rect x={8} y={32} width={44} height={4} fill={C.woodDark} />
    <rect x={14} y={20} width={4} height={12} fill={C.terracotta} />
    <rect x={20} y={22} width={4} height={10} fill={C.jungle} />
    <rect x={26} y={20} width={4} height={12} fill={C.charcoalSoft} />
    <rect x={38} y={24} width={8} height={8} fill={C.linen} />
    <line x1={42} y1={20} x2={42} y2={24} stroke={C.charcoal} strokeWidth={1} />
  </Thumb>
);

/* =========================================================
   CATALOG
   ========================================================= */

export const CATALOG: Item[] = [
  // Desks
  {
    id: "desk-pandanus",
    category: "desk",
    name: "Pandanus desk",
    blurb: "Light ash top, slim hairpin legs.",
    pricePerDay: 6,
    scene: DeskPandanus,
    thumb: DeskPandanusThumb,
  },
  {
    id: "desk-batu",
    category: "desk",
    name: "Batu workbench",
    blurb: "Solid teak slab on chunky block legs.",
    pricePerDay: 9,
    scene: DeskBatu,
    thumb: DeskBatuThumb,
  },
  {
    id: "desk-rotan",
    category: "desk",
    name: "Rotan writing table",
    blurb: "Cream top with woven rattan front.",
    pricePerDay: 8,
    scene: DeskRotan,
    thumb: DeskRotanThumb,
  },
  // Chairs
  {
    id: "chair-uluwatu",
    category: "chair",
    name: "Uluwatu task chair",
    blurb: "Ergonomic mesh back, 8-hour comfort.",
    pricePerDay: 5,
    scene: ChairUluwatu,
    thumb: ChairUluwatuThumb,
  },
  {
    id: "chair-bambu",
    category: "chair",
    name: "Bambu lounge",
    blurb: "Bamboo frame with linen cushion.",
    pricePerDay: 6,
    scene: ChairBambu,
    thumb: ChairBambuThumb,
  },
  {
    id: "chair-anyam",
    category: "chair",
    name: "Anyam woven",
    blurb: "Rattan dome back, terracotta cushion.",
    pricePerDay: 7,
    scene: ChairAnyam,
    thumb: ChairAnyamThumb,
  },
  // Monitors
  {
    id: "monitor-ultrawide",
    category: "monitor",
    name: "34″ ultrawide",
    blurb: "Curved 34″ panel for serious focus.",
    pricePerDay: 4,
    scene: MonitorUltrawide,
    thumb: MonitorUltrawideThumb,
  },
  {
    id: "monitor-studio",
    category: "monitor",
    name: "27″ studio",
    blurb: "Single 27″ on a walnut riser.",
    pricePerDay: 3,
    scene: MonitorStudio,
    thumb: MonitorStudioThumb,
  },
  // Lighting
  {
    id: "lamp-bukit",
    category: "lighting",
    name: "Bukit arc lamp",
    blurb: "Tall arc floor lamp with brass dome.",
    pricePerDay: 3,
    scene: LampBukit,
    thumb: LampBukitThumb,
  },
  {
    id: "lamp-warung",
    category: "lighting",
    name: "Warung desk lamp",
    blurb: "Ceramic base, warm linen shade.",
    pricePerDay: 2,
    scene: LampWarung,
    thumb: LampWarungThumb,
  },
  // Plants
  {
    id: "plant-monstera",
    category: "plant",
    name: "Monstera",
    blurb: "Split leaves in a terracotta pot.",
    pricePerDay: 2,
    scene: PlantMonstera,
    thumb: PlantMonsteraThumb,
  },
  {
    id: "plant-palm",
    category: "plant",
    name: "Areca palm",
    blurb: "Tall feathery fronds in a woven basket.",
    pricePerDay: 3,
    scene: PlantPalm,
    thumb: PlantPalmThumb,
  },
  {
    id: "plant-snake",
    category: "plant",
    name: "Snake plant",
    blurb: "Sculptural and forgiving.",
    pricePerDay: 2,
    scene: PlantSnake,
    thumb: PlantSnakeThumb,
  },
  // Extras
  {
    id: "extra-rug",
    category: "extra",
    name: "Block-printed rug",
    blurb: "Hand-blocked cotton in terracotta.",
    pricePerDay: 2,
    scene: ExtraRug,
    thumb: ExtraRugThumb,
  },
  {
    id: "extra-shelf",
    category: "extra",
    name: "Floating shelf",
    blurb: "Walnut shelf styled with books and a candle.",
    pricePerDay: 2,
    scene: ExtraShelf,
    thumb: ExtraShelfThumb,
  },
];

export const CATALOG_BY_ID: Record<string, Item> = Object.fromEntries(
  CATALOG.map((i) => [i.id, i]),
);
