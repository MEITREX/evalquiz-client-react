import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface Props {
  value: string;
  updateValue: (newValue: string) => void;
}

const test = ["9384304", "sjdkflsjdf"];

export default function LectureMaterialAutocomplete({
  value,
  updateValue,
}: Props) {
  return (
    <Autocomplete
      disablePortal
      value={value}
      onChange={(_, newValue) => {
        if (newValue === null || newValue === undefined) {
          updateValue(value);
        } else {
          updateValue(newValue);
        }
      }}
      id="combo-box-demo"
      options={test}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Lecture Material" />
      )}
    />
  );
}
