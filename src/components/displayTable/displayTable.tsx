import moment from "moment";
import { DocsDataType } from "../../dataUpdates/getSheetData";
import EditButton from "../editButton";

export default function Table(props: { data: DocsDataType; canEdit: boolean }) {
  return (
    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
      {props.data.map((row) => (
        <div
          className="flex flex-col pb-3"
          key={row.rowNum}
          data-row-num={row.rowNum}
        >
          <dt className="mb-1 font-semibold md:text-lg dark:text-gray-400">
            {moment(row.date, "D/MM/yyyy").format("ddd Do MMM")} (
            {row.shiftStart} - {row.shiftEnd}){" "}
            <span className="text-sm font-thin text-gray-500">
              {row.hours} hours at {row.enhancedRate || "£15:00"}{" "}
              {row.enhancedRate && "✨"}
            </span>
            {props.canEdit && (
              <label className="float-right">
                <EditButton rowNum={row.rowNum} />
              </label>
            )}
          </dt>
          <dd className="text-m text-gray-500"></dd>
        </div>
      ))}
    </dl>
  );
}
