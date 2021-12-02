import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ButtonComponent = ({text, variant, onClick}) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant={variant} onClick={onClick}>{text}</Button>
    </Stack>
  );
}

export default ButtonComponent;
