import { useState, useEffect, useCallback } from 'react';
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
  ICellRendererParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Training } from '../types';
import dayjs from 'dayjs';
import { Button, Snackbar } from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

const Trainings = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [open, setOpen] = useState(false);

  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: 'activity', headerName: 'Activity', sortable: true, filter: true, flex: 1 },
    { field: 'date', headerName: 'Date', sortable: true, filter: true, flex: 1 },
    { field: 'duration', headerName: 'Duration', sortable: true, filter: true, flex: 1 },
    { field: 'customer.firstname', headerName: 'Customer', sortable: true, filter: true, flex: 1 },
    {
      width: 130,
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
  ]);

  // Fetch trainings from API
  const fetchTrainings = useCallback(async () => {
    try {
      const response = await fetch(
        'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings'
      );
      if (!response.ok) throw new Error('Failed to fetch trainings');

      const data = await response.json();

      const formatted = data.map((training: any) => ({
        ...training,
        date: dayjs(training.date).format('YYYY-MM-DD HH:mm:ss'),
      }));

      setTrainings(formatted);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  // Handle delete action
  const handleDelete = async (params: ICellRendererParams) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const id = params.data.id;
      const response = await fetch(
        `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`,
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error('Failed to delete training');

      await fetchTrainings(); // Refresh list after deletion
      setOpen(true); // Show snackbar
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };

  return (
    <div style={{ width: '95vw', height: '90vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1}}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          
        />
        
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Training deleted"
        />
      </div>
    </div>
  );
};

export default Trainings;
