import { useQuery } from "@tanstack/react-query";
import { getDepartures } from "./service/rejseplanen-service";
import type { Departure } from "./service/types";

export function App() {
  const { data } = useQuery({
    queryKey: ["departures"],
    queryFn: () => getDepartures(),
    refetchInterval: 1000 * 30, // 30 seconds
  });

  return (
    <div className="border border-4 rounded-lg border-slate-400 overflow-hidden w-full h-full">
      {/* Table-like header for columns */}
      <div className="grid grid-cols-[1fr_1fr_2fr_1fr] bg-slate-200 px-6 py-2 font-semibold text-slate-700 text-lg border-b border-slate-300">
        <div>Afgang</div>
        <div>Linje</div>
        <div>Destination</div>
        <div>Status</div>
      </div>
      <div className="flex flex-col divide-y">
        {data?.map((departure) => (
          <DepartureRow
            key={
              departure.line +
              departure.destination +
              departure.departureTime +
              departure.platform +
              departure.status
            }
            departure={departure}
          />
        ))}
      </div>
    </div>
  );
}

const DepartureRow = ({ departure }: { departure: Departure }) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr_1fr] items-center px-6 py-2">
      <DepartureInMinutes
        departureTime={departure.departureTime}
        status={departure.status}
      />
      <Line line={departure.line} />
      <div className="text-lg font-bold">{departure.destination}</div>
      <Status status={departure.status} />
    </div>
  );
};

const Line = ({ line }: { line: Departure["line"] }) => {
  let colorClass = "bg-gray-400";
  switch (line) {
    case "A":
      colorClass = "bg-blue-500";
      break;
    case "B":
      colorClass = "bg-green-600";
      break;
    case "Bx":
      colorClass = "bg-green-300";
      break;
    case "C":
      colorClass = "bg-orange-400";
      break;
    case "E":
      colorClass = "bg-purple-600";
      break;
    case "H":
      colorClass = "bg-red-500";
      break;
    default:
      colorClass = "bg-gray-400";
      break;
  }
  return (
    <div
      className={`${colorClass} rounded-sm w-10 h-10 flex items-center justify-center text-white font-bold text-lg`}
    >
      {line}
    </div>
  );
};

const DepartureInMinutes = ({
  departureTime,
  status,
}: {
  departureTime: string;
  status: string;
}) => {
  if (status && status.toLowerCase().includes("cancelled")) {
    return <div className="text-sm font-bold text-red-600">Cancelled</div>;
  }

  let lateMinutes = 0;
  const lateMatch = status.match(
    /(\d+)\s*(min(\.|utter)?)[^\d]*late|forsinket/i
  );
  if (lateMatch) {
    lateMinutes =
      parseInt(lateMatch[1]) ||
      (status.match(/(\d+)/)?.[1] ? parseInt(status.match(/(\d+)/)![1]) : 0);
  }

  const now = new Date();
  // departure time is in format HH:MM
  const [hours, minutes] = departureTime.split(":");
  const departure = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(hours),
    parseInt(minutes)
  );
  let minutesUntilDeparture = Math.floor(
    (departure.getTime() - now.getTime()) / 1000 / 60
  );

  if (!isNaN(lateMinutes) && lateMinutes > 0) {
    minutesUntilDeparture += lateMinutes;
  }

  return <div className="text-sm font-bold">{minutesUntilDeparture} min</div>;
};

const Status = ({ status }: { status: string }) => {
  if (status && status.toLowerCase().includes("cancelled")) {
    return <div className="text-sm font-bold text-red-600/80">{status}</div>;
  }

  if (status && status.toLowerCase().includes("on time")) {
    return <div className="text-sm font-bold text-green-600/80">{status}</div>;
  }

  if (status && status.toLowerCase().includes("scheduled")) {
    return <div className="text-sm font-bold text-gray-500/80">{status}</div>;
  }

  if (status && status.toLowerCase().includes("late")) {
    return <div className="text-sm font-bold text-orange-600/80">{status}</div>;
  }

  return <div className="text-sm text-gray-500/80">{status}</div>;
};
