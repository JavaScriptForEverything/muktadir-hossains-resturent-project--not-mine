"use client";
import ReportsDataTable from "@/components/muiComponents/ReportsDataTable";
import OrderViewCard from "@/components/order/orderViewCard";
import ErrorWrapper from "@/components/small/ErrorWrapper";
import useGetApiResponse from "@/hooks/useGetApiResponse";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { useState } from "react";

const reportPage = () => {
  const [url, setUrl] = useState(`/api/reports/all?page=1&limit=10`);

  const { data: apiData, error, loading } = useGetApiResponse(url);

  // Handle Pagination::
  const handelPagination = (event, page) => {
    setUrl(`/api/reports/all?page=${page}&limit=10`);
  };

  return (
    <>
      <h2 className="text-center text-3xl my-3 font-bold">Report Page</h2>
      {/* Main Area:: */}

      {
        // ::Handel Loading Here::
        loading && 
        <div className="flex justify-center items-center bg-white h-[50vh]">
          <Image height={128} width={128} src={'/design/loading-chart.gif'} alt="Loading..." />
        </div>
      }

      {
        // ::Handel Error Here::
        error && <ErrorWrapper error={error} />
      }

      {/* :: Report Cards Area Here:: */}
      {apiData && (
        <div className="grid grid-cols-4 gap-5">
          <OrderViewCard title="Total Order" count={apiData?.totalOrders} />
          <OrderViewCard title="Paid Order" count={apiData?.paidOrdersCount} />
          <OrderViewCard
            title="Pending Orders"
            count={apiData?.pendingOrdersCount}
          />
          <OrderViewCard
            title="Canceled Order"
            count={apiData?.canceledOrders.length}
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
        </div>
      )}
    </>
  );
};

export default reportPage;
