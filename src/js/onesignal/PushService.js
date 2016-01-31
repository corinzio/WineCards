export default class PushService{
  constructor($window){
    this.callback = {};
    console.log("Instantiated PushService");
  }

  notificationOpened(jsdata){
    console.log( 'Push Notification: ' + JSON.stringify(jsdata));
  }

  registerCallback(){
    console.log("Register Callback");
  }
}
PushService.$inject = ['$window'];
