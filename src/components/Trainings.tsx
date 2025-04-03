import {useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Training } from '../types'; // Training type
import dayjs from 'dayjs'

ModuleRegistry.registerModules([AllCommunityModule]);

const Trainings = () => {

    const [trainings, setTrainings] = useState<Training[]>([]);
    const [columnDefs] = useState<ColDef<Training>[]>([
        {field: 'activity', headerName: 'Activity', sortable: true, filter: true, flex: 1},
        {field: 'date', headerName: 'Date', sortable: true, filter: true, flex: 1},
        {field: 'duration', headerName: 'Duration', sortable: true, filter: true, flex: 1},
        {field: 'customer.firstname', headerName: 'Customer', sortable: true, filter: true, flex: 1},
      
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
            
        })
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
            </div>
        </div>
    );
}

export default Trainings;