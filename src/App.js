import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './material.styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <AppBar />
      <header className="App-header">
        
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
