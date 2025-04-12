import {useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial,ICellRendererParams } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Training } from '../types'; // Training type
import dayjs from 'dayjs'
import { Button, Snackbar } from '@mui/material';



ModuleRegistry.registerModules([AllCommunityModule]);

const Trainings = () => {

    const [trainings, setTrainings] = useState<Training[]>([]);
    const [open, setOpen] = useState(false);
    const [columnDefs] = useState<ColDef<Training>[]>([
        {field: 'activity', headerName: 'Activity', sortable: true, filter: true, flex: 1},
        {field: 'date', headerName: 'Date', sortable: true, filter: true, flex: 1},
        {field: 'duration', headerName: 'Duration', sortable: true, filter: true, flex: 1},
        {field: 'customer.firstname', headerName: 'Customer', sortable: true, filter: true, flex: 1},
        {
            width: 100,
            cellRenderer: (params: ICellRendererParams) => 
                <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => {handleDelete(params)}}
                >
                Delete
                </Button>

        }
      
    ])

    useEffect(() => {
        fetchTrainings();
       
    }, []);

    const fetchTrainings = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
        .then(response => {
            if(!response.ok)
                throw new Error('Failed to fetch');
            return response.json();
        })
        .then(data => {
            data.forEach((training: any) => {
                training.date = dayjs(training.date).format('YYYY-MM-DD HH:mm:ss');
            });
            setTrainings(data);
            console.log('trainings', data);
            
        })
    }



    const handleDelete = (params: ICellRendererParams) => {
        if (window.confirm("Are you sure?")) {

            const id = params.data.id;
            fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if(!response.ok)
                    throw new Error('Failed to fetch');
                return response.json();
            })
            .then(fetchTrainings)
            .then(() => setOpen(true))
            .catch(error => {
                console.error(error);
            });
        }
       

    }

    
    

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
               <AgGridReact
               rowData={trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                theme={themeMaterial}
               ></AgGridReact>
               <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Customer deleted"
            ></Snackbar>
            </div>
        </div>
    );
}

export default Trainings;