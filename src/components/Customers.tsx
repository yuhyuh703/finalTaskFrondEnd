import {useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial, ICellRendererParams } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Customer } from '../types'; // Customer type
import AddCustomer from './AddCustomer';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const Customers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [open, setOpen] = useState(false);
    const [columnDefs] = useState<ColDef<Customer>[]>([
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true, flex: 1},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, flex: 1},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true, flex: 1},
        {field: 'postcode', headerName: 'Postcode', sortable: true, filter: true, flex: 1},
        {field: 'city', headerName: 'City', sortable: true, filter: true, flex: 1},
        {field: 'phone', headerName: 'Phone', sortable: true, filter: true, flex: 1},
        {field: 'email', headerName: 'Email', sortable: true, filter: true, flex: 1},
        {
            width: 120,
            cellRenderer: (params: ICellRendererParams) => 
                <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => {handelDelete(params), console.log(params.data)}}
                >Delete
                </Button>
            

        }
    ])


    useEffect(() => {
        fetchCustomer();
    }, []);

    const fetchCustomer = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
    .then(response => {
        if(!response.ok)
            throw new Error('Failed to fetch');
        return response.json();
    })
    .then(data => {
        setCustomers(data._embedded.customers);
        console.log(data._embedded.customers);
    })
    .catch(error => {
        console.error(error);
    });
    }

    const handelDelete = (params: ICellRendererParams) => {
        fetch(params.data._links.customer.href, {
            method: 'DELETE'
        })
        .then(response => {
            if(!response.ok)
                throw new Error('Failed to fetch');
            return response.json();
        })
        .then(fetchCustomer)
        .then(() => setOpen(true))
        .catch(error => {
            console.error(error);
        });

    }


    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AddCustomer fetchCustomer={fetchCustomer}/>
            <div style={{ flex: 1 }}>
                <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                theme={themeMaterial}
                
                />
            </div>
            <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Customer deleted"
            ></Snackbar>
        </div>
    )
}

export default Customers;