import appConfig from './config.js';

class AppService {
    constructor($http) {
      this.$http = $http;
      let config = new appConfig();
      this.patientsURL = config.getURL();
      
    };
    getAll()
    {
        return this.$http.get(this.patientsURL)+'/GetPatients';
    };
    getAllPatient()
    {//https://medimedservice.azurewebsites.net/api/GetPatients?&code=YPVY0KSyT2WOpnco0Lee/oJaygivkMy6FetpnW17B6I5bD0CigSpLw==
        //return this.$http.get(this.patientsURL+'/GetPatients?&code=A7zA5yXVn1tjaZgcfJpYFtBBa1zrZ4T89Nmifqd7PJTtS0Hx5JTo9g==');
        return this.$http.get(this.patientsURL+'/GetPatients?&code=A7zA5yXVn1tjaZgcfJpYFtBBa1zrZ4T89Nmifqd7PJTtS0Hx5JTo9g==');
    }
    getPatientDetailById(id)
    {
        return this.$http.get(this.patientsURL+'/GetPatientDetail?id='+id+'&code=A7zA5yXVn1tjaZgcfJpYFtBBa1zrZ4T89Nmifqd7PJTtS0Hx5JTo9g==');
    };
    post(Model) {
        var request = this.$http({
            method: "post",
            url: this.patientsURL,
            data: Model
        });
        return request;
    };
    put(Model) {
        var request = this.$http({
            method: "put",
            url: this.patientsURL,
            data: Model
        });
        return request;
    };
    delete(patientId) {
        var request = this.$http({
            method: "delete",
            url: this.patientsURL + '/' + patientId
        });
        return request;
    };
    getAll () {
        debugger;
        return this.$http.get(this.patientsURL)+'/GetPatients';
    };
    getbyID(patientId) {
        return this.$http.get(this.patientsURL + '/' + patientId);
    };
  }
  AppService.$inject = ['$http'];

  export default AppService;