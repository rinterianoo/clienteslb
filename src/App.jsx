
import Navbar from './components/shared/Navbar';
import TiendaSelectorModal from './components/shared/TiendaSelectorModal';
import Cart from './components/public/Cart';
import { Outlet } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { PedidoProvider } from './context/PedidoContext';
import { CartProvider } from './context/CartContext';
import { TiendaProvider } from './context/TiendaContext';

export default function App() {
  console.log('🚀 App - Componente renderizándose');
  
  return (
    <TiendaProvider>
      {/* Modal de selección de tienda - PRIMERA PRIORIDAD */}
      <TiendaSelectorModal />
      
      <MenuProvider>
        <PedidoProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Cart />
              <main className="relative">
                <Outlet />
              </main>
            </div>
          </CartProvider>
        </PedidoProvider>
      </MenuProvider>
    </TiendaProvider>
  );
}
