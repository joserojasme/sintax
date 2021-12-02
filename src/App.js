import './App.css';
import AppBar from './components/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './material.styles';
import Container from '@mui/material/Container';
import DocumentRegister from './pages/DocumentRegister';
import { useEffect } from 'react';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <AppBar />
      <Container>
        <DocumentRegister />
      </Container>
    </div>
    </ThemeProvider>
  );
}

export default App;
