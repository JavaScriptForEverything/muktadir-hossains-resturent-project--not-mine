const OrderViewCard = ({title, count}) => {
  return (
    <div className="bg-green-300  rounded-md px-2 py-5">
      <div>
        <p className="text-2xl font-semibold text-center">{count< 9 ? "0":null}{count? count: 0}</p>
        <h3 className="text-sm font-medium text-center mt-2">{title? title: "Count"}</h3>
      </div>
    </div>
  );
};

export default OrderViewCard;
