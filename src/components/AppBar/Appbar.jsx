import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './material.styles';

const SearchAppBar = ({ onChange }) => {
  const [valueSearch, setValueSearch] = React.useState('');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=> alert('Esta funcinalidad no está implementada')}
          >
            <MenuIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              id='search'
              value={valueSearch}
              placeholder="Escribe para buscar..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event)=>{
                setValueSearch(event.target.value)
                onChange(event.target.value)
              }}
            />
          </Search>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Inscripción de cédulas para elecciones 2022
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;
