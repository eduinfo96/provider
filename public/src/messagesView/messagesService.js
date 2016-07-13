angular.module("providerApp")
.factory("messageService", function ($http, ref) {
  return {
    getMessages: function (query) {
      return $http.get(`${ref.url}/api/messages`);
    },
    getSentMessages: function (query) {
      return $http.get(`${ref.url}/api/messages?from=${query}`);
    },
    getUsersInbox: function (query) {
      return $http.get(`${ref.url}/api/messages?to=${query}`);
    },
    sendMessage: function (message) {
      return $http.post(`${ref.url}/api/messages`, message);
    },
    editMessage: function (updatedMessage, messageID) {
      return $http.put(`${ref.url}/api/messages/${messageID}`, updatedMessage);
    },
    deleteMessage: function (messageID) {
      return $http.delete(`${ref.url}/api/messages/${messageID}`);
    }

  }
})
