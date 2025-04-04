import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from "@mui/material"
import { useState } from "react"
import { Customer } from "../types";

type addCustomerProps = {
    fetchCustomer: () => void
}

const AddCustomer = (prop: addCustomerProps) => {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customer>({} as Customer)

    const handleClose = () => {
        setOpen(false)
    }

    const AddCusomter = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(!response.ok)
                throw new Error('Failed to fetch');
            return response.json();
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred while adding the customer.');
        })
        .then(() => {prop.fetchCustomer(), handleClose()})
        
        
    }

    return (
        <div>
            <Button
            variant="outlined"
            color="primary"
            onClick={() => {
                setOpen(true)
            }}
            >
                Add Customer
            </Button>
            <Dialog open={open} onClose={() => {handleClose()}}>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="firstname"
                        label="Firstname"
                        value={customer.firstname}
                        onChange={event => setCustomer({...customer, firstname: event.target.value})}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="lastname"
                        label="Lastname"
                        value={customer.lastname}
                        onChange={event => setCustomer({...customer, lastname: event.target.value})}
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="streetaddress"
                        label="Street address"
                        value={customer.streetaddress}
                        onChange={event => setCustomer({...customer, streetaddress: event.target.value})}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="postcode"
                        label="Post code"
                        value={customer.postcode}
                        onChange={event => setCustomer({...customer, postcode: event.target.value})}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="city"
                        label="City"
                        value={customer.city}
                        onChange={event => setCustomer({...customer, city: event.target.value})}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="phone"
                        label="Phone"
                        value={customer.phone}
                        onChange={event => setCustomer({...customer, phone: event.target.value})}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="email"
                        label="Email"
                        value={customer.email}
                        onChange={event => setCustomer({...customer, email: event.target.value})}
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={AddCusomter}>Add</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}


export default AddCustomer