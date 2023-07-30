import { useState } from "react";

const useInput = (fields) => {
  const [input, setInput] = useState(fields);

  const inputChangeHandler = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return {input, inputChangeHandler};
};

export default useInput;
