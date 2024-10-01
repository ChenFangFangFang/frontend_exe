import React from "react";
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    })
    const handleClickOpen = () => {
        setCar({ brand: props.car.brand, model: props.car.model, color: props.car.color, fuel: props.car.fuel, year: props.car.modelYear, price: props.car.price })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handelInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }
    const updateCar = () => {
        props.updateCar(car, props.car._links.car.href)
        handleClose()
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
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
                        name="modelYear"
                        value={car.year}
                        onChange={e => handelInputChange(e)}
                        label="Year"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={e => handelInputChange(e)}
                        label="Price"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

EditCar.propTypes = {
    car: PropTypes.shape({
        brand: PropTypes.string,
        model: PropTypes.string,
        color: PropTypes.string,
        fuel: PropTypes.string,
        modelYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        _links: PropTypes.shape({
            car: PropTypes.shape({
                href: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }).isRequired,
    updateCar: PropTypes.func.isRequired
};