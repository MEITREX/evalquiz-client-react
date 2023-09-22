import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

interface Props {
  value: any;
  updateValue: (newValue: any) => void;
}

const style = {
  overflow: 'auto',
  'max-width': '800px',
  justifyContent: 'center',
  borderRadius: '0.25em',
  backgroundColor: '#cecece',
  marginBottom: '1rem',
};

export default function LectureMaterialAutocomplete({
  value,
  updateValue,
}: Props) {
  const clearData = () => {
    updateValue(null);
  };

  return (
    <Fragment>
      {value !== null && value !== undefined ? (
        <Fragment>
          <Typography variant='h5'>Generation result:</Typography>
          <br />
          <div style={style}>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
          <Tooltip title='Result is regenerated on next config iteration'>
            <Button onClick={clearData} variant='contained'>
              Clear
            </Button>
          </Tooltip>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
