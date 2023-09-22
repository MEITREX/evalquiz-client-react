import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

interface MaterialNameHashPair {
  name: string;
  hash: string;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const validUploadExtensions = [
  'md',
  'pptx',
  'csv',
  'tsv',
  'docx',
  'epub',
  'html',
  'ipynb',
  'json',
  'latex',
  'markdown',
  'man',
  'odt',
  'opml',
  'org',
  'ris',
  'rtf',
  'rst',
  'tex',
];

export default function LectureMaterials() {
  const { enqueueSnackbar } = useSnackbar();

  const [materialHashNamePairs, setMaterialHashNamePairs] = React.useState<
    Array<MaterialNameHashPair>
  >([]);

  const [fileName, setFileName] = React.useState('');

  const handleFileName = (event: { target: { value: any } }) => {
    const fileName = event.target.value;
    setFileName(fileName);
  };

  const validateFileExtension = (filename: string) => {
    let extension = filename.split('.').pop()?.toLowerCase();
    if (extension === null || extension === undefined) {
      return false;
    }
    return validUploadExtensions.includes(extension);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const uploadFile = async (event: React.ChangeEvent) => {
    let formData = new FormData();
    let files = (event.target as HTMLInputElement).files;
    if (files !== null && files !== undefined) {
      if (validateFileExtension(files[0].name)) {
        formData.append('material', files[0]);
        if (fileName !== '') {
          formData.append('name', fileName);
          axios
            .postForm(
              (process.env.REACT_APP_BACKEND_URL || '').concat(
                '/api/upload_material'
              ),
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
            .then(() => {
              enqueueSnackbar('File successfully uploaded!', {
                variant: 'success',
              });
              fetchMaterialHashNamePairs();
            })
            .catch((error) => {
              enqueueSnackbar('Failed to upload file: '.concat(error.message), {
                variant: 'warning',
              });
            });
        } else {
          enqueueSnackbar(
            'Failed to upload file: File Name not allowed to be empty',
            {
              variant: 'warning',
            }
          );
        }
      } else {
        enqueueSnackbar('Failed to upload file: Type is not valid', {
          variant: 'warning',
          action: (key) => (
            <Button size='small' onClick={() => setOpen(true)}>
              Detail
            </Button>
          ),
        });
      }
    } else {
      enqueueSnackbar('Failed to upload file: File not found', {
        variant: 'warning',
      });
    }
  };

  const deleteFile = (hash: string) => {
    if (hash === '') {
      enqueueSnackbar('Invalid empty hash', {
        variant: 'warning',
      });
    } else {
      axios
        .get(
          (process.env.REACT_APP_BACKEND_URL || '').concat(
            '/api/delete_material/'.concat(hash)
          )
        )
        .then(() => {
          fetchMaterialHashNamePairs();
        })
        .catch((error) => {
          enqueueSnackbar(
            'Failed to delete file on server: '.concat(error.message),
            { variant: 'warning' }
          );
        });
    }
  };

  const fetchMaterialHashNamePairs = async () => {
    axios
      .get(
        (process.env.REACT_APP_BACKEND_URL || '').concat(
          '/api/get_material_name_hash_pairs'
        )
      )
      .then(function (response) {
        setMaterialHashNamePairs(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(
          'Failed to fetch material from server: '.concat(error.message),
          { variant: 'warning' }
        );
      });
  };

  React.useEffect(() => {
    fetchMaterialHashNamePairs();
  }, []);

  const [keyword, setKeyword] = React.useState('');

  const filteredMaterialHashNamePairs = () => {
    if (keyword !== '') {
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
      <Stack direction='row' sx={{ m: 2 }} justifyContent='space-between'>
        <TextField
          id='outlined-basic'
          size='small'
          label='Search'
          variant='outlined'
          sx={{ mt: 0, ml: -2 }}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />
        <Stack direction='row'>
          <TextField
            error={fileName === ''}
            helperText={fileName === '' ? 'Not allowed to be empty.' : null}
            id='outlined-basic'
            size='small'
            label='File Name'
            variant='outlined'
            sx={{ mt: 0 }}
            onChange={handleFileName}
          />
          <Button
            component='label'
            variant='contained'
            startIcon={<CloudUploadIcon />}
            size='small'
            sx={{ maxHeight: 40, padding: 2 }}
          >
            Upload file
            <VisuallyHiddenInput
              id='fileInput'
              type='file'
              onChange={uploadFile}
            />
          </Button>
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
                  <IconButton aria-label='settings'>
                    <ArticleIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography
                  sx={{ fontSize: 12 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Hash:
                </Typography>
                <Typography variant='body2'>
                  {row.hash.substring(0, 16)} {row.hash.substring(16, 32)}
                </Typography>
                <Typography variant='body2'>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Upload a file of one of the following types:
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {validUploadExtensions.join(', ')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
