import { withJsonFormsControlProps } from '@jsonforms/react';
import GenerationResultModifier from './GenerationResultModifier';

interface Props {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const GenerationResultControl = ({ data, handleChange, path }: Props) => (
  <GenerationResultModifier
    value={data}
    updateValue={(newValue: any) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(GenerationResultControl);
