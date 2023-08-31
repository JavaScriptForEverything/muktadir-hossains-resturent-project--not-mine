"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import useInput from "@/hooks/useInput";
import toast, { Toaster } from "react-hot-toast";
import Colors from "@/assets/Colors";

const Settings = () => {
  const [loading, setLoading] = useState(false);

  // Initial From Values::
  const initialData = {
    vatPercentage: 0,
    discount_value: 0,
    discount_type: "",
  };

  const {
    input: configData,
    inputChangeHandler,
    setInput: setConfigData,
  } = useInput(initialData);

  // GET Configurations from the DB::
  useEffect(() => {
    // fetch configuration from the DB::
    fetch(`/api/configurations`)
      .then((response) => response.json())
      .then((data) => {
        setConfigData({
          vatPercentage: data?.configurations?.vatPercentage,
          discount_value: data?.configurations?.discount_value,
          discount_type: data?.configurations?.discount_type,
        });
      });
  }, []);

  // Submit Button Handler::
  const handelSaveButton = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/configurations`, configData);

      if (res.status === 200) {
        // Success Toast
        toast.success(`${res.data.message}`, {
          style: {
            background: Colors.success,
            color: Colors.black,
            borderRadius: 5,
          },
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      // Error Toast
      toast.error(`${error.message}`, {
        style: {
          background: Colors.error,
          color: Colors.black,
        },
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-6/12 mx-auto py-10 mb-10">
      <Toaster />
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
          onChange={(e) => inputChangeHandler(e)}
          name="vatPercentage"
          id="outlined-error-1"
          label="VAT Percentage (%)"
          value={configData?.vatPercentage ? configData.vatPercentage : 0}
        />
        <br />
        <TextField
          size="small"
          error={false}
          onChange={(e) => inputChangeHandler(e)}
          name="discount_value"
          id="outlined-error"
          label="Discount"
          defaultValue={0}
          value={configData?.discount_value ? configData?.discount_value : 0}
        />

        <TextField
          size="small"
          id="outlined-select-discount-type"
          select
          label="Select Discount Type"
          onChange={(e) => inputChangeHandler(e)}
          name="discount_type"
          defaultValue={0}
          value={
            configData?.discount_type ? configData?.discount_type : "percentage"
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
