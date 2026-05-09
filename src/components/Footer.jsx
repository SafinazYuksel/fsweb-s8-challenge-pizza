function Footer() {
  const menuItems = [
    'Terminal Pizza',
    '5 Kişilik Hackathlon Pizza',
    'useEffect Tavuklu Pizza',
    'Beyaz Console Frosty',
    'Tester Geçti Mutlu Burger',
    'Position Absolute Acı Burger'
  ];

  const instagramImages = [
    '/images/iteration-2-images/footer/insta/li-0.png',
    '/images/iteration-2-images/footer/insta/li-1.png',
    '/images/iteration-2-images/footer/insta/li-2.png',
    '/images/iteration-2-images/footer/insta/li-3.png',
    '/images/iteration-2-images/footer/insta/li-4.png',
    '/images/iteration-2-images/footer/insta/li-5.png'
  ];

  return (
    <footer className="app-footer-new">
      <div className="footer-container">
        {}
        <div className="footer-brand">
          <img 
            src="/images/iteration-2-images/footer/logo-footer.svg" 
            alt="Teknolojik Yemekler" 
            className="footer-logo"
          />
          <div className="footer-contact">
            <div className="contact-item">
              <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="Adres" />
              <span>341 Londonderry Road,<br />İstanbul Türkiye</span>
            </div>
            <div className="contact-item">
              <img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="Email" />
              <span>aciktim@teknolojikyemekler.com</span>
            </div>
            <div className="contact-item">
              <img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="Telefon" />
              <span>+90 216 123 45 67</span>
            </div>
          </div>
        </div>

        {}
        <div className="footer-menu">
          <h3>Hot Menu</h3>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {}
        <div className="footer-instagram">
          <h3>Instagram</h3>
          <div className="insta-grid">
            {instagramImages.map((img, index) => (
              <img key={index} src={img} alt={`Instagram ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="footer-bottom">
        <span>© 2023 Teknolojik Yemekler.</span>
        
        {}
        <svg 
          className="twitter-icon" 
          viewBox="0 0 24 24" 
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
    </footer>
  );
}

export default Footer;