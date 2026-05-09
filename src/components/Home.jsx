import { Link } from 'react-router-dom';

function Home() {
  const categories = [
    { icon: '/images/iteration-2-images/icons/1.svg', name: 'YENİ! Kore' },
    { icon: '/images/iteration-2-images/icons/2.svg', name: 'Pizza' },
    { icon: '/images/iteration-2-images/icons/3.svg', name: 'Burger' },
    { icon: '/images/iteration-2-images/icons/4.svg', name: 'Kızartmalar' },
    { icon: '/images/iteration-2-images/icons/5.svg', name: 'Fast food' },
    { icon: '/images/iteration-2-images/icons/6.svg', name: 'Gazlı İçecek' },
  ];

  const menuFilters = [
    { icon: '/images/iteration-2-images/icons/1.svg', name: 'Ramen', active: false },
    { icon: '/images/iteration-2-images/icons/2.svg', name: 'Pizza', active: true },
    { icon: '/images/iteration-2-images/icons/3.svg', name: 'Burger', active: false },
    { icon: '/images/iteration-2-images/icons/4.svg', name: 'French fries', active: false },
    { icon: '/images/iteration-2-images/icons/5.svg', name: 'Fast food', active: false },
    { icon: '/images/iteration-2-images/icons/6.svg', name: 'Soft drinks', active: false },
  ];

  const products = [
    {
      image: '/images/iteration-2-images/pictures/food-1.png',
      name: 'Terminal Pizza',
      rating: 4.9,
      reviews: 200,
      price: 60
    },
    {
      image: '/images/iteration-2-images/pictures/food-2.png',
      name: 'Position Absolute Acı Pizza',
      rating: 4.9,
      reviews: 200,
      price: 60
    },
    {
      image: '/images/iteration-2-images/pictures/food-3.png',
      name: 'useEffect Tavuklu Burger',
      rating: 4.9,
      reviews: 200,
      price: 60
    }
  ];

  return (
    <div className="home-page">
      {}
      <section className="hero-section">
        <div className="hero-content">
          <img 
            src="/images/iteration-1-images/logo.svg" 
            alt="Teknolojik Yemekler" 
            className="hero-logo"
          />
          <p className="hero-subtitle">fırsatı kaçırma</p>
          <h1 className="hero-title">
            KOD ACIKTIRIR<br />PİZZA, DOYURUR
          </h1>
          <Link to="/siparis" className="hero-button">
            ACIKTIM
          </Link>
        </div>
        <div className="hero-pizza">
          <img 
            src="/images/iteration-1-images/home-banner.png" 
            alt="Pizza" 
          />
        </div>
      </section>

      {}
      <section className="categories-section">
        <div className="categories-container">
          {categories.map((cat, index) => (
            <div key={index} className="category-item">
              <img src={cat.icon} alt={cat.name} />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {}
<section className="campaigns-section">
  <div className="campaigns-container">
    <div className="campaign-card campaign-large">
      <img src="/images/iteration-2-images/cta/kart-1.png" alt="Özel Lezzetus" className="campaign-img" />
      <div className="campaign-content">
        <h2>Özel<br />Lezzetus</h2>
        <p>Position:Absolute Acı Burger</p>
        <Link to="/siparis" className="campaign-btn">SİPARİŞ VER</Link>
      </div>
    </div>
    
    <div className="campaign-column">
      <div className="campaign-card campaign-dark">
        <img src="/images/iteration-2-images/cta/kart-2.png" alt="Hackathlon Burger" className="campaign-img" />
        <div className="campaign-content">
          <h3>Hackathlon<br />Burger Menü</h3>
          <Link to="/siparis" className="campaign-btn">SİPARİŞ VER</Link>
        </div>
      </div>
      
      <div className="campaign-card campaign-light">
        <img src="/images/iteration-2-images/cta/kart-3.png" alt="Kurye" className="campaign-img" />
        <div className="campaign-content">
          <h3><span className="red-text">Cooooook</span> hızlı<br />npm gibi kurye</h3>
          <Link to="/siparis" className="campaign-btn">SİPARİŞ VER</Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {}
      <section className="menu-section">
        <p className="menu-subtitle">en çok paketlenen menüler</p>
        <h2 className="menu-title">Acıktıran Kodlara Doyuran Lezzetler</h2>
        
        <div className="menu-filters">
          {menuFilters.map((filter, index) => (
            <button key={index} className={`filter-btn ${filter.active ? 'active' : ''}`}>
              <img src={filter.icon} alt={filter.name} />
              <span>{filter.name}</span>
            </button>
          ))}
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <Link to="/siparis" key={index} className="product-card">
              <img src={product.image} alt={product.name} className="product-img" />
              <h3 className="product-name">{product.name}</h3>
              <div className="product-meta">
                <span className="product-rating">{product.rating}</span>
                <span className="product-reviews">({product.reviews})</span>
                <span className="product-price">{product.price}₺</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;