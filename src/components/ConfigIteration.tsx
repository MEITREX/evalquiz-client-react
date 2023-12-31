import { Fragment, useState, useMemo, ChangeEvent } from 'react';
import { JsonForms } from '@jsonforms/react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { makeStyles } from '@mui/styles';
import internalConfigSchema from '../dereferenced-schemas/InternalConfigSchemaWithDefaults.json';
import internalConfigUISchema from '../dereferenced-schemas/InternalConfigUISchema.json';
import internalConfigUISchemaSimple from '../dereferenced-schemas/InternalConfigUISchemaSimple.json';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import lectureMaterialControlTester from '../custom_renderers/lectureMaterialControlTester';
import LectureMaterialControl from '../custom_renderers/LectureMaterialControl';
import generationResultControlTester from '../custom_renderers/generationResultControlTester';
import GenerationResultControl from '../custom_renderers/GenerationResultControl';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { createAjv } from '@jsonforms/core';
import { useSnackbar, closeSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import fileDownload from 'js-file-download';
import Stack from '@mui/material/Stack';
import VisuallyHiddenInput from './VisuallyHiddenInput';

interface Props {
  advancedMode: boolean;
}

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
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
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const [config, setConfig] = useState<any>(initialData);
  const stringifiedData = useMemo(
    () => JSON.stringify(config, null, 2),
    [config]
  );

  const clearData = () => {
    setConfig({});
  };

  const [value, setValue] = useState('Config');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDefaultsAjv = createAjv({ useDefaults: true });

  const iterateConfig = async () => {
    let key = enqueueSnackbar('Config iteration in progress', {
      variant: 'info',
      persist: true,
      action: () => (
        <Box sx={{ padding: 2 }}>
          <CircularProgress color='inherit' />
        </Box>
      ),
    });
    await axios
      .post(
        (process.env.REACT_APP_BACKEND_URL || '').concat('/api/iterate_config'),
        {
          config,
        }
      )
      .then((result) => {
        if (result.data !== null && result.data !== undefined) {
          processPipelineStatus(result.data);
        }
        closeSnackbar(key);
      })
      .catch((error) => {
        enqueueSnackbar('Failed to iterate config: '.concat(error.message), {
          variant: 'warning',
        });
        closeSnackbar(key);
      });
  };

  const processPipelineStatus = (pipelineStatus: any) => {
    console.log(pipelineStatus);
    let errorMessage = pipelineStatus.batch_status[0].error_message;
    if (errorMessage !== null && errorMessage !== undefined) {
      enqueueSnackbar('Failed to iterate config: '.concat(errorMessage), {
        variant: 'warning',
      });
    } else {
      let pipelineResult = pipelineStatus.result;
      if (pipelineResult !== null && pipelineResult !== undefined) {
        let internalConfig = pipelineResult.internal_config;
        if (internalConfig !== null && internalConfig !== undefined) {
          enqueueSnackbar(
            `Config iteration complete!
            View "Question To Generate" section for results`,
            {
              variant: 'success',
            }
          );
          setConfig(internalConfig);
        } else {
          enqueueSnackbar('Failed to iterate config: Result is empty', {
            variant: 'warning',
          });
        }
      } else {
        enqueueSnackbar('Failed to iterate config: Result is empty', {
          variant: 'warning',
        });
      }
    }
  };

  const validateInternalConfig =
    handleDefaultsAjv.compile(internalConfigSchema);

  const handleDownloadConfig = () => {
    fileDownload(JSON.stringify(config, null, 2), 'config.json');
  };

  const handleUploadConfig = () => {};

  const uploadConfig = (event: ChangeEvent) => {
    let files = (event.target as HTMLInputElement).files;
    if (files !== null && files !== undefined) {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        let text = fileReader.result;
        if (text !== null && text !== undefined) {
          try {
            let newConfig = JSON.parse(text as string);
            if (validateInternalConfig(newConfig)) {
              setConfig(newConfig);
            } else {
              enqueueSnackbar('Failed to upload config: Config not valid', {
                variant: 'warning',
              });
            }
          } catch {
            enqueueSnackbar('Failed to upload config: Config not JSON', {
              variant: 'warning',
            });
          }
        } else {
          enqueueSnackbar('Failed to upload config: Config not present', {
            variant: 'warning',
          });
        }
      };
      fileReader.readAsText(files[0]);
    }
  };

  return (
    <Fragment>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='primary tabs example'
          centered
        >
          <Tab value='JSON' label='RAW JSON' />
          <Tab value='Config' label='Editable Config' />
        </Tabs>
      </Box>
      {value === 'JSON' ? (
        <Container>
          <Typography variant={'h5'} className={classes.title}>
            Raw JSON Data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='raw-json-data'>{stringifiedData}</pre>
          </div>
          <Stack direction='row' sx={{ m: 2 }} justifyContent='space-between'>
            <Button
              id='download-config-button'
              startIcon={<FileDownloadOutlinedIcon />}
              aria-haspopup='true'
              variant='outlined'
              onClick={handleDownloadConfig}
            >
              Download
            </Button>
            <Button
              id='clear-config-button'
              onClick={clearData}
              variant='contained'
            >
              Clear Config
            </Button>
            <Button
              id='upload-config-button'
              startIcon={<FileUploadOutlinedIcon />}
              component='label'
              aria-haspopup='true'
              variant='outlined'
              onClick={handleUploadConfig}
            >
              Upload
              <VisuallyHiddenInput
                id='uploadFile'
                type='file'
                onChange={uploadConfig}
              />
            </Button>
          </Stack>
        </Container>
      ) : null}
      {value === 'Config' ? (
        <Container>
          <Typography variant={'h5'} className={classes.title}>
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
              data={config}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setConfig(data)}
              ajv={handleDefaultsAjv}
            />
          </div>
          <Tooltip title='Sends config to server in order to generate questions'>
            <Button
              variant='contained'
              onClick={iterateConfig}
              endIcon={<SendIcon />}
            >
              Iterate Config
            </Button>
          </Tooltip>
        </Container>
      ) : null}
    </Fragment>
  );
}
