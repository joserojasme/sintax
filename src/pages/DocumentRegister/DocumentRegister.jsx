import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Item } from './material.styles';
import Button from '../../components/Button';
import { ReactComponent as ExcelIcon } from '../../assets/excel.svg';

const DocumentRegister = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button text='Nuevo votante' variant='outlined' onClick={()=>alert('ok')} />
        </Grid>
        <Grid item xs={4}>
          <ExcelIcon onClick={()=>alert('ok')} />
        </Grid>
        <Grid item xs={12}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DocumentRegister;
