import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <Image
        height={100}
        width={100}
        src={"/design/spinner.gif"}
        alt="Loading..."
      />
    </div>
  );
};

export default LoadingSpinner;