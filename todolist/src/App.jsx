
import './App.css'
// import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import TodoList from './compomemt/Todolist.jsx'

// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';

import {Link, Outlet} from 'react-router-dom'

function App() {
  return (
    // <Container maxWidth="xl">
    //   <CssBaseline/>
    //   <AppBar position='static'>
    //     <Toolbar>
    //       <Typography variant='h6'>My Todo List</Typography>
    //     </Toolbar>

    //   </AppBar>
    //   <TodoList/>
    // </Container>
    <div className='App'>
        <nav>
        <Link to={"/"}>HOME</Link>
        <Link to={"/todos"}>TODOS</Link>
      </nav>
    <Outlet />
    </div>
  )
}

export default App
