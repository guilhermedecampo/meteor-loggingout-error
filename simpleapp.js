if (Meteor.isClient) {
  Meteor.subscribe("directory");

  Template.hello.events({
    'click .login' : function () {
      var email = "guilherme@gmail.com",
      password = "123456";
      Meteor.loginWithPassword(email, password);
    },
    'click .logout' : function () {
      Meteor.logout();
    },
  });
}

if (Meteor.isServer) {

  if (!Meteor.users.findOne({"emails.0.address": "guilherme@gmail.com"})) {
    Accounts.createUser({
      email: "guilherme@gmail.com",
      password: "123456",
      profile: {startupId: "NUMBER-ID"}
    });
  }

  Meteor.publish('directory', function () {
    if (this.userId) {
      var user = Meteor.users.findOne(this.userId);
      var startupId = user.profile.startupId;
      return Meteor.users.find({"profile.startupId": startupId});
    } else {
      this.ready();
    }
  });

}
