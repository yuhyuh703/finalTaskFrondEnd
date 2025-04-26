// routes.tsx
import App from "./App";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import Calendar from "./components/Calendar"; 
import Statistics from "./components/Statistics";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Customers />, 
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "trainings",
        element: <Trainings />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },
];

export default routes;