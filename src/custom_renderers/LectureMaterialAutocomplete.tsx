import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface Props {
  value: string;
  updateValue: (newHash: string) => void;
}

const test = [
  { name: "hello", hash: "9384304" },
  { name: "wow", hash: "sjdkflsjdf" },
];

export default function LectureMaterialAutocomplete({
  value,
  updateValue,
}: Props) {
  const referencedHashs = test.map((valueNamePair) => ({
    displayText: valueNamePair.name.concat(", ", valueNamePair.hash),
    hash: valueNamePair.hash,
  }));

  const displayTexts = referencedHashs.map(
    (displayTextHashPair) => displayTextHashPair.displayText
  );

  const [displayText, setDisplayText] = useState(displayTexts[0]);

  const displayTextToHash = (displayText: string) => {
    let hash = null;
    referencedHashs.forEach((referencedHash) => {
      if (referencedHash.displayText === displayText) {
        hash = referencedHash.hash;
      }
    });
    return hash;
  };

  return (
    <Autocomplete
      disablePortal
      value={displayText}
      onChange={(_, newDisplayText) => {
        if (newDisplayText === null || newDisplayText === undefined) {
          updateValue(value);
        } else {
          setDisplayText(newDisplayText);
          updateValue(displayTextToHash(newDisplayText) ?? value);
        }
      }}
      id="combo-box-demo"
      options={displayTexts}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Lecture Material" />
      )}
    />
  );
}
