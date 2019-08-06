Template.nutricionistas.helpers({
  lista: function() {
    return Roles.getUsersInRole('nutri');
  }
});