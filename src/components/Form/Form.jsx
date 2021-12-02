import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '../Select';
import Button from '../Button';
import { documentType, countries, states, cities } from '../../data/utils';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const Form = ({handleOpen}) => {
  const [docType, setDocType] = React.useState(null);
  const [name, setName] = React.useState('');
  const [documentNumber, setDocumentNumber] = React.useState('');
  const [country, setCountry] = React.useState(null);
  const [dep, setDep] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [depList, setDepList] = React.useState(null);
  const [cityList, setCityList] = React.useState(null);
  const [phone1, setPhone1] = React.useState('');
  const [phone2, setPhone2] = React.useState('');

  useEffect(()=>{
    if(country){
      const statesList = states.filter(item => item.id_country === country);
      setDepList(statesList);
    }
  },[country])

  useEffect(()=>{
    if(dep){
      const citiesList = cities.filter(item => item.id_state === dep);
      setCityList(citiesList);
    }
  },[dep])

  return (
    <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>Agregar o actualizar votante</Item>
        </Grid>
        <Grid item xs={6}>
          <TextField value={name} onChange={(event) => setName(event.target.value)} fullWidth label="Nombre completo" color="primary" focused />
        </Grid>
        <Grid item xs={3}>
          <Select data={documentType} value={docType} handleChange={(event) => setDocType(event.target.value)} label='Tipo de documento' />
        </Grid>
        <Grid item xs={3}>
          <TextField value={documentNumber} onChange={(event) => setDocumentNumber(event.target.value)} label="No. documento" color="primary" />
        </Grid>
        <Grid item xs={4}>
          <Select data={countries} value={country} handleChange={(event) => setCountry(event.target.value)} label='Pais' />
        </Grid>
        <Grid item xs={4}>
         <Select data={depList} value={dep} handleChange={(event) => setDep(event.target.value)} label='Departamento' />
        </Grid>
        <Grid item xs={4}>
          <Select data={cityList} value={city} handleChange={(event) => setCity(event.target.value)} label='Ciudad' />
        </Grid>
        <Grid item xs={3}>
          <TextField value={phone1} onChange={(event) => setPhone1(event.target.value)} label="Teléfono" color="primary" />
        </Grid>
        <Grid item xs={3}>
          <TextField value={phone2} onChange={(event) => setPhone2(event.target.value)} label="Celular" color="primary" />
        </Grid>
        <Grid item xs={2}>
          <Button text='Guardar' variant='contained' onClick={()=>alert('ok')} />
        </Grid>
        <Grid item xs={2}>
          <Button text='Cancelar' variant='contained' onClick={handleOpen} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
