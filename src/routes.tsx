import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import Customers from "./components/Customers.tsx";
import Trainings from "./components/Trainings.tsx";
import Calendar from "./components/Calendar.tsx";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />, // App is the layout component
    children: [
      { path: 'customers', element: <Customers /> },
      { path: 'trainings', element: <Trainings /> },
      {path: 'calendar', element: <Calendar /> },
      { path: '', element: <Customers /> } // Default route
    ]
  }
];

export default routes;