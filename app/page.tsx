import Datatable from "@/components/Datatable";
import SelectButton from "@/components/SelectButton";
import StatusComponent from "@/components/StatusComponent";
import axios from "axios";
import moment from "moment";

async function dataFetch() {
  const data = await axios.get(
    "https://64b52b33f3dbab5a95c6d816.mockapi.io/TableData"
  );
  return data.data;
}
export default async function Home() {
  const data = await dataFetch();
  const dataWithComponents = data.map(
    (row: { timestamp: Date }, key: number) => {
      return {
        ...row,
        select: <SelectButton />,
        status: <StatusComponent status={key} />,
        timestamp: moment(row.timestamp).fromNow(),
      };
    }
  );

  return (
    <div className="h-[100vh] bg-black flex justify-center items-center">
      <Datatable
        pagination
        sortable
        rowData={dataWithComponents}
        caption={"Booking"}
        headers={["Timestamp", "Email", "Name", "Status", "Select"]}
      />
    </div>
  );
}
