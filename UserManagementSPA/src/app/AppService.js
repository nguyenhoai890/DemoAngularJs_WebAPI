import appConfig from './config.js';

class AppService {
    constructor($http) {
      this.$http = $http;
      let config = new appConfig();
      this.usersURL = config.getURL();
      
    };
    getAll()
    {
        return this.$http.get(this.usersURL);
    };
    post(Model) {
        var request = this.$http({
            method: "post",
            url: this.usersURL,
            data: Model
        });
        return request;
    };
    put(Model) {
        var request = this.$http({
            method: "put",
            url: this.usersURL,
            data: Model
        });
        return request;
    };
    delete(userId) {
        var request = this.$http({
            method: "delete",
            url: this.usersURL + '/' + userId
        });
        return request;
    };
    getAll () {
        return this.$http.get(this.usersURL);
    };
    getbyID(userId) {
        return this.$http.get(this.usersURL + '/' + userId);
    };
  }
  AppService.$inject = ['$http'];

  export default AppService;