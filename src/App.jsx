import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import OrderForm from './components/OrderForm';
import OrderSuccess from './components/OrderSuccess';

function App() {
  const [orderResponse, setOrderResponse] = useState(null);
  const location = useLocation();

  const showHeader = location.pathname !== '/';
  const showFooter = location.pathname === '/' || location.pathname === '/onay';

  return (
    <div className="app-wrapper">
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/siparis" element={<OrderForm onOrderSubmit={setOrderResponse} />} />
          <Route path="/onay" element={<OrderSuccess orderData={orderResponse} />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;