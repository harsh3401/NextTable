import Datatable from "@/components/Datatable"
import SelectButton from "@/components/SelectButton"
import StatusComponent from "@/components/StatusComponent"
import axios from "axios"

async function dataFetch()
{
const data= await axios.get("https://64b52b33f3dbab5a95c6d816.mockapi.io/TableData")
return data.data
}
export default async function Home() {
  const data=await dataFetch();
  const dataWithComponents=data.map((row:{},key:Number)=>{
    return {...row,select:  <SelectButton />,status:<StatusComponent /> }})

  
  return (
    <main >
      <Datatable rows={dataWithComponents} caption={"Booking"} headers={['Timestamp',  'Email', 'Name', 'Status', 'Select']}/>
    </main>
  )
}

