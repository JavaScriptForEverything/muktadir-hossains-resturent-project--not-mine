import React from "react";

function ErrorWrapper({ error }) {
  return (
    <div className="h-[80vh]  bg-red-300 rounded py-10">
      <h2 className="text-6xl text-center my-5">Error</h2>
      <p className="text-center text-4xl">Message: {error.message}</p>

      <p className="font-mono mt-10 text-center">Contact the developer to solve this issue.</p>
    </div>
  );
}

export default ErrorWrapper;
