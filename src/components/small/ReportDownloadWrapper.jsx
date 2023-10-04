'use client'
import ReportPDFDoc from "../report/ReportPDFDoc";
import { PDFDownloadLink } from "@react-pdf/renderer";

function ReportDownloadWrapper({reportData}) {
  return (
    <div className="flex justify-center items-center md:justify-evenly">
      <div>
        <PDFDownloadLink document={<ReportPDFDoc reportData={reportData}/>} filename="FORM">
          {({ loading }) =>
            loading ? (
                <button className="btn btn-red inline-block mr-2">Loading...</button>
            ) : (
                <button className="btn btn-red inline-block">Download PDF</button>
            )
          }
        </PDFDownloadLink>
        <button className="btn btn-red inline-block">Download CSV</button>
      </div>
    </div>
  );
}

export default ReportDownloadWrapper;
