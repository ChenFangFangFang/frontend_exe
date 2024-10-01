import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Addcar from "./Addcar";
import EditCar from "./EditCar";

export default function Carlist() {
    const [cars, setCars] = useState([])
    const [deletedCar, setDeletedCar] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => fetchData(), [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false); // 关闭 Snackbar
    }
    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(error => console.log('Error fetching data:', error))
    }
    const deleteCar = (link) => {
        // console.log(link)
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(() => {
                    fetchData()
                    setDeletedCar(`${cars.brand} ${cars.model}`)
                    setOpen(true)
                })
                .catch(error => console.log('Error fetching data:', error))
        }

    }
    const addCar = (car) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)

        })
            .then(res => fetchData())
            .catch(error => console.log('Error fetching data:', error))
    }
    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)

        })
            .then(res => fetchData())
            .catch(error => console.log('Error fetching data:', error))
    }
    const [columnDefs, setColumnDefs] = useState([
        { field: 'brand', filter: true, floatingFilter: true },
        { field: 'model', filter: true, floatingFilter: true },
        { field: 'color', filter: true, floatingFilter: true },
        { field: 'fuel', filter: true, floatingFilter: true },
        { field: 'modelYear', filter: true, floatingFilter: true },
        { field: 'price', filter: true, floatingFilter: true },
        {
            headerName: 'Edit',
            sortable: false,
            cellRenderer: row => <EditCar updateCar={updateCar} car={row.data} />,
            maxWidth: 100
        },
        {
            field: '_links.self.href',
            headerName: 'Delete',
            sortable: false,
            cellRenderer: row =>
                <Button variant="outlined" color="secondary" size="small"
                    onClick={() => deleteCar(row.value)}>Delete</Button>,
            maxWidth: 100
        }

    ])
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >Carshop</Typography>
                </Toolbar>
            </AppBar>
            <Addcar addCar={addCar} />

            <div className="ag-theme-material" style={{ width: " 100 %", height: 600 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50]}
                    domLayout='autoHeight'
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100
                    }}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={`Car ${deletedCar} deleted`}
                action={
                    <Button color="secondary" size="small" onClick={handleClose}>
                        UNDO
                    </Button>
                }
            />
        </div>
    )

}