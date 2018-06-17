import app, {AppCtrl, appDirective} from './app';
import template from './app.html';

describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl;

    beforeEach(() => {
      // angular.mock.module(app);

      angular.mock.inject(($controller, $log) => {
        // ctrl = $controller('AppCtrl', {});
        ctrl = new AppCtrl($log);
      });
    });

    it('should contain the starter url', () => {
      expect(ctrl.url).toBe('https://github.com/preboot/angular-webpack');
    });
  });

  describe('App component', () => {
    let directive;

    beforeEach(() => {
      directive = appDirective;
    });

    it('should use the right template',()=>{
        expect(directive.template).toBe(template);
    });
  });

});
