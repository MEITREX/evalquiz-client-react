import { withJsonFormsControlProps } from "@jsonforms/react";
import LectureMaterialAutocomplete from "./LectureMaterialAutocomplete";

interface Props {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const LectureMaterialControl = ({ data, handleChange, path }: Props) => (
  <LectureMaterialAutocomplete
    value={data}
    updateValue={(newValue: string) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(LectureMaterialControl);
