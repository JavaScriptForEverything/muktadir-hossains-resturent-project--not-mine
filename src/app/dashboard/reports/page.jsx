"use client";
import ReportsDataTable from "@/components/muiComponents/ReportsDataTable";
import OrderViewCard from "@/components/order/orderViewCard";
import useGetApiResponse from "@/hooks/useGetApiResponse";
import { useEffect } from "react";

const reportPage = () => {
  const {
    data: apiData,
    error,
    loading,
  } = useGetApiResponse("/api/reports/all");

  return (
    <>
      <h2 className="text-center text-5xl my-3 font-bold">Report Page</h2>
      {/* Main Area:: */}
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
      {/* Main Area:: */}
      {/* Data Table Here:: */}
      {apiData && (
        <div className="mt-5">
          <ReportsDataTable data={apiData?.allOrders} />
        </div>
      )}

      {/* {apiData &&<div>
        <table className="w-5/6 mx-auto table-auto">
          <thead>
            <tr className="border-b border-b-black">
              <th className="text-left w-3/12">State</th>
              <th className="text-left w-3/12">City</th>
              <th className="text-left w-3/12">Total</th>
              <th className="text-left w-3/12">Date</th>
            </tr>
          </thead>
          <tbody>
            {(apiData?.allOrders).map((order) => {
              // console.log(order);
              return (
                <tr key={order._id} className="border-b border-b-slate-300">
                  <td>{order.orderType}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.payableAmount}</td>
                  <td className="text-sm">
                    {new Date(order?.createdAt)?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>} */}
    </>
  );
};

export default reportPage;
