angular.module("providerApp")
.factory("userService", function ($http, ref) {
  return {
    getUsers: function () {
      return $http.get(`${ref.url}/api/users`);
    },
    addUser: function (newUser) {
      return $http.post(`${ref.url}/api/users`, newUser);
    },
    editUser: function (updatedUser, userID) {
      return $http.put(`${ref.url}/api/users/${userID}`, updatedUser);
    },
    deleteUser: function(userID) {
      return $http.delete(`${ref.url}/api/users/${userID}`);
    }

  }
})
