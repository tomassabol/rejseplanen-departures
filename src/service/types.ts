export type ResponseType = {
  graph: Graph;
  subGraph: SubGraph;
  svcResL: SvcResL[];
  view: View;
  err: string;
  ext: string;
  id: string;
  lang: string;
  ver: string;
};

export type Graph = {
  id: string;
  index: number;
};

export type SubGraph = {
  id: string;
  index: number;
};

export type SvcResL = {
  meth: string;
  res: Res;
  err: string;
  id: string;
};

export type Res = {
  common: Common;
  jnyL: JnyL[];
  locRefL: number[];
  fpB: string;
  fpE: string;
  planrtTS: string;
  sD: string;
  sT: string;
  type: string;
};

export type Common = {
  himL: HimL[];
  himMsgCatL: HimMsgCatL[];
  icoL: IcoL[];
  lDrawStyleL: LDrawStyleL[];
  locL: LocL[];
  opL: OpL[];
  prodL: ProdL[];
  remL: RemL[];
  reqLocL: ReqLocL[];
  rtSrcL: RtSrcL[];
  timeStyleL: TimeStyleL[];
};

export type HimL = {
  catRefL: number[];
  pubChL: PubChL[];
  act: boolean;
  comp: string;
  eDate: string;
  eTime: string;
  fLocX: number;
  head: string;
  hid: string;
  icoX: number;
  prio: number;
  prod: number;
  sDate: string;
  sTime: string;
  src: number;
  tLocX: number;
  text: string;
};

export type PubChL = {
  name: string;
};

export type HimMsgCatL = {
  id: number;
};

export type IcoL = {
  bg?: Bg;
  fg?: Fg;
  res: string;
  txt?: string;
};

export type Bg = {
  b: number;
  g: number;
  r: number;
};

export type Fg = {
  b: number;
  g: number;
  r: number;
};

export type LDrawStyleL = {
  bg: Bg2;
  sIcoX?: number;
  type: string;
};

export type Bg2 = {
  b: number;
  g: number;
  r: number;
};

export type LocL = {
  crd: Crd;
  pRefL?: number[];
  chgTime: string;
  extId: string;
  icoX: number;
  lid: string;
  mMastLocX?: number;
  name: string;
  pCls: number;
  state: string;
  type: string;
  isMainMast?: boolean;
};

export type Crd = {
  x: number;
  y: number;
};

export type OpL = {
  icoX: number;
  name: string;
};

export type ProdL = {
  prodCtx: ProdCtx;
  cls: number;
  icoX: number;
  name: string;
  nameS: string;
  number?: string;
  oprX?: number;
  pid?: string;
  himIdL?: string[];
};

export type ProdCtx = {
  catCode: string;
  catIn: string;
  catOut: string;
  catOutL: string;
  catOutS: string;
  line: string;
  lineId: string;
  name: string;
  admin?: string;
  matchId?: string;
  num?: string;
};

export type RemL = {
  code: string;
  icoX: number;
  prio?: number;
  txtN: string;
  type: string;
};

export type ReqLocL = {
  loc: Loc;
  eteId: string;
  state: string;
};

export type Loc = {
  crd: Crd2;
  pRefL: number[];
  chgTime: string;
  extId: string;
  icoX: number;
  isMainMast: boolean;
  lid: string;
  name: string;
  pCls: number;
  state: string;
  type: string;
};

export type Crd2 = {
  x: number;
  y: number;
};

export type RtSrcL = {
  freeTextIdCount: number;
  name: string;
  type: string;
};

export type TimeStyleL = {
  mode: string;
  fg?: Fg2;
  icoX?: number;
};

export type Fg2 = {
  b: number;
  g: number;
  r: number;
};

export type JnyL = {
  pos?: Pos;
  prodL: ProdL2[];
  stbStop: StbStop;
  date: string;
  dirFlg: string;
  dirTxt: string;
  isRchbl: boolean;
  jid: string;
  prodX: number;
  resLDrawStyleX: number;
  status: string;
  subscr: string;
  sumLDrawStyleX: number;
  trainStartDate: string;
  msgL?: MsgL[];
  isPartCncl?: boolean;
};

export type Pos = {
  x: number;
  y: number;
};

export type ProdL2 = {
  fIdx: number;
  fLocX: number;
  prodX: number;
  tIdx: number;
  tLocX: number;
};

export type StbStop = {
  dTimeFC: DTimeFc;
  dTimeFR?: DTimeFr;
  dTimeFS: DTimeFs;
  dProdX: number;
  dProgType?: string;
  dTimeR?: string;
  dTimeS: string;
  idx: number;
  locX: number;
  type: string;
  dPltfR?: DPltfR;
};

export type DTimeFc = {
  styleX: number;
};

export type DTimeFr = {
  styleX: number;
  txtA: string;
};

export type DTimeFs = {
  styleX: number;
  txtA?: string;
};

export type DPltfR = {
  txt: string;
  type: string;
};

export type MsgL = {
  tagL: string[];
  fLocX?: number;
  himX?: number;
  sort: number;
  sty: string;
  tLocX?: number;
  type: string;
  remX?: number;
  persist?: boolean;
};

export type View = {
  id: string;
  index: number;
  type: string;
};

export type Departure = {
  line: "A" | "B" | "Bx" | "C" | "E" | "H";
  destination: string;
  departureTime: string;
  platform: string;
  status: string;
};
