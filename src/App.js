import './App.css';
import AppBar from './components/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './material.styles';
import Container from '@mui/material/Container';
import DocumentRegister from './pages/DocumentRegister';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const handleSearchChanged = (value) => {
    const votersTemp = JSON.parse(localStorage.getItem('votersTemp'));
    let voters = votersTemp;
    if(!votersTemp){
      voters = JSON.parse(localStorage.getItem('voters'));
      localStorage.setItem('votersTemp', JSON.stringify(voters));
    }
    const lowerValue = value.toLowerCase();
    if(!voters)return;
    const newData = voters.filter(voter =>
      Object.values(voter).some(item => 
          String(item).toLowerCase().includes(lowerValue) 
      ));
    setData(newData);
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <AppBar onChange={handleSearchChanged} />
      <Container>
        <DocumentRegister dataFromSearchButton={data} />
      </Container>
    </div>
    </ThemeProvider>
  );
}

export default App;
