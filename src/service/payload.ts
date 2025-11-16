export const payload = {
  id: "jaimuu6k4widy24s",
  ver: "1.62",
  lang: "eng",
  auth: {
    type: "AID",
    aid: "wiz4kwmtkebq8tx-web",
  },
  client: {
    id: "DK",
    type: "WEB",
    name: "webapp",
    l: "vs_webapp",
    v: 10007,
  },
  formatted: true,
  ext: "DK.11",
  svcReqL: [
    {
      req: {
        jnyFltrL: [
          {
            type: "PROD",
            mode: "INC",
            value: 4095,
          },
        ],
        stbLoc: {
          name: "Lyngby St.",
          lid: "A=1@O=Lyngby St.@X=12503105@Y=55768088@U=86@L=8600675@p=1763118256@",
          extId: "8600675",
          eteId: "sq|S|Lyngby St.|8600675|12503105|55768088",
        },
        type: "DEP",
        sort: "PT",
        maxJny: 40,
      },
      meth: "StationBoard",
      id: "1|2|",
    },
  ],
} as const;
