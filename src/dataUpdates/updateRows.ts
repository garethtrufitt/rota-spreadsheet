import { GetRows } from "./getSheetData";

export default async function UpdateRows(
  rowIds: FormDataEntryValue[],
  carerName: FormDataEntryValue | null
): Promise<void> {
  const rows = await GetRows();
  const name = carerName?.toString();

  rowIds.map(async (rowId: FormDataEntryValue) => {
    const rowIndex = parseInt(rowId.toString()) - 2;
    rows[rowIndex].Confirmed = "Y"; // update a value
    rows[rowIndex].Name = name || "";
    await rows[rowIndex].save(); // save updates

    // rows[1].email = "sergey@abc.xyz"; // update a value
    console.log("Updated row " + rowIndex);
    return;
  });
}
