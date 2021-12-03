import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '../Select';
import Button from '../Button';
import { documentType, countries, states, cities } from '../../data/utils';
import { theme } from '../../material.styles';

const Item = styled(Paper)(() => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.secundary,
}));

const ItemError = styled(Paper)(() => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#cc0000',
}));

const Form = ({handleOpen, onSubmit, idEdit, data}) => {
  const [docType, setDocType] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [documentNumber, setDocumentNumber] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [dep, setDep] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [depList, setDepList] = React.useState(null);
  const [cityList, setCityList] = React.useState(null);
  const [phone1, setPhone1] = React.useState(null);
  const [phone2, setPhone2] = React.useState(null);
  const [error, setError] = React.useState(false);

  useEffect(()=>{
    if(country){
      const statesList = states.filter(item => item.id_country === country);
      setDepList(statesList);
    }
  },[country])

  useEffect(()=>{
    if(idEdit){
      const dataEdit = data.filter(item => item.id === idEdit);
      const { name, document, phone1, phone2, documentType, idCity } = dataEdit[0];
      const city = cities.filter(item => item.id === idCity);
      const state = states.filter(item => item.id === city[0].id_state);
      const country = countries.filter(item => item.id === state[0].id_country);
      setName(name);
      setDocumentNumber(document);
      setPhone1(phone1);
      setPhone2(phone2);
      setDocType(documentType);
      setCountry(country[0].id);
      setDep(state[0].id);
      setCity(city[0].id);
    }
  },[])

  useEffect(()=>{
    if(dep){
      const citiesList = cities.filter(item => item.id_state === dep);
      setCityList(citiesList);
    }
  },[dep])

  const handleSave = () => {
    if(!docType || !name || !documentNumber || !country || !dep || !city || !phone1 || !phone2){
      setError(true);
      return;
    }
    if(docType.length === 0 || name.length === 0 || documentNumber.length === 0 || country.length === 0 || 
      dep.length === 0 || city.length === 0 || phone1.length === 0 || phone2.length === 0){
      setError(true);
      return;
    }

    setError(false);
    const data = {
      name: name,
      documentType: docType,
      document: documentNumber,
      idCity: city,
      cityName: getCityName(city),
      phone1: phone1,
      phone2: phone2
    }

    onSubmit(data, idEdit);
  }

  const getCityName = (id) => {
    const citySelected = cities.filter(city => city.id === id);
    return citySelected[0].name;
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>Agregar o actualizar votante</Item>
        </Grid>
        {error &&
          <Grid item xs={12}>
            <ItemError>Todos los campos deben ser ingresados</ItemError>
          </Grid>
        }
        <Grid item xs={6}>
          <TextField value={name} onChange={(event) => setName(event.target.value)} fullWidth label="Nombre completo" color="primary" focused />
        </Grid>
        <Grid item xs={3}>
          <Select data={documentType} value={docType} handleChange={(event) => setDocType(event.target.value)} label='Tipo de documento' idEdit={idEdit} />
        </Grid>
        <Grid item xs={3}>
          <TextField value={documentNumber} onChange={(event) => setDocumentNumber(event.target.value)} label="No. documento" color="primary" />
        </Grid>
        <Grid item xs={4}>
          <Select data={countries} value={country} handleChange={(event) => setCountry(event.target.value)} label='Pais' idEdit={idEdit} />
        </Grid>
        <Grid item xs={4}>
         <Select data={depList} value={dep} handleChange={(event) => setDep(event.target.value)} label='Departamento' idEdit={idEdit} />
        </Grid>
        <Grid item xs={4}>
          <Select data={cityList} value={city} handleChange={(event) => setCity(event.target.value)} label='Ciudad' idEdit={idEdit} />
        </Grid>
        <Grid item xs={3}>
          <TextField value={phone1} onChange={(event) => setPhone1(event.target.value)} label="Teléfono" color="primary" />
        </Grid>
        <Grid item xs={3}>
          <TextField value={phone2} onChange={(event) => setPhone2(event.target.value)} label="Celular" color="primary" />
        </Grid>
        <Grid item xs={2}>
          <Button text='Guardar' variant='contained' onClick={handleSave} />
        </Grid>
        <Grid item xs={2}>
          <Button text='Cancelar' variant='contained' onClick={handleOpen} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
