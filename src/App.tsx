import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserList from "./pages/users/list";
import UserUpdate from "./pages/users/update";
import UserCreate from "./pages/users/create";
import UserView from "./pages/users/view";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/update/:id",
    element: <UserUpdate />,
  },
  {
    path: "/new",
    element: <UserCreate />,
  },
  {
    path: "/:id",
    element: <UserView />,
  },
]);
const queryClient = new QueryClient();
const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
