import DocsData from "../dataUpdates/getSheetData";
import Table from "../components/displayTable/displayTable";
import updateRows from "../dataUpdates/updateRows";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const names = ["Gareth", "Hayley", "Alex", "Lauren"];

const getAvailableShifts = async () => {
  const data = await DocsData();
  return data.filter((row) => row.confirmed !== "Y");
};

export default async function Home() {
  const availableShifts = await getAvailableShifts();

  async function updateRowsAction(data: FormData) {
    "use server";
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/getAll
    await updateRows(data.getAll("selectedRow"), data.get("carername"));
    revalidatePath(`/${data.get("carername")}`);
    redirect(`/${data.get("carername")}`);
  }

  if (!cookies().has("loggedin")) {
    redirect(`/login`);
  }

  const loggedInCookie: { name: string; username: string } = JSON.parse(
    cookies().get("loggedin")?.value || "{}"
  );

  return (
    <main className="min-h-screen p-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Available Shifts
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-1">
        Logged in as {loggedInCookie.name}.{" "}
        <Link
          className={
            "font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
          }
          href={`/${loggedInCookie.name}`}
        >
          See your shifts
        </Link>
      </p>
      <form action={updateRowsAction}>
        <Table data={availableShifts} canEdit={true} />
        <input type="hidden" name="carername" value={loggedInCookie.name} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1"
          type="submit"
        >
          Save Shifts
        </button>
      </form>
    </main>
  );
}
