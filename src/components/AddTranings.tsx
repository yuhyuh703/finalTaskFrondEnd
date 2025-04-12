import { useState } from "react";
import {Training}  from "../types";
import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from "@mui/material"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const AddTrainings = (props: any) => {
    console.log('addtrainings');
    console.log(props);

    const [training, setTraining] = useState<Training>({} as Training);
    const { customer, fetchCustomer, onClose } = props;

    const handleSave = () => {
        console.log('customer in addtrainings', customer);
        training.customer = customer._links.customer.href;;
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(training)
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
        .then(() => {fetchCustomer(), onClose()})


        
    }

    return(
        <div>
            <Dialog open={true} onClose={onClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="Activity"
                    label="Activity"
                    value={training.activity}
                    onChange={(event) => setTraining({...training, activity: event.target.value})}
                    type="text"
                    fullWidth
                    variant="standard"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            label="Training Date & Time"
                            value={training.date}
                            onChange={(newValue) => setTraining({...training, date: newValue as Dayjs})}
                        />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="Duration"
                    label="Duration"
                    value={training.duration}
                    onChange={(event) => setTraining({...training, duration: event.target.value})}
                    type="number"
                    fullWidth
                    variant="standard"
                    />
                     
                     </DialogContent>
                        <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
            </Dialog>

        </div>
    )


}


export default AddTrainings;