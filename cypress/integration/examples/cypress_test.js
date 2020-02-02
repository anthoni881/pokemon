let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
  describe('pokemon Test', function() {
    it('Visit"', function() {
      cy.visit('http://localhost:3000/')
      cy.get('.App').click(150, 150)
    })
    it('click card container',function(){
      cy.url().should('eq', 'http://localhost:3000/pick')
      cy.reload()
      cy.get('.detail-img').should('visible').wait(4000)
      cy.get('.btn-battle').click()
    })
    it('click card container',function(){
      cy.url().should('eq', 'http://localhost:3000/battle')
      cy.get('.img-my-monster').should('visible').wait(1000)
      cy.get('.search-enemy').click()
      cy.get('.img-enemy').should('visible').wait(3000)
      cy.get('.start-battle').click()
      cy.get('.close-btn').click()
    })
    beforeEach(() => {
      cy.restoreLocalStorageCache();
    });
    
    afterEach(() => {
      cy.saveLocalStorageCache();
    });
    
  })