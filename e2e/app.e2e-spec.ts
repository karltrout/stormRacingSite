import { TestNgPage } from './app.po';
import {} from 'jasmine';

describe('StormRacingSite App', function() {
  let page: TestNgPage;

  beforeEach(() => {
    page = new TestNgPage();
  });

  it('should contain a menu object', () => {
    page.navigateTo();
    expect(page.getMenu()).toBeDefined;
  });

});
