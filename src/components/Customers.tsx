import {useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { Customer } from '../types'; // Customer type
import AddCustomer from './AddCustomer';


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const Customers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [columnDefs] = useState<ColDef<Customer>[]>([
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true, flex: 1},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, flex: 1},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true, flex: 1},
        {field: 'postcode', headerName: 'Postcode', sortable: true, filter: true, flex: 1},
        {field: 'city', headerName: 'City', sortable: true, filter: true, flex: 1},
        {field: 'phone', headerName: 'Phone', sortable: true, filter: true, flex: 1},
        {field: 'email', headerName: 'Email', sortable: true, filter: true, flex: 1}
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
        </div>
    )
}

export default Customers;