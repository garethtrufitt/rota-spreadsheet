import Image from "next/image";
import DocsData from "../../dataUpdates/getSheetData";
import Table from "../../components/displayTable/displayTable";
import { useRouter } from "next/router";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Name({ params }: { params: { name: string } }) {
  const loggedInCookie: { name: string; username: string } = JSON.parse(
    cookies().get("loggedin")?.value || "{}"
  );

  if (loggedInCookie.name?.toLowerCase() !== params.name.toLowerCase()) {
    redirect(`/`);
  }

  const data = await DocsData();

  const availableShifts = data.filter(
    (row) => row.name?.toLowerCase() === params.name.toLowerCase()
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
      <Table data={availableShifts} canEdit={false} />
    </main>
  );
}
