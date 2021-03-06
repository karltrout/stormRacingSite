import { browser, element, by } from 'protractor';

export class TestNgPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getMenu(){
    return element(by.tagName('menu-component'));
  }
}
