import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrderForm({ onOrderSubmit }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    isim: '',
    boyut: '', 
    hamur: '', 
    malzemeler: [], 
    notlar: '', 
    adet: 1
  });
  const [errors, setErrors] = useState({});

  const malzemelerListesi = [
    'Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara', 'Soğan', 'Domates', 
    'Mısır', 'Sucuk', 'Jalapeno', 'Biber', 'Sarımsak', 'Ananas', 'Mantar'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.isim || formData.isim.length < 3) newErrors.isim = 'İsim en az 3 karakter olmalı';
    if (!formData.boyut) newErrors.boyut = 'Boyut seçmelisiniz';
    if (!formData.hamur) newErrors.hamur = 'Hamur kalınlığı seçmelisiniz';
    if (formData.malzemeler.length < 4) newErrors.malzemeler = 'En az 4 malzeme seçmelisiniz';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updated = checked 
        ? [...formData.malzemeler, value]
        : formData.malzemeler.filter(m => m !== value);
      if (updated.length <= 10) setFormData({ ...formData, malzemeler: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { 
      setErrors(validationErrors); 
      return; 
    }

    setIsSubmitting(true);
    
    try {
      let response;
      try {
        response = await axios.post(
          'https://reqres.in/api/pizza', 
          {
            isim: formData.isim,
            boyut: formData.boyut,
            hamur: formData.hamur,
            malzemeler: formData.malzemeler,
            notlar: formData.notlar,
            adet: formData.adet
          },
          {
            headers: {
              'x-api-key': 'reqres-free-v1',
              'Content-Type': 'application/json'
            }
          }
        );
      } catch (apiError) {
        console.log('API hatası, mock veri kullanılıyor:', apiError.message);
        response = {
          data: {
            id: Math.floor(Math.random() * 10000),
            isim: formData.isim,
            boyut: formData.boyut,
            hamur: formData.hamur,
            malzemeler: formData.malzemeler,
            notlar: formData.notlar,
            adet: formData.adet,
            createdAt: new Date().toISOString()
          }
        };
      }
      
      console.log('Sipariş Yanıtı:', response.data);
      
      onOrderSubmit(response.data);
      
      setFormData({
        isim: '',
        boyut: '', 
        hamur: '', 
        malzemeler: [], 
        notlar: '', 
        adet: 1
      });
      setErrors({});
      
      navigate('/onay');
    } catch (err) {
      console.error('Hata:', err);
      setErrors({ 
        ...errors, 
        submit: 'İnternet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.' 
      });
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const basePrice = 85.50;
  const selectionsPrice = formData.malzemeler.length * 5;
  const totalPrice = (basePrice + selectionsPrice) * formData.adet;

  const isFormValid = formData.isim.length >= 3 && 
                      formData.boyut && 
                      formData.hamur && 
                      formData.malzemeler.length >= 4;

  return (
    <div className="order-page">
      <div className="pizza-header">
        <h1>Position Absolute Acı Pizza</h1>
        <div className="pizza-meta">
          <span className="price">{basePrice.toFixed(2)}₺</span>
          <div className="meta-info">
            <span className="rating">4.9</span>
            <span className="reviews">(200)</span>
          </div>
        </div>
        <p className="pizza-description">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. 
          Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında 
          yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir
          yemektir. Küçük bir pizzaya bazen pizzetta denir. 
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Boyut Seç <span className="required">*</span></label>
            <div className="radio-group">
              {['Küçük', 'Orta', 'Büyük'].map(b => (
                <label key={b} className="radio-option">
  <input 
    type="radio" 
    name="boyut" 
    value={b} 
    onChange={handleChange}
    checked={formData.boyut === b}
  />
  <span>{b}</span>
</label>
              ))}
            </div>
            {errors.boyut && <p className="error-message">{errors.boyut}</p>}
          </div>

          <div className="form-group">
            <label>Hamur Seç <span className="required">*</span></label>
            <select name="hamur" onChange={handleChange} value={formData.hamur}>
              <option value="">Hamur Kalınlığı</option>
              <option value="İnce">İnce</option>
              <option value="Orta">Orta</option>
              <option value="Kalın">Kalın</option>
            </select>
            {errors.hamur && <p className="error-message">{errors.hamur}</p>}
          </div>
        </div>

        <div className="checkbox-section">
          <h3>Ek Malzemeler</h3>
          <p className="checkbox-hint">En fazla 10 malzeme seçebilirsiniz. 5₺</p>
          <div className="checkbox-grid">
            {malzemelerListesi.map(m => (
              <label key={m} className="checkbox-option">
  <input 
    type="checkbox" 
    value={m} 
    onChange={handleChange} 
    checked={formData.malzemeler.includes(m)} 
  />
  <span>{m}</span>
</label>
            ))}
          </div>
          {errors.malzemeler && <p className="error-message">{errors.malzemeler}</p>}
        </div>

        <div className="form-group full-width">
          <label>İsim <span className="required">*</span></label>
          <input 
            type="text"
            name="isim"
            value={formData.isim}
            onChange={handleChange}
            placeholder="İsminizi giriniz"
            className="large-textarea"
          />
          {errors.isim && <p className="error-message">{errors.isim}</p>}
        </div>

        <div className="form-group full-width">
          <label>Sipariş Notu</label>
          <textarea 
            name="notlar" 
            value={formData.notlar} 
            onChange={handleChange} 
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            className="large-textarea"
          />
        </div>

        <hr className="form-divider" />

        <div className="bottom-row">
          <div className="quantity-container">
            <div className="quantity-selector">
              <button type="button" onClick={() => setFormData({...formData, adet: Math.max(1, formData.adet - 1)})}>-</button>
              <span>{formData.adet}</span>
              <button type="button" onClick={() => setFormData({...formData, adet: formData.adet + 1})}>+</button>
            </div>
          </div>

          <div className="order-summary-container">
            <div className="order-summary-box">
              <h4>Sipariş Toplamı</h4>
              <div className="summary-row"><span>Seçimler</span><span>{selectionsPrice.toFixed(2)}₺</span></div>
              <div className="summary-row total"><span>Toplam</span><span>{totalPrice.toFixed(2)}₺</span></div>
              {errors.submit && <p className="error-message submit-error">{errors.submit}</p>}
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={isSubmitting || !isFormValid}
              >
                {isSubmitting ? 'GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;