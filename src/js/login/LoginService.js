/** LoginService.js **/
import angular from 'angular';
import translate from 'angular-translate';
import loginkey from './loginkey.js';
export default class LoginService {
  constructor($window, $translate) {
    this.$window = $window;
    this.$translate = $translate;
    this.options = loginkey;
    this.login = undefined;
    this.available = undefined;
    this.loginCallbacks = [];
    this.logoutCallbacks = [];
    console.log("Instantiated LoginService");
  }
  checkAvailability() {
    console.log("Check google+");
    this.$window.plugins.googleplus.isAvailable(function(available) {
      if (available) {
        console.log("Google+ Available");
        this.available = true;
      }
      else{
        console.log("Google+ not available");
        this.available = false;
      }
    }.bind(this));
  }
  getAvailability() {
    if (this.available === undefined) {
      this.available = false;
      this.checkAvailability();
    }
    return this.available;
  }
  setOffline(bool) {
    if (bool) {
      this.options.offline = true;
    } else {
      this.options.offline = false;
    }
  }
  trySilentLogin() {
    this.$window.plugins.googleplus.trySilentLogin(this.options, function(obj) {
      console.log("silent login succesful");
      this.login = obj;
    }.bind(this), function(msg) {
      //ERROR MESSAGE
      console.log('silent login error: ' + msg);
    }.bind(this));
  }
  executeLogin() {
    this.$window.plugins.googleplus.login(this.options, function(obj) {
      console.log("login succesful");
      this.login = obj;
      console.log(JSON.stringify(this.login));
    }.bind(this), function(msg) {
      //ERROR MESSAGE
      this.login = undefined;
      console.log('login error: ' + msg);
    }.bind(this));
  }
  executeLogout() {
    this.$window.plugins.googleplus.logout(function(msg) {
      console.log("perform logout");
      this.login = undefined;
    });
  }
  setLoginCallbacks(succ, err, binder) {
    this.loginCallbacks.push([succ.bind(binder), err.bind(binder)]);
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
}
LoginService.$inject = ['$window', '$translate'];
