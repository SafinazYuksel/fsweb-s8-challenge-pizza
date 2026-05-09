describe('Teknolojik Yemekler - Form Validasyonu', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', {
      statusCode: 200,
      body: {
        id: 123,
        isim: 'Test Kullanıcı',
        boyut: 'Orta',
        hamur: 'İnce',
        malzemeler: ['Pepperoni', 'Sosis', 'Mısır', 'Biber'],
        notlar: '',
        adet: 1,
        createdAt: new Date().toISOString()
      }
    }).as('pizzaOrder');

    cy.visit('http://localhost:5173/siparis');
  });

  it('İsim inputuna metin girer', () => {
    cy.get('input[name="isim"]').type('Ali Veli');
    cy.get('input[name="isim"]').should('have.value', 'Ali Veli');
  });

  it('Birden fazla malzeme seçebilir', () => {
    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('input[type="checkbox"][value="Sosis"]').check();
    cy.get('input[type="checkbox"][value="Mısır"]').check();
    cy.get('input[type="checkbox"][value="Biber"]').check();
    
    cy.get('input[type="checkbox"]:checked').should('have.length', 4);
  });

  it('Formu gönderir ve başarı sayfasına yönlendirir', () => {
    cy.get('input[name="isim"]').type('Ali Veli');
    cy.get('input[type="radio"][value="Orta"]').check();
    cy.get('select[name="hamur"]').select('İnce');
    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('input[type="checkbox"][value="Sosis"]').check();
    cy.get('input[type="checkbox"][value="Mısır"]').check();
    cy.get('input[type="checkbox"][value="Biber"]').check();
    
    cy.get('button[type="submit"]').click();
    
    cy.wait('@pizzaOrder');
    
    cy.url().should('include', '/onay');
    cy.contains('SİPARİŞ ALINDI');
  });

  it('İsim 3 karakterden az olunca hata verir', () => {
    cy.get('input[name="isim"]').type('Al');
    cy.get('form').submit();
    cy.contains('İsim en az 3 karakter olmalı');
  });

  it('Boyut seçilmeden hata verir', () => {
    cy.get('input[name="isim"]').type('Ali Veli');
    cy.get('form').submit();
    cy.contains('Boyut seçmelisiniz');
  });

  it('4 malzemeden az seçilince hata verir', () => {
    cy.get('input[name="isim"]').type('Ali Veli');
    cy.get('input[type="radio"][value="Orta"]').check();
    cy.get('select[name="hamur"]').select('İnce');
    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('form').submit();
    cy.contains('En az 4 malzeme seçmelisiniz');
  });

  it('Adet artırma/azaltma çalışır', () => {
    cy.get('.quantity-selector span').should('contain', '1');
    cy.get('.quantity-selector button:last-child').click();
    cy.get('.quantity-selector span').should('contain', '2');
    cy.get('.quantity-selector button:first-child').click();
    cy.get('.quantity-selector span').should('contain', '1');
  });
});

describe('Teknolojik Yemekler - Sayfa Geçişleri', () => {
  it('Anasayfadan sipariş sayfasına gider', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('ACIKTIM').click();
    cy.url().should('include', '/siparis');
  });

  it('Header breadcrumb çalışır', () => {
    cy.visit('http://localhost:5173/siparis');
    cy.contains('Anasayfa').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('Sipariş formundan anasayfaya döner', () => {
    cy.visit('http://localhost:5173/siparis');
    cy.contains('Anasayfa').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });
});

describe('Teknolojik Yemekler - Checkbox/Radio Özelleştirme', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/siparis');
  });

  it('Radio butonları özelleştirilmiş görünüyor', () => {
    cy.get('input[type="radio"]').should('have.css', 'appearance', 'none');
    cy.get('input[type="radio"]').first().should('have.css', 'border-radius', '50%');
  });

  it('Checkboxlar özelleştirilmiş görünüyor', () => {
    cy.get('input[type="checkbox"]').should('have.css', 'appearance', 'none');
    cy.get('input[type="checkbox"]').first().should('have.css', 'border-radius', '4px');
  });

  it('Checkbox seçilince sarı renk oluyor', () => {
    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('input[type="checkbox"][value="Pepperoni"]').should('be.checked');
  });
});