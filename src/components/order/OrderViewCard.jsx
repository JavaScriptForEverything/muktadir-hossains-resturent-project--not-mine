const OrderViewCard = ({ title, count }) => {

  // Background Color Switch::
    let bgColor;
    switch (title) {
      case "Pending Orders":
        bgColor = "bg-lime-400";
        break;
      case "preparing":
        bgColor = "bg-green-400";
        break;
      case "served":
        bgColor = "bg-orange-500";
        break;
      case "Paid Order":
        bgColor = "bg-green-600 text-white";
        break;
      case "Canceled Order":
        bgColor = "bg-slate-900 text-white";
        break;
      case "Total Order":
        bgColor = "bg-slate-900 text-white";
        break;
      default:
        bgColor = "bg-slate-200";
    }

  return (
    <div className={`${bgColor} rounded-md px-2 py-5`}>
      <div>
        <p className="text-2xl font-semibold text-center">
          {count < 9 ? "0" : null}
          {count ? count : 0}
        </p>
        <h3 className="text-sm font-medium text-center mt-2">
          {title ? title : "Count"}
        </h3>
      </div>
    </div>
  );
};

export default OrderViewCard;
