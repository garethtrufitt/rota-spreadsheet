import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import moment from "moment";

export type DocsDataType = {
  date: string;
  shiftStart: string;
  shiftEnd: string;
  hours: number;
  enhancedRate: string;
  name: string;
  confirmed: string;
  rowNum: number;
}[];

export async function GetRows(): Promise<GoogleSpreadsheetRow[]> {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    "1x35VvwNmJuqfpVxSzoIdLThe3ZeUKTInMVCZ_lnaEYE"
  );

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    // env var values are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
    private_key: atob(process.env.GOOGLE_PRIVATE_KEY as string) as string,
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];

  // read rows
  return await sheet.getRows(); // can pass in { limit, offset }
}

export default async function DocsData(): Promise<DocsDataType> {
  const rows = await GetRows();

  return rows.map((row) => {
    const shiftStart = moment(
      row.Date + " " + row["Shift Start"],
      "DD/MM/YYYY HH:mm"
    );
    const shiftEnd = moment(
      row.Date + " " + row["Shift End"],
      "DD/MM/YYYY HH:mm"
    );

    const duration = moment.duration(shiftEnd.diff(shiftStart));
    const hours = duration.asHours();
    return {
      date: row.Date as string,
      shiftStart: row["Shift Start"] as string,
      shiftEnd: row["Shift End"] as string,
      hours,
      enhancedRate: row["Enhanced Rate"] as string,
      name: row.Name as string,
      confirmed: row.Confirmed as string,
      rowNum: row.rowIndex as number,
    };
  });
}
