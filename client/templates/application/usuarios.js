Template.usuarios.helpers({
  lista: function() {
    return Meteor.users.find({});
  }
});