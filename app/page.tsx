import Datatable from "@/components/Datatable";
import StatusComponent from "@/components/StatusComponent";
import axios from "axios";
import moment from "moment";

//fetching data from mockapi server side
async function dataFetch() {
  const data = await axios.get(
    "https://64b78bc421b9aa6eb0784847.mockapi.io/TableData"
  );
  return data.data;
}

export default async function Home() {
  const data = await dataFetch();
  //adding strings and components by modifying api response for props to the Datable component
  const dataWithComponents = data.map(
    (row: { timestamp: Date }, key: number) => {
      return {
        ...row,
        status: <StatusComponent status={key} />,
        timestamp: moment(row.timestamp).fromNow(),
      };
    }
  );

  return (
    <div className="h-[100vh] bg-black flex justify-center items-center">
      <Datatable
        sortable
        pagination
        rowData={dataWithComponents}
        caption={"Booking"}
        selectable
        headers={["Timestamp", "Email", "Name", "Status"]}
      />
    </div>
  );
}
