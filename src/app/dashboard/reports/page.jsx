import Order from "@/models/foodOrderModel";
import React from "react";

const reportPage = async () => {
  const totalOrder = await Order.find();
  return (
    <div className="h-full">
      <h2 className="text-center">Report Page</h2>
      <h3>Total orders:{totalOrder.length}</h3>
      <div>
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
            {totalOrder.map((order) => {
              // console.log(order);
              return (
                <tr key={order._id} className="border-b border-b-slate-300">
                  <td>{order.orderType}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.payableAmount}</td>
                  <td className="text-sm">
                    {order.createdAt?.toLocaleDateString("en-US", {
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
      </div>
    </div>
  );
};

export default reportPage;
