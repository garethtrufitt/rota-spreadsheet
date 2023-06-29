import Image from "next/image";
import DocsData from "../../dataUpdates/getSheetData";
import Table from "../../components/displayTable/displayTable";
import { useRouter } from "next/router";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import moment from "moment";

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

  const shiftsBeforeToday = carerShifts.filter((row) =>
    moment(row.date, "D/MM/yyyy").isBefore(moment())
  );

  const shiftsAfterToday = carerShifts.filter((row) =>
    moment(row.date, "D/MM/yyyy").isAfter(moment())
  );

  const totalHours = shiftsBeforeToday.reduce(
    (prev, curr) => prev + curr.hours,
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
        Past Shifts
      </h2>
      <Table data={shiftsBeforeToday} canEdit={false} />
      <p className={"mt-4 "}>Total Hours: {totalHours}</p>
    </main>
  );
}
