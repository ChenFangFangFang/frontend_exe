import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";
import { useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
//Import AG-Grid component and stylesheets

function TodoList() {
    //declare states
    const [todo, setTodo] = useState({description:"",duedate:"",priority:""});
    const [todos, setTodos] = useState([]);//array [], hold all todos user input, objects stored here
    const gridRef = useRef()

    //use to define data grid columns
    const [columnDefs, setColumnDefs] = useState([
      //an array of column definition objects
      //field defines what data is shown in a column
      // the name should be the same as 
      //useState({description:"",duedate:"",priority:""});
      {field:'description', sortable:false,filter:true},      
      {field:'priority',filter:true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} },
      {field:'duedate',filter:true}
    ])

    const addTodo = () => {
        if (!todo.description){
          alert(`The description should not be empty`)
        }
        else{
        setTodos([todo, ...todos])//depends the order
        //setTodos([...todos, desc]) is also ok, but the order is converse
        setTodo({description:"", duedate:"",priority:""})//clean the desc after click Add
        }    
    }

    const handleDelete = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((todo, index) => 
          index != gridRef.current.getSelectedNodes()[0].id))
        //returns an array of selected rows. here is single
      }
      else {
        alert('Select a row first!');
      }
    }
    // const handleDelete = (row) => {
    // setTodos(todos.filter((todo, index) => row !=index))
    // }

    const handleDateChange = (date) => {
      const formattedDate = date ? date.toISOString().split('T')[0] : ""; 
      setTodo({ ...todo, duedate: formattedDate });
  };

    return(
      <>
      {/* mt={2} 是调整 My todo list 和下面的距离 */}
      <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
      <TextField
        label="Description" 
        variant="outlined"
        value={todo.description}
        onChange={event => setTodo({...todo, description: event.target.value})}
      />
      <TextField
        label ="Priority" 
        variant="outlined"
        value={todo.priority}
        onChange={event => setTodo({...todo, priority: event.target.value})}
        />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              //value={dayjs(todo.duedate)}
              value={todo.duedate ? dayjs(todo.duedate) : null} 
              onChange={handleDateChange}
              slots={{
                textField: (params) => <TextField {...params} variant="outlined" />
            }}
            />
        </LocalizationProvider>

      <Button variant="contained" onClick={addTodo}>Add</Button>
      {/* default variant is Text, text, outlined, contained */}
      <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
      </Stack>
      <div className="ag-theme-material" style={{width: 700, height: 500}}>
      {/* render AG Grid */}
      {/* row data: where row data comes from and the value should be an array */}
      {/* to render it (below) */}
      <AgGridReact 
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api }
        rowData={todos}
        columnDefs={columnDefs}
        rowSelection="single"
        // enable row selection and set mode to single selection 单选行模式
      />
      {/* 
      <TodoTable todos={todos} handleDelete={handleDelete} />//pass function as props
      */}
    </div> 
      </>
    );
  }
  
  export default TodoList;