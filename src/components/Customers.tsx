import { useState, useEffect, useRef } from 'react';
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import type { AgGridReact as AgGridReactType } from 'ag-grid-react';
import { Customer } from '../types';
import AddCustomer from './AddCustomer';
import AddTrainings from './AddTranings';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [open, setOpen] = useState(false);
  const gridRef = useRef<AgGridReactType<Customer>>(null);

  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: true, flex: 1, editable: true },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, flex: 1, editable: true },
    { field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true, flex: 1, editable: true },
    { field: 'postcode', headerName: 'Postcode', sortable: true, filter: true, flex: 1, editable: true },
    { field: 'city', headerName: 'City', sortable: true, filter: true, flex: 1, editable: true },
    { field: 'phone', headerName: 'Phone', sortable: true, filter: true, flex: 1, editable: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true, flex: 1, editable: true },
    {
      cellRenderer: (params: ICellRendererParams) => (
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => handleDelete(params)}
        >
          Delete
        </Button>
      ),
    },
    {
      cellRenderer: (params: ICellRendererParams) => (
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => handleAddTraining(params)}
        >
          Add Training
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  const handleDelete = (params: ICellRendererParams) => {
    if (!window.confirm('Are you sure?')) return;

    fetch(params.data._links.customer.href, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete');
        return res;
      })
      .then(() => {
        fetchCustomers();
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = (params: any) => {
    fetch(params.data._links.customer.href, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params.data),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update');
        return res;
      })
      .then(fetchCustomers)
      .catch((err) => console.error(err));
  };

  const handleAddTraining = (params: any) => {
    setSelectedCustomer(params.data);
    setShowAddTraining(true);
  };

  return (
    <div style={{ width: '95vw', height: '90vh', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <AddCustomer fetchCustomer={fetchCustomers} />
        <Button
          variant= 'outlined'
          onClick={() =>
            gridRef.current?.api.exportDataAsCsv({
              fileName: 'customers.csv',
              columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'phone', 'email'],
            })
          }
          style={{ alignSelf: 'flex-start' }}
          color='primary'
        >
          Export Customers to CSV
        </Button>
      </div>

      {showAddTraining && selectedCustomer && (
        <AddTrainings
          customer={selectedCustomer}
          fetchCustomer={fetchCustomers}
          onClose={() => setShowAddTraining(false)}
        />
      )}

      <div style={{ flex: 1 }}>
        <AgGridReact
          ref={gridRef}
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          onCellValueChanged={handleUpdate}
        />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Customer deleted"
      />
    </div>
  );
};

export default Customers;
