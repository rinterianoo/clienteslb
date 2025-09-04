import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/public/HomePage";
import PedidosPage from "../pages/public/PedidosPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "pedidos", element: <PedidosPage /> },
    ],
  },
]);

export default router;
