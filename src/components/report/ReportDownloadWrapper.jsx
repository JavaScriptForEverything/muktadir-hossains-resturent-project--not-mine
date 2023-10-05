"use client";
import ReportPDFDoc from "./ReportPDFDoc";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";

const ReportDownloadWrapper = ({ reportData }) => {
  // console.log(reportData)

  const myData = reportData.map((order) => ({
    _id: order._id,
    tableCode: order.tableCode || "N/A",
    orderStatus: order.orderStatus,
    subTotalPrice: order.subTotalPrice,
    vat: order.vat,
    discount: order.discount,
    payableAmount: order.payableAmount,
  }));

  console.log(myData);

  let headers = [
    { label: "ID", key: "_id" },
    { label: "Table", key: "tableCode" },
    { label: "Order Status", key: "orderStatus" },
    { label: "Sub Total", key: "subTotalPrice" },
    { label: "VAT", key: "vat" },
    { label: "Discount", key: "discount" },
    { label: "Total", key: "payableAmount" },
  ];

  return (
    <div className="flex justify-center items-center md:justify-evenly">
      <div className="my-5">
        <PDFDownloadLink
          document={<ReportPDFDoc reportData={reportData} />}
          filename="FORM"
        >
          {({ loading }) =>
            loading ? (
              <button className="btn-dashboard-sm btn-dash-primary mr-2 text-white">Loading...</button>
            ) : (
              <button className="btn-dashboard-sm btn-dash-primary mr-2 text-white">Export PDF</button>
            )
          }
        </PDFDownloadLink>
        <CSVLink data={myData} filename={"rms-report.csv"} headers={headers}>
          <button className="btn-dashboard-sm btn-dash-primary text-white">
            Download CSV
          </button>
        </CSVLink>
      </div>
    </div>
  );
};

export default ReportDownloadWrapper;
