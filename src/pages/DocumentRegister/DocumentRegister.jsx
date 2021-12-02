import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import { ReactComponent as ExcelIcon } from '../../assets/excel.svg';
import initialData from '../../data/initialData';

const DocumentRegister = ({ dataFromSearchButton }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    const voters = localStorage.getItem('voters');
    if(!voters || voters.length === 0){
      localStorage.setItem('voters', JSON.stringify(initialData));
      localStorage.removeItem('votersTemp')
      setData(initialData);
    }else{
      localStorage.setItem('voters', JSON.stringify(initialData));
      localStorage.removeItem('votersTemp')
      setData(JSON.parse(voters));
    }
  }, []);

  useEffect(()=>{
    if(dataFromSearchButton !== null){
      localStorage.setItem('voters', JSON.stringify(dataFromSearchButton));
      setData(dataFromSearchButton);
    }
  }, [dataFromSearchButton])

  const handleDelete = (items) => {
    const voters = JSON.parse(localStorage.getItem('voters'));
    const newVoters = voters.filter(voter => items.every(item => item !== voter.id))
    if(newVoters.length === 0){
      localStorage.removeItem('voters')
      localStorage.removeItem('votersTemp')
    }else{
      localStorage.setItem('voters', JSON.stringify(newVoters))
      localStorage.removeItem('votersTemp')
    }
    setData(newVoters);
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button text='Nuevo votante' variant='contained' onClick={() => setOpen(true)} />
        </Grid>
        <Grid item xs={4}>
          <ExcelIcon onClick={()=>alert('ok')} />
        </Grid>
        <Grid item xs={12}>
          <Table data={data} onDelete={handleDelete} />
        </Grid>
      </Grid>
      <Modal open={open}><Form handleOpen={() => setOpen(false)} /></Modal>
    </Box>
  );
}

export default DocumentRegister;
