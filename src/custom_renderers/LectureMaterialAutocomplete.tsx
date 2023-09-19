import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  value: string;
  updateValue: (newHash: string) => void;
}

interface MaterialNameHashPair {
  name: string;
  hash: string;
}

export default function LectureMaterialAutocomplete({
  value,
  updateValue,
}: Props) {
  const [materialHashNamePairs, setMaterialHashNamePairs] = useState<
    Array<MaterialNameHashPair>
  >([]);

  const [displayText, setDisplayText] = useState("");

  const getReferencedHashs = (
    localMaterialHashNamePairs: Array<MaterialNameHashPair>
  ) => {
    return localMaterialHashNamePairs.map((valueNamePair) => ({
      displayText: valueNamePair.name.concat(", ", valueNamePair.hash),
      hash: valueNamePair.hash,
    }));
  };

  const getDisplayTexts = (referencedHashs: any[]) => {
    return referencedHashs.map(
      (displayTextHashPair) => displayTextHashPair.displayText
    );
  };

  const getOptions = (materialHashNamePairs: Array<MaterialNameHashPair>) => {
    let referencedHashs = getReferencedHashs(materialHashNamePairs);
    return getDisplayTexts(referencedHashs);
  };

  const displayTextToHash = (referencedHashs: any[], displayText: string) => {
    let hash = null;
    referencedHashs.forEach((referencedHash) => {
      if (referencedHash.displayText === displayText) {
        hash = referencedHash.hash;
      }
    });
    return hash;
  };

  const fetchMaterialHashNamePairs = async () => {
    axios
      .get(
        (process.env.REACT_APP_BACKEND_URL || "").concat(
          "/api/get_material_name_hash_pairs"
        )
      )
      .then(function (response) {
        setMaterialHashNamePairs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMaterialHashNamePairs();
  }, []);

  return (
    <Autocomplete
      disablePortal
      value={displayText}
      onChange={(_, newDisplayText) => {
        if (newDisplayText === null || newDisplayText === undefined) {
          updateValue(value);
        } else {
          setDisplayText(newDisplayText);
          let referencedHashs = getReferencedHashs(materialHashNamePairs);
          updateValue(
            displayTextToHash(referencedHashs, newDisplayText) ?? value
          );
        }
      }}
      id="combo-box-demo"
      options={getOptions(materialHashNamePairs)}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Lecture Material" />
      )}
    />
  );
}
