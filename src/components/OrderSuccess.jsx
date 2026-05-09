import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess({ orderData }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const basePrice = 85.50;
  const selectionsPrice = orderData.malzemeler.length * 5;
  const totalPrice = (basePrice + selectionsPrice) * (orderData.adet || 1);

  return (
    <div className="success-page">
      <div className="success-content">
        <h2 className="success-brand">Teknolojik Yemekler</h2>
        
        <p className="success-subtitle">lezzetin yolda</p>
        <h1 className="success-title">SİPARİŞ ALINDI</h1>
        
        <hr className="success-divider" />
        
        <div className="success-details">
          <h3 className="success-pizza-name">Position Absolute Acı Pizza</h3>
          
          <div className="details-list">
            <div className="detail-row">
              <span className="detail-label">Boyut:</span>
              <span className="detail-value">{orderData.boyut}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Hamur:</span>
              <span className="detail-value">{orderData.hamur}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Ek Malzemeler:</span>
              <span className="detail-value">{orderData.malzemeler.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="success-summary-card">
          <h4>Sipariş Toplamı</h4>
          <div className="summary-line">
            <span>Seçimler</span>
            <span>{selectionsPrice.toFixed(2)}₺</span>
          </div>
          <div className="summary-line total">
            <span>Toplam</span>
            <span>{totalPrice.toFixed(2)}₺</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;