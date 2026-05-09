import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <img 
          src="/images/iteration-1-images/logo.svg" 
          alt="Teknolojik Yemekler" 
          className="header-logo-img"
        />
        <div className="breadcrumb-container">
          <nav className="breadcrumb-links">
            <Link to="/">Anasayfa</Link>
            <span className="separator">-</span>
            <Link to="/siparis" className="active">Sipariş Oluştur</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;