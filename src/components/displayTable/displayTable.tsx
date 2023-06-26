import { DocsDataType } from "../../app/getSheetData";
import EditButton from "../editButton";

export default function Table(props: { data: DocsDataType; canEdit: boolean }) {
  return (
    <table className="border-collapse w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tr className="border-y-2">
          <th scope="col" className="px-1 py-1">
            Date
          </th>
          <th scope="col" className="px-1 py-1">
            Shift Start
          </th>
          <th scope="col" className="px-1 py-1">
            Shift End
          </th>
          <th scope="col" className="px-1 py-1">
            Hours
          </th>
          <th scope="col" className="px-1 py-1">
            Enhanced Rate
          </th>
          {props.canEdit && (
            <th scope="col" className="px-1 py-1">
              Select shift
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row) => (
          <tr className="border-y-2" key={row.rowNum} data-row-num={row.rowNum}>
            <td className="px-2 py-2">{row.date}</td>
            <td className="px-2 py-2">{row.shiftStart}</td>
            <td className="px-2 py-2">{row.shiftEnd}</td>
            <td className="px-2 py-2">{row.hours}</td>
            <td className="px-2 py-2">{row.enhancedRate}</td>
            {props.canEdit && <EditButton rowNum={row.rowNum} />}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
