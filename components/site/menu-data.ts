export interface LinkItemProps {
  title: string
  href: string
}

export const FARM_DATA_MENU: LinkItemProps[] = [
  {
    title: "3Dハウス",
    href: "/dashboard/3d-house",
  },
  {
    title: "農場一覧",
    href: "/dashboard/farm-list",
  },
  // {
  //   title: "デバイス一覧-センサ",
  //   href: "/dashboard/device-list-sensor",
  // },
  {
    title: "デバイス一覧-バルブ",
    href: "/dashboard/device-list-valve",
  },
  {
    title: "デバイス一覧-リレー",
    href: "/dashboard/device-list-relay",
  },
  {
    title: "アラート一覧",
    href: "/dashboard/alert-list",
  },
  {
    title: "天候と予報",
    href: "/dashboard/weather-forecast",
  },
  {
    title: "グラフ",
    href: "/dashboard/graph",
  },
  {
    title: "CSV出力",
    href: "/dashboard/csv-download",
  },
]

export interface MenuGroupProps {
  title: string
  menus: LinkItemProps[]
}

export const FARM_DATA_MENU_GROUP = {
  title: "農場データ",
  menus: FARM_DATA_MENU,
}

export const SETTING_MENU: MenuGroupProps[] = [
  {
    title: "農場設定",
    menus: [
      { title: "ハウス設定", href: "/dashboard/house-setting" },
      { title: "エリア設定", href: "/dashboard/area-setting" },
      { title: "しきい値設定", href: "/dashboard/threshold-value" },
    ],
  },
  {
    title: "制御装置設定",
    menus: [
      { title: "バルブ・リレー設定", href: "/dashboard/valve-relay-setting" },
    ],
  },
]

export const BASIC_PLAN_MENU: MenuGroupProps[] = [
  {
    title: "バルブ",
    menus: [
      { title: "CO₂供給バルブ", href: "/dashboard/co2-valve" },
      { title: "Air供給バルブ", href: "/dashboard/air-valve" },
      { title: "pH調整剤バルブ", href: "/dashboard/ph-valve" },
      { title: "EC調整剤バルブ", href: "/dashboard/ec-valve" },
    ],
  },
  {
    title: "LED",
    menus: [
      { title: "第1系統", href: "/dashboard/led-1st-sys" },
      { title: "第2系統", href: "/dashboard/led-2nd-sys" },
      { title: "第3系統", href: "/dashboard/led-3rd-sys" },
      { title: "第4系統", href: "/dashboard/led-4th-sys" },
    ],
  },
  {
    title: "窓",
    menus: [
      { title: "第1系統", href: "/dashboard/window-1st-sys" },
      { title: "第2系統", href: "/dashboard/window-2nd-sys" },
      { title: "第3系統", href: "/dashboard/window-3rd-sys" },
      { title: "第4系統", href: "/dashboard/window-4th-sys" },
      { title: "第5系統", href: "/dashboard/window-5th-sys" },
      { title: "第6系統", href: "/dashboard/window-6th-sys" },
    ],
  },
  {
    title: "カーテン",
    menus: [
      { title: "第1系統", href: "/dashboard/curtain-1st-sys" },
      { title: "第2系統", href: "/dashboard/curtain-2nd-sys" },
      { title: "第3系統", href: "/dashboard/curtain-3rd-sys" },
      { title: "第4系統", href: "/dashboard/curtain-4th-sys" },
      { title: "第5系統", href: "/dashboard/curtain-5th-sys" },
      { title: "第6系統", href: "/dashboard/curtain-6th-sys" },
      { title: "第7系統", href: "/dashboard/curtain-7th-sys" },
      { title: "第8系統", href: "/dashboard/curtain-8th-sys" },
    ],
  },
  {
    title: "汎用",
    menus: [
      { title: "汎用1(CFAN)", href: "/dashboard/general-1st" },
      { title: "汎用2(PFAN)", href: "/dashboard/general-2nd" },
      { title: "汎用3(動噴機)", href: "/dashboard/general-3rd" },
      { title: "汎用4", href: "/dashboard/general-4th" },
    ],
  },
  {
    title: "空調",
    menus: [{ title: "空調設定", href: "/dashboard/aircon" }],
  },
  {
    title: "潅水システム",
    menus: [{ title: "潅水システム設定", href: "/dashboard/irrigation-sys" }],
  },
]
