import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/Article";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";

interface MaterialNameHashPair {
  name: string;
  hash: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function LectureMaterials() {
  const [materialHashNamePairs, setMaterialHashNamePairs] = React.useState<
    Array<MaterialNameHashPair>
  >([]);

  const [fileName, setFileName] = React.useState("");

  const handleFileName = (event: { target: { value: any } }) => {
    const fileName = event.target.value;
    setFileName(fileName);
  };

  const uploadFile = async (event: React.ChangeEvent) => {
    let formData = new FormData();
    let files = (event.target as HTMLInputElement).files;
    if (files !== null && files !== undefined) {
      formData.append("material", files[0]);
      if (fileName !== "") {
        formData.append("name", fileName);
        axios
          .postForm(
            (process.env.REACT_APP_BACKEND_URL || "").concat(
              "/api/upload_material"
            ),
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(() => {
            fetchMaterialHashNamePairs();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.warn("File name not set!");
      }
    } else {
      console.warn("File not found!");
    }
  };

  const deleteFile = (hash: string) => {
    if (hash === "") {
      console.warn("Invalid empty hash!");
    } else {
      axios
        .get(
          (process.env.REACT_APP_BACKEND_URL || "").concat(
            "/api/delete_material/".concat(hash)
          )
        )
        .then(() => {
          fetchMaterialHashNamePairs();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  React.useEffect(() => {
    fetchMaterialHashNamePairs();
  }, []);

  const [keyword, setKeyword] = React.useState("");

  const filteredMaterialHashNamePairs = () => {
    if (keyword !== "") {
      const results = materialHashNamePairs.filter((row) => {
        return row.name.includes(keyword);
      });
      return results;
    } else {
      return materialHashNamePairs;
    }
  };

  return (
    <Container>
      <Stack direction="row" sx={{ m: 2 }} justifyContent="space-between">
        <TextField
          id="outlined-basic"
          size="small"
          label="Search"
          variant="outlined"
          sx={{ mt: 0, ml: -2 }}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />
        <Stack direction="row">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            size="small"
            sx={{ maxHeight: 40, padding: 2 }}
          >
            Upload file
            <VisuallyHiddenInput
              id="fileInput"
              type="file"
              onChange={uploadFile}
            />
          </Button>
          <TextField
            error={fileName === ""}
            helperText={fileName === "" ? "Not allowed to be empty." : null}
            id="outlined-basic"
            size="small"
            label="File Name"
            variant="outlined"
            sx={{ mt: 0 }}
            onChange={handleFileName}
          />
        </Stack>
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ margin: 10 }}
      >
        {filteredMaterialHashNamePairs().map((row, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card>
              <CardHeader
                title={row.name}
                action={
                  <IconButton aria-label="settings">
                    <ArticleIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Hash:
                </Typography>
                <Typography variant="body2">
                  {row.hash.substring(0, 16)} {row.hash.substring(16, 32)}
                </Typography>
                <Typography variant="body2">
                  {row.hash.substring(32, 48)} {row.hash.substring(48, 64)}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => {
                    deleteFile(row.hash);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
