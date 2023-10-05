"use client";
import { useState } from "react";
import ReportsDataTable from "@/components/muiComponents/ReportsDataTable";
import OrderViewCard from "@/components/order/orderViewCard";
import ErrorWrapper from "@/components/small/ErrorWrapper";
import useGetApiResponse from "@/hooks/useGetApiResponse";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
// Date Picker Imports
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Colors from "@/assets/Colors";
import ReportPDFDoc from "@/components/report/ReportPDFDoc";
import ReportDownloadWrapper from "@/components/report/ReportDownloadWrapper";

const reportPage = () => {
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [showDownloadArea, setShowDownloadArea] = useState(false);

  // Call Api from custom hook::
  const [url, setUrl] = useState(`/api/reports/all?page=1&limit=10`);
  const { data: apiData, error, loading } = useGetApiResponse(url);

  // search Button Handler::
  const searchBtnHandler = () => {
    if (!fromValue) {
      // error toast::
      toast.error("Please Enter From Date!!!", {
        style: {
          background: Colors.error,
          color: Colors.black,
          borderRadius: 5,
        },
        duration: 3000,
      });
      return;
    }

    const toDate = toValue.format("MM-DD-YYYY");
    const fromDate = fromValue.format("MM-DD-YYYY") || "";
    setUrl(
      `/api/reports/search?toDate=${toDate}&fromDate=${fromDate}`
    );
    setShowDownloadArea(true);
  };

  // Handle Pagination Here::
  const handelPagination = (event, page) => {

    setUrl(`/api/reports/all?page=${page}&limit=10`);
  };

  return (
    <>
      <h2 className="text-center text-3xl my-3 font-bold">Report Page</h2>
      {/* 
        |===/ /====/::Date Picker ::/====|
      */}
      <Toaster />
      <section className="flex justify-center items-center my-8">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="From Date"
              value={fromValue}
              onChange={(newValue) => setFromValue(newValue)}
            />
            <DatePicker
              label="To Date"
              value={toValue}
              onChange={(newValue) => setToValue(newValue)}
            />
            <button onClick={searchBtnHandler} className="btn btn-dash-primary">
              Search
            </button>
          </DemoContainer>
        </LocalizationProvider>
      </section>

      {/* Main Area:: */}

      {
        // ::Handel Loading Here::
        loading && (
          <div className="flex justify-center items-center bg-white h-[50vh]">
            <Image
              height={100}
              width={100}
              src={"/design/loading-chart.gif"}
              alt="Loading..."
            />
          </div>
        )
      }

      {/* // ::Handel Error Here:: // */}

      {error && <ErrorWrapper error={error} />}

      {/*// :: Report Cards Area Here:: //*/}
      {apiData?.totalOrders &&
        apiData?.paidOrdersCount &&
        apiData?.pendingOrdersCount &&
        apiData?.canceledOrdersCount && (
          <div className="grid grid-cols-4 gap-5">
            <OrderViewCard title="Total Order" count={apiData?.totalOrders} />
            <OrderViewCard
              title="Paid Order"
              count={apiData?.paidOrdersCount}
            />
            <OrderViewCard
              title="Pending Orders"
              count={apiData?.pendingOrdersCount}
            />
            <OrderViewCard
              title="Canceled Order"
              count={apiData?.canceledOrdersCount}
            />
          </div>
        )}

      {/* :: Data Table Here:: */}
      {apiData && (
        <div className="mt-5">
          <ReportsDataTable data={apiData?.allOrders} />

          {/* 
          Check if there are more than 100 
          Orders to show Pagination:: */}

          {apiData?.totalPages > 100 && (
            <div className="flex justify-center mt-10 mb-5">
              <Pagination
                onChange={handelPagination}
                count={apiData?.totalPages}
                variant="outlined"
                shape="rounded"
              />
            </div>
          )}

          {/* Report download Area */}
          {apiData && showDownloadArea && (
              <ReportDownloadWrapper reportData={apiData?.allOrders}/>
          )}
        </div>
      )}
    </>
  );
};

export default reportPage;
