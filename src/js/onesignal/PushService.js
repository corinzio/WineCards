export default class PushService{
  constructor($window){
    var self = this;

    this.notificationOpened = function notificationOpened(jsdata){
      console.log('Push Notification: ' + JSON.stringify(jsdata));
    };
    console.log("Instantiated PushService");
  }
}
PushService.$inject = ['$window'];
