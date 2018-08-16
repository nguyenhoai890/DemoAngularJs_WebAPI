import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template_patients from './patients.html';
//import template_addpatient from './addpatient.html';
import template_patientdetail from './patientdetail.html';


// let patientCreate = {
//     template_patient_create: template_patients,
//     controller: patientController
// };


class PatientController {
    constructor($log, $scope, AppService) {
        //debugger;
        console.log($scope);
        this.title = 'Patients';
        console.log($scope)
        $scope.$on('eventListPatient', function (event, data) {
            $scope.title = "List Patients";
            console.log(event);
            console.log(data);
            AppService.getAllPatient().then(
                function (response) {
                    $scope.patients = response.data;
                    console.log(response.data);
                }
            );
        });
        //Add Patient
        $scope.$on('eventAddPatient', function (event, data) {
            $scope.title = "Add New Patient";
        
        });
        $scope.submitAddPatientForm = function (isValid) {
            ResetMessage($scope);
            if (isValid && $scope.Patient !== undefined) {
                var Patient = $scope.Patient;
                AppService.put(Patient).then(
                    function (response) {
                        if (response.data !== undefined) {
                            ShowMessage($scope, 'Add new Patient successfully.')
                        }
                    }
                );
            }
        };
        //Patient Detail
        $scope.$on('eventPatientDetail', function (event, data) {
            $scope.title = "Patient's Detail";
            var patientId = data.id;
            AppService.getPatientDetailById(patientId).then(
                function (response) {
                    $scope.Patient = response.data;
                }
            );
        });
        $scope.submitUpdatePatientForm = function (isValid) {
            ResetMessage($scope);
            if (isValid && $scope.Patient !== undefined) {
                var Patient = $scope.Patient;
                AppService.post(Patient).then(
                    function (response) {
                        if (response.data !== undefined && response.data) {
                            ShowMessage($scope, 'Update Patient successfully.')
                        }
                    }
                );
            }
        };
        $scope.DeletePatient = function (id) {
            if (typeof id !== 'undefined') {
                AppService.delete(id).then(
                    function (response) {
                        if (response.data !== undefined) {
                            if (response.data) {
                                AppService.getAll().then(
                                    function (response) {
                                        $scope.patients = response.data;
                                    }
                                );
                            }
                        }
                    }
                );
            }
        };
        $scope.search = function(item) {
            if (!$scope.query || (item.firstName.toLowerCase().indexOf($scope.query) != -1) || (item.lastName.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) ){
                return true;
            }
            return false;
        };
    };
  }
  
  function ResetMessage($scope) {
    $scope.haveMessage = false;
    $scope.formMessage = "";
    }
    function ShowMessage($scope, message) {
        $scope.haveMessage = true;
        $scope.formMessage = message;
    }

  PatientController.$inject = ['$log','$scope','AppService'];
  
  const MODULE_NAME = 'patients';

  let patients_data = {
    template:template_patients,
    controller: PatientController
    };
    // let addpatient_data = {
    //     template:template_addpatient,
    //     controller: PatientController
    // };
    let patientdetail_data = {
        template:template_patientdetail,
        controller: PatientController
    };

  angular.module(MODULE_NAME, [uiRouter])
   .config(($stateProvider) => {
      $stateProvider
      .state('patients', {
        url: '/GetPatients',
        template: '<patients></patients>',
        onEnter: function ($rootScope, $timeout, $stateParams) {
            $timeout(function () {
                $rootScope.$broadcast('eventListPatient', $stateParams);
            })
        }
      })
      .state('patientsadd',
        {
            url: '/add',
            template: '<addpatient></addpatient>',
            onEnter: function ($rootScope, $timeout, $stateParams) {
                $timeout(function () {
                    $rootScope.$broadcast('eventAddPatient', $stateParams);
                })
            }
        })
        .state('patientsdetail', {
            url: "/patients/:id",
            template: "<patientdetail></patientdetail>",
            onEnter: function ($rootScope, $timeout, $stateParams) {
                debugger;
                $timeout(function () {
                    $rootScope.$broadcast('eventPatientDetail', $stateParams);
                })
            }
        })
      ;
    })
    .component('patients', patients_data)
    //.component('addpatient',addpatient_data)
    .component('patientdetail',patientdetail_data)
    ;
  
    export default MODULE_NAME;
  