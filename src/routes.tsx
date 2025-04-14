import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import Customers from "./components/Customers.tsx";
import Trainings from "./components/Trainings.tsx";
import Calendar from "./components/Calendar.tsx";
import Statistics from "./components/Statistics.tsx";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Customers /> }, // Default route
      { path: 'customers', element: <Customers /> },
      { path: 'trainings', element: <Trainings /> },
      {path: 'calendar', element: <Calendar /> },
      {path: 'statistics', element: <Statistics /> }
     
    ]
  }
];

export default routes;