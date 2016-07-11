angular.module("providerApp")
.factory("userService", function ($http, ref, $cookies) {
  return {
    getUsers() {
      return $http.get(`${ref.url}/api/users`);
    },
    addUser(newUser) {
      return $http.post(`${ref.url}/api/users`, newUser);
    },
    editUser(updatedUser, userID) {
      return $http.put(`${ref.url}/api/users/${userID}`, updatedUser);
    },
    deleteUser(userID) {
      return $http.delete(`${ref.url}/api/users/${userID}`);
    },
    addLocation(userID, newLocation) {
      return $http.put(`${ref.url}/api/users/${userID}/locations`, newLocation)
    },
  }
})
