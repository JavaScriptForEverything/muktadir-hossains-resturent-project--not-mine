import Image from "next/image";

const LoadingGraph = () => {
  return (
    <div className="flex justify-center items-center bg-white h-[50vh]">
      <Image
        height={100}
        width={100}
        src={"/design/loading-chart.gif"}
        alt="Loading..."
      />
    </div>
  );
};

export default LoadingGraph;
