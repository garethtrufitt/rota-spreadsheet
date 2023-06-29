import Image from "next/image";
import DocsData from "../../dataUpdates/getSheetData";
import Table from "../../components/displayTable/displayTable";
import { useRouter } from "next/router";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import moment from "moment";
import formatMoneyAsNumbers from "../utils/formatMoneyAsNumber";

export default async function Name({ params }: { params: { name: string } }) {
  const loggedInCookie: { name: string; username: string } = JSON.parse(
    cookies().get("loggedin")?.value || "{}"
  );

  if (loggedInCookie.name?.toLowerCase() !== params.name.toLowerCase()) {
    redirect(`/`);
  }

  const data = await DocsData();

  const carerShifts = data.filter(
    (row) => row.name?.toLowerCase() === params.name.toLowerCase()
  );

  const shiftsBeforeTodaySinceLastPayDay = carerShifts.filter((row) => {
    const monthPrev = moment().subtract(1, "month");
    const paydayStart = monthPrev.set("date", 28);
    const paydayEnd = moment().set("date", 28);

    return moment(row.date, "D/MM/yyyy").isBetween(paydayStart, paydayEnd);
  });

  const shiftsAfterToday = carerShifts.filter((row) =>
    moment(row.date, "D/MM/yyyy").isAfter(moment())
  );

  const totalHours = shiftsBeforeTodaySinceLastPayDay.reduce(
    (prev, curr) => prev + curr.hours,
    0
  );

  const totalPay = shiftsBeforeTodaySinceLastPayDay.reduce(
    (prev, curr) =>
      prev + curr.hours * formatMoneyAsNumbers(curr.enhancedRate || "£15.00"),
    0
  );

  return (
    <main className="min-h-screen p-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Shifts - {params.name}
      </h1>
      <Link
        className={
          "font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
        }
        href={`/`}
      >
        See available shifts
      </Link>
      <h2 className="mb-4 mt-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Upcoming Shifts
      </h2>
      <Table data={shiftsAfterToday} canEdit={false} />
      <h2 className="mb-4 mt-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Shifts since last pay day
      </h2>
      <Table data={shiftsBeforeTodaySinceLastPayDay} canEdit={false} />
      <h2 className="mb-4 mt-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Invoice Details
      </h2>
      <p className={"mt-4 "}>Total Hours: {totalHours}</p>
      <p className={"mt-4 "}>Total Pay: £{totalPay.toFixed(2)}</p>
    </main>
  );
}
