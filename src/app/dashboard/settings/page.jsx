"use client";
import { useEffect, useState } from "react";
import useInput from "@/hooks/useInput";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { fetchApiData } from "@/utilities/helperFunctions";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [configuration, setConfiguration] = useState({});

  console.log("configuration::", configuration?.discount?.type);

  // Initial From Values::
  const initialData = {
    vatPercentage: 0,
    discount: {
      value: 0,
      type: "percentage",
    },
  };
  const { input, inputChangeHandler, setInput } = useInput(initialData);

  // GET Configurations from the DB::
  useEffect(() => {
    // fetch configuration from the DB::
    const configurations = fetchApiData(`/api/configurations`).then((apiData) =>
      setConfiguration(apiData?.configurations)
    );
  }, []);

  // Submit Button Handler::
  const handelSaveButton = async () => {
    try {
      console.log(input);
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
          onChange={(e) => inputChangeHandler(e)}
          name="vatPercentage"
          id="outlined-error"
          label="VAT Percentage (%)"
          defaultValue={configuration?.vatPercentage ? configuration.vatPercentage : 0}
        />
        <br />
        <TextField
          size="small"
          error={false}
          onChange={(e) => inputChangeHandler(e)}
          name="discount"
          id="outlined-error"
          label="Discount"
          defaultValue={
            configuration?.discount?.value ? configuration?.discount?.value : 0
          }
        />

        <TextField
          size="small"
          id="outlined-select-currency"
          select
          label="Select Discount Type"
          defaultValue={configuration?.discount?.type ? configuration?.discount?.type : "percentage"}
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
          >
            Save
          </LoadingButton>
        </div>
      </Box>
    </div>
  );
};

export default Settings;
