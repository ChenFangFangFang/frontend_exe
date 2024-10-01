import React from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Addcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handelInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }
    const addCar = () => {
        props.addCar(car)
        handleClose()
    }
    return (
        <div>
            <Button style={{ margin: 10 }} variant="outlined" onClick={handleClickOpen}>
                Add Car
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => handelInputChange(e)}
                        label="Brand"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={e => handelInputChange(e)}
                        label="Model"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={e => handelInputChange(e)}
                        label="Color"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => handelInputChange(e)}
                        label="Fuel"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="year"
                        type="number"
                        value={car.year}
                        onChange={e => handelInputChange(e)}
                        label="Year"
                        fullWidth
                        variant="standard"
                        inputProps={{ min: 1900, max: new Date().getFullYear() }}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="price"
                        type="number"
                        value={car.price}
                        onChange={e => handelInputChange(e)}
                        label="Price"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
Addcar.propTypes = {
    addCar: PropTypes.func.isRequired
}