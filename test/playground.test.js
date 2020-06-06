const { expect } = require('chai');

describe('Playground', () => {
  context('when I sum 2 and 4', () => {
    it('should return 6', () => {
      expect(2 + 4).to.be.equals(6);
    })
  });

  context('when I divide by 0', () => {
    it('should return infinity', () => {
      expect(4/0).to.be.equals(Infinity);
    });
  })
});
