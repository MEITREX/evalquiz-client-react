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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  { name: "Test name 1", hash: "912309fj230j3fnkasfjdlkf" },
  { name: "Test name 2", hash: "asdfas3adfadfasdfffasdsd" },
];

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

const uploadFile = async (event: React.ChangeEvent) => {
  await axios.postForm("https://httpbin.org/post", {
    myVar: "material",
    file: (event.target as HTMLInputElement).files,
  });
};

export default function LectureMaterials() {
  const [materialHashNamePairs, setMaterialHashNamePairs] = React.useState([
    { name: "", hash: "" },
  ]);

  axios.get("/api/get_material_hash_name_pairs").then(function (response) {
    setMaterialHashNamePairs(response.data);
  });

  const [_, setSearchResult] = React.useState("");

  const [foundRows, setFoundRows] = React.useState(materialHashNamePairs);

  const filter = (event: { target: { value: any } }) => {
    const keyword = event.target.value;
    console.log(keyword);

    if (keyword !== "") {
      const results = materialHashNamePairs.filter((row) => {
        return row.name.includes(keyword);
      });
      setFoundRows(results);
    } else {
      setFoundRows(materialHashNamePairs);
    }
    setSearchResult(keyword);
  };

  return (
    <Container>
      <Stack direction="row" spacing={2} sx={{ m: 2 }}>
        <TextField
          id="outlined-basic"
          size="small"
          label="Search"
          variant="outlined"
          sx={{ mt: 0, ml: -2 }}
          onChange={filter}
        />
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
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ margin: 10 }}
      >
        {foundRows.map((row, index) => (
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
                <Typography variant="body2">{row.hash}</Typography>
              </CardContent>
              <CardActions>
                <IconButton>
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
