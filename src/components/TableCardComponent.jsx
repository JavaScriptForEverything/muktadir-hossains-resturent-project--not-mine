import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Groups2Icon from '@mui/icons-material/Groups2';

const TableCardComponent = ({table}) => {
  return (
    <div
    //style={{backgroundColor:table.isFree==="free" ? "red": "green"}}
    className={`${
      table.isFree === "free" ? "bg-green-200" : "bg-red-200"
    } shadow-md w-1/3 m-3 text-center p-6 rounded-md table__body`}
    key={table._id}
  >
    <h5 className="text-3xl my-2">{table.tableCode}</h5>
    <h5><Groups2Icon fontSize="large"/> &#8212; <strong className="text-lg">{table.tableCapacity}</strong></h5>
    <p className="pt-3">Status: {table.isFree.toUpperCase()}</p>
    <button
      className={`bg-slate-700 px-3 py-2 mt-4 rounded-md text-white font-light font-mono shadow-sm shadow-black`}
    >
      {table.isFree !== "free" ? "Cancel Booking" : "Book Table"}
    </button>
    <div className="cross__bar">
      <HighlightOffIcon style={{ color: "red" }} />
    </div>
  </div>
  )
}

export default TableCardComponent