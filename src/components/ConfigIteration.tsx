import { Fragment, useState, useMemo } from "react";
import { JsonForms } from "@jsonforms/react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { makeStyles } from "@mui/styles";
import internalConfigSchema from "../dereferenced-schemas/InternalConfigSchema.json";
import internalConfigUISchema from "../dereferenced-schemas/InternalConfigUISchema.json";
import internalConfigUISchemaSimple from "../dereferenced-schemas/InternalConfigUISchemaSimple.json";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import lectureMaterialControlTester from "../custom_renderers/lectureMaterialControlTester";
import LectureMaterialControl from "../custom_renderers/LectureMaterialControl";
import generationResultControlTester from "../custom_renderers/generationResultControlTester";
import GenerationResultControl from "../custom_renderers/GenerationResultControl";

interface Props {
  advancedMode: boolean;
}

const useStyles = makeStyles({
  container: {
    padding: "1em",
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: "0.25em",
  },
  dataContent: {
    display: "flex",
    justifyContent: "center",
    borderRadius: "0.25em",
    backgroundColor: "#cecece",
    marginBottom: "1rem",
  },
  resetButton: {
    margin: "auto !important",
    display: "block !important",
  },
  demoform: {
    margin: "auto",
    padding: "1rem",
  },
});

const initialData = {
  material_server_urls: [],
  batches: [],
  course_settings: {},
  generation_settings: {},
  evaluation_settings: {},
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: lectureMaterialControlTester, renderer: LectureMaterialControl },
  { tester: generationResultControlTester, renderer: GenerationResultControl },
];

export default function ConfigIteration({ advancedMode }: Props) {
  const classes = useStyles();
  const [data, setData] = useState<any>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };

  const [value, setValue] = useState("Config");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="primary tabs example"
          centered
        >
          <Tab value="JSON" label="RAW JSON" />
          <Tab value="Config" label="Editable Config" />
        </Tabs>
      </Box>
      {value === "JSON" ? (
        <Container>
          <Typography variant={"h5"} className={classes.title}>
            Raw JSON Data
          </Typography>
          <div className={classes.dataContent}>
            <pre id="boundData">{stringifiedData}</pre>
          </div>
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color="primary"
            variant="contained"
          >
            Clear data
          </Button>
        </Container>
      ) : null}
      {value === "Config" ? (
        <Container>
          <Typography variant={"h5"} className={classes.title}>
            Evalquiz Config
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={internalConfigSchema}
              uischema={
                advancedMode === true
                  ? internalConfigUISchema
                  : internalConfigUISchemaSimple
              }
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
            />
          </div>
        </Container>
      ) : null}
    </Fragment>
  );
}