"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { fetchApiData } from "@/utilities/helperFunctions";
import axios from "axios";

const Settings = () => {
  const [loading, setLoading] = useState(false);

  // Initial From Values::
  const initialData = {
    vatPercentage: 0,
    discount: {
      value: 0,
      type: "",
    },
  };
  const [configData, setConfigData] = useState(initialData);
  console.log(configData);
  // On Change Handler::
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
  
    if (name === "vatPercentage") {
      setConfigData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "discount__amount" || name === "discount__type") {
      setConfigData((prevState) => ({
        ...prevState,
        discount: {
          ...prevState.discount,
          [name.split("__")[1]]: value,
        },
      }));
    }
  };
  
  
  // GET Configurations from the DB::
  useEffect(() => {
    // fetch configuration from the DB::
    fetch(`/api/configurations`)
      .then((response) => response.json())
      .then((data) => {
        setConfigData({
          vatPercentage: data?.configurations?.vatPercentage,
          discount: {
            value: data?.configurations?.discount?.value,
            type: data?.configurations?.discount?.type,
          },
        });
      });
  }, []);

  // Submit Button Handler::
  const handelSaveButton = async () => {
    try {
      console.log(configData);
      const res = await axios.post(`/api/configurations`, configData);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-6/12 mx-auto py-10 mb-10">
      <h1 className="text-3xl text-violet-600 font-semibold text-center mb-10 mt-5 font-mono">
        Edit Site Configurations here:
      </h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
          "& > :first-child": { m: 2, width: "53.5ch" },
        }}
        noValidate
        // autoComplete="off"
      >
        <TextField
          error={false}
          size="small"
          onChange={(e) => onChangeHandler(e)}
          name="vatPercentage"
          id="outlined-error"
          label="VAT Percentage (%)"
          defaultValue={
            configData?.vatPercentage ? configData.vatPercentage : 0
          }
        />
        <br />
        <TextField
          size="small"
          error={false}
          onChange={(e) => onChangeHandler(e)}
          name="discount__amount"
          id="outlined-error"
          label="Discount"
          defaultValue={
            configData?.discount?.value ? configData?.discount?.value : 0
          }
        />

        <TextField
          size="small"
          id="outlined-select-currency"
          select
          label="Select Discount Type"
          onChange={(e) => onChangeHandler(e)}
          name="discount__type"
          value={
            configData?.discount?.type
              ? configData?.discount?.type
              : "percentage"
          }
        >
          <MenuItem value="fixed">Fixed</MenuItem>
          <MenuItem value="percentage">Percentage</MenuItem>
        </TextField>
        {/* Loading Button:: */}
        <div>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            onClick={handelSaveButton}
          >
            Save
          </LoadingButton>
        </div>
      </Box>
    </div>
  );
};

export default Settings;
