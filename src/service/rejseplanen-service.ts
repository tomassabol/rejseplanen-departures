import axios from "axios";
import type { Departure, ResponseType } from "./types";

const payload = {
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
};

export const getDepartures = async () => {
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  const response = await axios.post<ResponseType>(
    `https://rkrp.hafas.cloud/gate?rnd=${currentUnixTimestamp}`,
    payload
  );

  const currentDepartures: Departure[] = [];
  const res = response.data.svcResL[0]?.res;
  if (res && res.jnyL) {
    const { jnyL, common } = res;

    for (const journey of jnyL) {
      const { stbStop, dirTxt, prodX } = journey;

      // Get line information from prodL using prodX index
      const product = common.prodL[prodX];

      // Filter to only S-trains (S-tog)
      if (!product?.prodCtx?.catOut?.includes("S-Tog")) {
        continue;
      }

      const line = product?.nameS || product?.name || "Unknown";

      // Get departure time (prefer real-time, fallback to scheduled)
      const departureTime = stbStop.dTimeR || stbStop.dTimeS || "";

      // Format time as HH:MM
      const formattedTime = departureTime
        ? `${departureTime.slice(0, 2)}:${departureTime.slice(2, 4)}`
        : "";

      // Get platform if available
      const platform = stbStop.dPltfR?.txt || "";

      // Get status (delay info, cancellations, etc.)
      let status = "";
      if (stbStop.dTimeFR?.txtA) {
        status = stbStop.dTimeFR.txtA;
      } else if (stbStop.dTimeFS?.txtA) {
        status = stbStop.dTimeFS.txtA;
      } else if (journey.isPartCncl) {
        status = "Partially cancelled";
      } else if (stbStop.dProgType === "PROGNOSED") {
        status = "On time";
      } else {
        status = "Scheduled";
      }

      currentDepartures.push({
        line: line as Departure["line"],
        destination: dirTxt || "Unknown",
        departureTime: formattedTime,
        platform,
        status,
      });
    }
  }

  return currentDepartures;
};
