import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '../../components/Button';
import Table from '../../components/Table';
import TableDetail from '../../components/TableDetail';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import { ReactComponent as ExcelIcon } from '../../assets/excel.svg';
import initialData from '../../data/initialData';

const DocumentRegister = ({ dataFromSearchButton }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [nameDetail, setNameDetail] = useState(null);
  useEffect(()=>{
    const voters = localStorage.getItem('voters');
    if(!voters || voters.length === 0){
      localStorage.setItem('voters', JSON.stringify(initialData));
      localStorage.removeItem('votersTemp')
      setData(initialData);
    }else{
      localStorage.setItem('voters', voters);
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
    const voters = JSON.parse(localStorage.getItem('voters')) ?? [];
    const newVoters = voters.filter(voter => items.every(item => item !== voter.id))
    if(newVoters && newVoters.length === 0){
      localStorage.removeItem('voters')
      localStorage.removeItem('votersTemp')
    }else{
      localStorage.setItem('voters', JSON.stringify(newVoters))
      localStorage.removeItem('votersTemp')
    }
    setData(newVoters);
    setNameDetail(null);
  }

  const onSubmit = (data, idEdit) => {
    const voters = JSON.parse(localStorage.getItem('voters')) ?? [];
    if(idEdit){
      const newVoters = voters.filter(item => item.id !== idEdit);
      newVoters.push({id: newVoters.length === 0 ? 1 : newVoters.length + 1, ...data});
      newVoters.map((item, index) => item.id = index + 1);
      localStorage.setItem('voters', JSON.stringify(newVoters));
      setData(newVoters);
    } else {
      voters.push({id: voters.length === 0 ? 1 : voters.length + 1, ...data});
      voters.map((item, index) => item.id = index + 1);
      localStorage.setItem('voters', JSON.stringify(voters));
      setData(voters);
    }
    setOpen(false);
    setNameDetail(null);
  }

  const onEdit = (id) => {
    setIdEdit(id);
    setOpen(true);
    setNameDetail(null);
  }

  const onDetail = (name) => {
    setNameDetail(name);
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button text='Nuevo votante' variant='contained' 
          onClick={() => {
            setIdEdit(null);
            setOpen(true);
          }} />
        </Grid>
        <Grid item xs={4}>
          <ExcelIcon onClick={()=>alert('ok')} />
        </Grid>
        <Grid item xs={12}>
          <Table data={data} onDelete={handleDelete} onEdit={onEdit} onDetail={onDetail} />
        </Grid>
        <Grid item xs={12}>
          {nameDetail && 
          <TableDetail name={nameDetail} />}
        </Grid>
      </Grid>
      <Modal open={open}><Form handleOpen={() => setOpen(false)} onSubmit={onSubmit} idEdit={idEdit} data={data} /></Modal>
    </Box>
  );
}

export default DocumentRegister;
