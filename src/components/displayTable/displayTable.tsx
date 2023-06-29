import moment from "moment";
import { DocsDataType } from "../../dataUpdates/getSheetData";
import EditButton from "../editButton";
import { table } from "console";

export default function Table(props: { data: DocsDataType; canEdit: boolean }) {
  return (
    <table className="my-6">
      {props.data.map((row) => (
        <tr className="text-black px-2 border-b-2" key={row.rowNum} data-row-num={row.rowNum}>
          <td className="pr-2">
            {moment(row.date, "D/MM/yyyy").format("ddd Do MMM")}
          </td>
          <td className="pr-2">
            {row.shiftStart} - {row.shiftEnd}
          </td>
          <td className="pr-1">
            <span className="text-sm text-gray-500">
              {row.hours} hours at {row.enhancedRate || "£15:00"}
              {row.enhancedRate && "✨"}
            </span>
          </td>
          <td>{props.canEdit && <EditButton rowNum={row.rowNum} />}</td>
        </tr>
      ))}
    </table>
  );
}
