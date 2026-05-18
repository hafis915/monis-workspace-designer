/*
 * Real catalog: products from monis.rent.
 * Showroom layout uses a 1200x750 logical canvas matching the sketch viewBox.
 */

export type RealCategory =
  | "desk"
  | "chair"
  | "monitor"
  | "accessory"
  | "lighting"
  | "coffee"
  | "computer"
  | "gaming"
  | "fitness";

export type RealCategoryMeta = {
  id: RealCategory;
  label: string;
  required: boolean;
  max: number;
};

export const REAL_CATEGORIES: RealCategoryMeta[] = [
  { id: "desk",      label: "Desk",        required: true,  max: 1 },
  { id: "chair",     label: "Chair",       required: true,  max: 1 },
  { id: "monitor",   label: "Monitors",    required: false, max: 3 },
  { id: "accessory", label: "Accessories", required: false, max: 5 },
  { id: "lighting",  label: "Lighting",    required: false, max: 1 },
  { id: "coffee",    label: "Coffee",      required: false, max: 1 },
  { id: "computer",  label: "Computer",    required: false, max: 1 },
  { id: "gaming",    label: "Gaming",      required: false, max: 1 },
  { id: "fitness",   label: "Fitness",     required: false, max: 1 },
];

export const REAL_CATEGORY_BY_ID: Record<RealCategory, RealCategoryMeta> = Object.fromEntries(
  REAL_CATEGORIES.map((c) => [c.id, c]),
) as Record<RealCategory, RealCategoryMeta>;

export type Rect = { x: number; y: number; w: number; h: number };

export type RealItem = {
  id: string;
  category: RealCategory;
  name: string;
  blurb: string;
  pricePerDay: number;
  imageUrl: string;
  position: (index: number) => Rect;
};

export type RealSelection = Partial<Record<RealCategory, string[]>>;

const IMG = "https://strapi.monis.rent/uploads";

// Multi-monitor anchors (index 0=center, 1=right, 2=left)
const monitorPos = (index: number): Rect => {
  const anchors: Rect[] = [
    { x: 520, y: 250, w: 220, h: 170 }, // center
    { x: 720, y: 268, w: 180, h: 140 }, // right
    { x: 360, y: 268, w: 180, h: 140 }, // left
  ];
  return anchors[index] ?? anchors[0];
};

export const REAL_CATALOG: RealItem[] = [
  // Desk
  {
    id: "desk-electric",
    category: "desk",
    name: "Adjustable desk",
    blurb: "Sit/stand electric adjustable desk.",
    pricePerDay: 7,
    imageUrl: `${IMG}/desk_titel_new_3db151d44c.jpg`,
    position: () => ({ x: 300, y: 400, w: 560, h: 200 }),
  },

  // Chair
  {
    id: "chair-ergo",
    category: "chair",
    name: "Ergonomic chair",
    blurb: "Mesh back, lumbar support, adjustable arms.",
    pricePerDay: 5,
    imageUrl: `${IMG}/fantech_oca259s_chair_6_b632a0c529.jpg`,
    position: () => ({ x: 560, y: 320, w: 220, h: 300 }),
  },

  // Monitors
  {
    id: "mon-24fhd",
    category: "monitor",
    name: '24" Full HD A24i',
    blurb: "Crisp 24-inch IPS panel for the everyday workspace.",
    pricePerDay: 3,
    imageUrl: `${IMG}/24_full_HD_office_monitor_a24i_2026_be9e6bf958.jpg`,
    position: monitorPos,
  },
  {
    id: "mon-27-4k",
    category: "monitor",
    name: '27" 4K A27U',
    blurb: "Pin-sharp 27-inch 4K display for multitasking.",
    pricePerDay: 5,
    imageUrl: `${IMG}/27_4_K_A27_U_Multitasking_Monitor_1_ce29d15357.jpg`,
    position: monitorPos,
  },
  {
    id: "mon-34-4k",
    category: "monitor",
    name: '34" 4K curved',
    blurb: "180 Hz ultrawide curved gaming-grade display.",
    pricePerDay: 7,
    imageUrl: `${IMG}/34_4_K_Gaming_Monitor_7_3f6b2ba627.jpg`,
    position: monitorPos,
  },
  {
    id: "mon-apple-studio",
    category: "monitor",
    name: "Apple Studio Display",
    blurb: "27-inch 5K Retina, anti-reflective glass.",
    pricePerDay: 9,
    imageUrl: `${IMG}/Apple_Studio_Display_6_94c6329a05.jpg`,
    position: monitorPos,
  },

  // Accessories
  {
    id: "acc-mxkeys",
    category: "accessory",
    name: "Logitech MX Keys",
    blurb: "Low-profile mechanical-feel keyboard.",
    pricePerDay: 2,
    imageUrl: `${IMG}/Logitech_MX_keys_1_9977480ae1.jpg`,
    position: () => ({ x: 520, y: 430, w: 200, h: 50 }),
  },
  {
    id: "acc-mxmaster",
    category: "accessory",
    name: "MX Master 3S",
    blurb: "Whisper-quiet ergonomic mouse.",
    pricePerDay: 2,
    imageUrl: `${IMG}/Logitech_S3_6_4cf1e523b8.jpg`,
    position: () => ({ x: 740, y: 430, w: 80, h: 50 }),
  },
  {
    id: "acc-hub",
    category: "accessory",
    name: "6-in-1 USB-C hub",
    blurb: "HDMI, USB-A x3, SD, ethernet.",
    pricePerDay: 1,
    imageUrl: `${IMG}/mac_dongle_product_photo_0316bc4b50.jpg`,
    position: () => ({ x: 420, y: 430, w: 90, h: 50 }),
  },
  {
    id: "acc-stand",
    category: "accessory",
    name: "Monitor stand",
    blurb: "Walnut riser for laptop or monitor.",
    pricePerDay: 1,
    imageUrl: `${IMG}/Adjustable_Monitor_Stand_4_e6ae3a1d06.jpg`,
    position: () => ({ x: 380, y: 380, w: 150, h: 50 }),
  },
  {
    id: "acc-strip",
    category: "accessory",
    name: "Smart power strip",
    blurb: "Wi-Fi controlled 3-socket strip with USB.",
    pricePerDay: 1,
    imageUrl: `${IMG}/Xiaomi_MI_Smart_Power_Strip_Plug_black_3965e07e42.jpg`,
    position: () => ({ x: 270, y: 470, w: 120, h: 60 }),
  },

  // Lighting
  {
    id: "lamp-mi",
    category: "lighting",
    name: "Mi LED Desk Lamp 1S",
    blurb: "Tuneable white, smart-home controllable.",
    pricePerDay: 2,
    imageUrl: `${IMG}/Xiaomi_Mi_Led_Desk_Lamp_1_S_10_3777ddd163.jpg`,
    position: () => ({ x: 110, y: 280, w: 180, h: 280 }),
  },

  // Coffee
  {
    id: "coffee-nespresso",
    category: "coffee",
    name: "Nespresso Essenza Mini",
    blurb: "Compact espresso machine.",
    pricePerDay: 3,
    imageUrl: `${IMG}/NESPRESSO_Essenza_Mini_2_4ea4cc0abc.jpg`,
    position: () => ({ x: 30, y: 440, w: 140, h: 180 }),
  },

  // Computer
  {
    id: "pc-macbook",
    category: "computer",
    name: "MacBook (Neo)",
    blurb: "Apple Silicon, 16 GB RAM.",
    pricePerDay: 10,
    imageUrl: `${IMG}/Mac_Book_Neo_Silver_6_ceb2d1d671.jpg`,
    position: () => ({ x: 460, y: 360, w: 220, h: 70 }),
  },
  {
    id: "pc-mini",
    category: "computer",
    name: "Mac Mini M4",
    blurb: "Tiny powerhouse, perfect with an external monitor.",
    pricePerDay: 5,
    imageUrl: `${IMG}/Mac_mini_M4_front_b152d10743.jpg`,
    position: () => ({ x: 460, y: 380, w: 120, h: 60 }),
  },
  {
    id: "pc-studio",
    category: "computer",
    name: "Mac Studio",
    blurb: "Pro performance for video and rendering.",
    pricePerDay: 12,
    imageUrl: `${IMG}/Mac_Studio_M1_6_7488521ebb.jpg`,
    position: () => ({ x: 460, y: 370, w: 130, h: 80 }),
  },

  // Gaming
  {
    id: "game-ps5",
    category: "gaming",
    name: "PlayStation 5",
    blurb: "Sony PS5 with controller.",
    pricePerDay: 4,
    imageUrl: `${IMG}/Monis_PS_5_Titel_Photo_e3d9eb0af1.jpg`,
    position: () => ({ x: 940, y: 380, w: 160, h: 210 }),
  },
  {
    id: "game-switch",
    category: "gaming",
    name: "Nintendo Switch 2",
    blurb: "Handheld + dock, 2 Joy-Cons included.",
    pricePerDay: 3,
    imageUrl: `${IMG}/Nintendo_Switch_2_3_207ed0a9cd.jpg`,
    position: () => ({ x: 950, y: 430, w: 160, h: 110 }),
  },
  {
    id: "game-tv",
    category: "gaming",
    name: '43" Smart TV 4K',
    blurb: "Wall-mountable 43-inch 4K smart TV.",
    pricePerDay: 4,
    imageUrl: `${IMG}/Smart_TV_4_K_43_1_8c5b8dbc8b.jpg`,
    position: () => ({ x: 880, y: 200, w: 300, h: 200 }),
  },

  // Fitness
  {
    id: "fit-walkpad",
    category: "fitness",
    name: "Foldable walking pad",
    blurb: "Slim treadmill, slides under the desk.",
    pricePerDay: 4,
    imageUrl: `${IMG}/Walking_pad_new_05f1ab2d48.jpg`,
    position: () => ({ x: 820, y: 580, w: 320, h: 80 }),
  },
  {
    id: "fit-bike",
    category: "fitness",
    name: "Spinning bike",
    blurb: "Indoor cycle, magnetic resistance.",
    pricePerDay: 5,
    imageUrl: `${IMG}/Home_Spinning_Bike_4_45de07b098.jpg`,
    position: () => ({ x: 900, y: 360, w: 200, h: 260 }),
  },
  {
    id: "fit-massage",
    category: "fitness",
    name: "Massage gun",
    blurb: "Recovery percussive massage device.",
    pricePerDay: 2,
    imageUrl: `${IMG}/Massage_Gun_2_a8d7d7bda8.jpg`,
    position: () => ({ x: 940, y: 510, w: 130, h: 90 }),
  },
];

export const REAL_CATALOG_BY_ID: Record<string, RealItem> = Object.fromEntries(
  REAL_CATALOG.map((i) => [i.id, i]),
);
