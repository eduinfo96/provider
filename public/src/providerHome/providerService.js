angular.module("providerApp")
.factory("providerService", function ($http, ref) {
  return {
    getServices: function () {
      return $http.get(`${ref.url}/api/services`);
    },
    submitNewService: function (newService) {
      return $http.post(`${ref.url}/api/services`, newService);
    },
    editService: function (updatedService, serviceID) {
      return $http.put(`${ref.url}/api/services/${serviceID}`, updatedService);
    },
    deleteService: function (serviceID) {
      return $http.delete(`${ref.url}/api/services/${serviceID}`);
    }

  }
})
