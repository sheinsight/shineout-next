describe('Tree[Drag]', () => {
  it('should render when drag', () => {
    cy.visit('/#/cn/component/shineout/Tree?example=%E5%8F%AF%E6%8B%96%E6%8B%BD');
    cy.get('.so-tree-icon').eq(0).click();
    cy.get('.so-tree-icon').eq(1).click();
    cy.get('.so-tree-node').eq(4).as('target');
    cy.get('.so-tree-node').eq(2).as('source');
    let sourceText: any[] = [];
    let targetText: any[] = [];
    cy.get('.so-tree-text')
      .each((element) => {
        const text = Cypress.$(element).text();
        sourceText.push(text);
      })
      .then(() => {
        sourceText.join(',');
      });
    const dataTransfer = new DataTransfer();
    cy.get('@source')
      .trigger('mousedown', { which: 1, button: 0 })
      .trigger('dragstart', { dataTransfer });
    cy.get('@target').trigger('dragover', { dataTransfer });
    cy.get('@source').trigger('dragend', { dataTransfer, force: true });
    cy.get('.so-tree-text')
      .each((element) => {
        const text = Cypress.$(element).text();
        targetText.push(text);
      })
      .then(() => {
        expect(targetText.join(',')).to.not.equal(sourceText);
      });
  });
});
