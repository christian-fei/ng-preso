import { NgPresoPage } from './app.po';

describe('ng-preso App', function() {
  let page: NgPresoPage;

  beforeEach(() => {
    page = new NgPresoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
