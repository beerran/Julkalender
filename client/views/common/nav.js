Template.nav.helpers({
    activeIfTemplateIs: function(template) {
        var currentRoute = Router.current().route.getName();
        return currentRoute && template === currentRoute ? 'active' : '';
    }
});

Template.nav.events({
    'click #signOut': function() {
        Meteor.logout();
    },
    'click .navbar-toggle': function(event, template) {
      $('.navbar-nav').animate({width:'toggle',}, 150);
      $('.nav-header').animate({width:'toggle',}, 150);
    },
    'click .close-nav': function(event, template) {
      $('.navbar-nav').animate({width:'toggle',}, 150);
      $('.nav-header').animate({width:'toggle',}, 150);
    }
});
