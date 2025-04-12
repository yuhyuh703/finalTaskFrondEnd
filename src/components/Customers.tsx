import {useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial, ICellRendererParams } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Customer } from '../types'; // Customer type
import AddCustomer from './AddCustomer';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import AddTrainings from './AddTranings';


ModuleRegistry.registerModules([AllCommunityModule]);


const Customers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [showAddTraining, setShowAddTraining] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [open, setOpen] = useState(false);
    const [columnDefs] = useState<ColDef<Customer>[]>([
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true, flex: 1, editable: true},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, flex: 1, editable: true},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true, flex: 1, editable: true},
        {field: 'postcode', headerName: 'Postcode', sortable: true, filter: true, flex: 1, editable: true},
        {field: 'city', headerName: 'City', sortable: true, filter: true, flex: 1, editable: true},
        {field: 'phone', headerName: 'Phone', sortable: true, filter: true, flex: 1, editable: true},
        {field: 'email', headerName: 'Email', sortable: true, filter: true, flex: 1, editable: true},
        {
            width: 130,
            cellRenderer: (params: ICellRendererParams) => 
                <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => {handelDelete(params), console.log(params.data)}}
                >Delete
                </Button>

        },
        {
            width: 120,
            cellRenderer: (params: ICellRendererParams) => 
                <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {handleAddTraning(params)}}
                >Add Training
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
        if (window.confirm("Are you sure?")) {
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

    }

    const handleUpdate = (params: any) => {
        fetch(params.data._links.customer.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data)
            
        })
        .then(response => {
            if(!response.ok)
                throw new Error('Failed to fetch');
            return response.json();
        })
        .then(fetchCustomer)
        .catch(error => {
            console.error(error);
        })
    }

    const handleAddTraning = (params: any) => {
        setSelectedCustomer(params.data);
        setShowAddTraining(true);
    }


    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AddCustomer fetchCustomer={fetchCustomer}/>
            {showAddTraining && selectedCustomer && (
                <AddTrainings 
                    customer={selectedCustomer} 
                    fetchCustomer={fetchCustomer}
                    onClose={() => setShowAddTraining(false)} // pass this to close dialog
                />
            )}
            <div style={{ flex: 1 }}>
                <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                theme={themeMaterial}
                onCellValueChanged={event => handleUpdate(event)}
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