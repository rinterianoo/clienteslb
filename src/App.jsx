
import Navbar from './components/shared/Navbar';
import { Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { PedidoProvider } from './context/PedidoContext';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <MenuProvider>
      <PedidoProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Outlet />
            </main>
          </div>
        </CartProvider>
      </PedidoProvider>
    </MenuProvider>
  );
}
