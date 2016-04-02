/** LoginService.js **/
import angular from 'angular';
import translate from 'angular-translate';
import loginkey from './loginkey.js';
export default class LoginService {
  constructor($window, $translate, $q) {
    this.q = $q;
    this.$window = $window;
    this.gsignin = $window.gsignin;
    this.$translate = $translate;
    this.options = loginkey;
    this.login = undefined;
    this.available = undefined;
    this.loginCallbacks = {};
    this.logoutCallbacks = {};
    this.login_running = false;
    console.log("Instantiated LoginService");
    this.loginSuccess = function(obj) {
      console.log("login success: " + JSON.stringify(obj));
      this.login = obj;
      angular.forEach(this.loginCallbacks, function(value, key) {
        //call success function of all loginCallbacks
        value[0](this.login);
      }, this);
      this.login_running = false;
    };
    this.loginError = function(msg) {
      console.log("login error: " + msg);
      angular.forEach(this.loginCallbacks, function(value, key) {
        //call error function of all loginCallbacks
        //in this context this = msg
        value[1](this);
      }, msg);
      this.login_running = false;
    };
    this.logoutSuccess = function() {
      this.login = undefined;
      angular.forEach(this.logoutCallbacks, function(value, key) {
        value[0]();
      });
    };
    this.logoutError = function(msg) {
      angular.forEach(this.logoutCallbacks, function(value, key) {
        value[1](msg);
      }, msg);
    };
  }
  configureLogin() {
    var p = this.q.defer();

    this.gsignin.config(() => {
      //Config and connection ok
      console.log("gsignin config ok");
      this.available = true;
      p.resolve();
    }, () => {
      //config or connection error
      this.available = false;
      p.reject();
    }, this.options);
    return p.promise;
  }
  executeLogin(silent = false) {
    console.log("perform login");
    if (this.login_running === true || this.available !== true) { console.log("login unavailable now"); return;}
    this.login_running = true;
    this.gsignin.login(this.loginSuccess.bind(this), this.loginError.bind(this), silent);
  }
  executeLogout() {
    console.log("perform logout");
    this.gsignin.logout(this.logoutSuccess.bind(this), this.logoutError.bind(this));
  }
  addLogoutCallbacks(description, succ, err, binder) {
    this.logoutCallbacks[description] = [succ.bind(binder), err.bind(binder)];
  }
  delLogoutCallbacks(description) {
    delete this.logoutCallbacks[description];
  }
  addLoginCallbacks(description, succ, err, binder) {
    this.loginCallbacks[description] = [succ.bind(binder), err.bind(binder)];
  }
  delLoginCallbacks(description) {
    delete this.loginCallbacks[description];
  }
  isLogged() {
    if (this.login !== undefined) {
      return true;
    } else {
      return false;
    }
  }
  getUserFullname() {
    if (this.login !== undefined) {
      return this.login.email;
    } else {
      return "";
    }
  }
  getLogin() {
    return this.login;
  }
  getAvailability() {
    return this.available;
  }
}
LoginService.$inject = ['$window', '$translate', '$q'];
