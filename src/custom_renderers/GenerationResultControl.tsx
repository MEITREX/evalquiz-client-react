import { withJsonFormsControlProps } from "@jsonforms/react";
import LectureMaterialAutocomplete from "./LectureMaterialAutocomplete";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

interface Props {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const style = {
  overflow: "auto",
  "max-width": "800px",
  justifyContent: "center",
  borderRadius: "0.25em",
  backgroundColor: "#cecece",
  marginBottom: "1rem",
};

const GenerationResultControl = ({ data }: Props) => (
  <Fragment>
    <Typography variant="h5">Generation result:</Typography>
    <br />
    {console.log(data)}
    <div style={style}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  </Fragment>
);

export default withJsonFormsControlProps(GenerationResultControl);
