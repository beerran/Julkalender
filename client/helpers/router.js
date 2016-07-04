//Global subscriptions. Not router specific, but since all the other subscriptions are here, whatever..
Meteor.subscribe('currentUser');
Meteor.subscribe('activityStream');
// client side specific location. Probably shouldn't be here either
ProblemStats = new Mongo.Collection('problemStats');

Router.map(function() {
    this.route('home', {
        path: '/'
    });

    this.route('leaderboard', {
        path: '/ledartavla',
        waitOn: function() {
            return Meteor.subscribe('leaderboard');
        },

    });

    this.route('problems', {
        path: '/luckor',
        template: 'sidebar',
        waitOn: function() {
            return Meteor.subscribe('problems');
        }
    });

    this.route('showProblem', {
        path: '/luckor/:_id',
        waitOn: function() {
            Meteor.subscribe('problem', this.params._id);
        },
        subscriptions: function() {
            this.subscribe('problemStats', this.params._id);
        },
        data: function() {
            return Problems.findOne({_id: this.params._id});
        },

    });

    this.route('profile', {
        path: '/min-profil',
        data: function() {
            return Meteor.user();
        },
        onBeforeAction: function() {
          filters.checkUser(this);
        }
    });


    this.route('about', {
        path: '/information',
        template: 'about'
    });


    // Admin stuff be here!
    this.route('adminMain', {
      path: '/admin',
      waitOn: function() {
          return [Meteor.subscribe('adminUsers'), Meteor.subscribe('settings'), Meteor.subscribe('adminProblems')];
      },
      data: function() {
          return {
            activeTab: 'users',
            hasSettings: !!Settings.find().count(),
            settings: Settings.findOne(),
            active: Problems.find({draft: false}, {sort: {sortOrder: 1}}),
            drafts: Problems.find({draft: true}, {sort: {createdAt: 1}}),
            users: Meteor.users.find({}, {sort: {username: 1}})
          };
      },
      onBeforeAction: function() {
        filters.checkAdmin(this);
      }
    });

    this.route('adminRoute', {
      path: '/admin/:q',
      template: 'adminMain',
      waitOn: function() {
          return [Meteor.subscribe('adminUsers'), Meteor.subscribe('settings'), Meteor.subscribe('adminProblems')];
      },
      data: function() {
          return {
            activeTab: this.params.q,
            hasSettings: !!Settings.find().count(),
            settings: Settings.findOne(),
            active: Problems.find({draft: false}, {sort: {sortOrder: 1}}),
            drafts: Problems.find({draft: true}, {sort: {createdAt: 1}}),
            users: Meteor.users.find({}, {sort: {username: 1}})
          };
      },
      onBeforeAction: function() {
        filters.checkAdmin(this);
      }
    });

    this.route('editProblem', {
        path: '/admin/problems/edit/:_id',
        waitOn: function() {
            return Meteor.subscribe('adminProblem', this.params._id);
        },
        data: function() {
            return {
                problem: Problems.findOne({_id: this.params._id}),
                autoFormType: 'update'
            };
        },
        onBeforeAction: function() {
          filters.checkAdmin(this);
        }
    });

    this.route('newProblem', {
        path: '/admin/problems/edit',
        template: 'editProblem',
        data: function() {
            return {
                problem: null,
                autoFormType: 'insert'
            };
        },
        onBeforeAction: function() {
          filters.checkAdmin(this);
        }
    });

    this.route('notAuthorized', {
      path: '/not-authorized',
      template: 'notAuthorized'
    });

});

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});


Router._filters = {
    checkAdmin: function(route) {
      if(Meteor.user() !== undefined) {
        if(Meteor.user() === null || !Meteor.user().isAdmin) {
          Router.go('notAuthorized');
        } else {
          route.next();
        }
      }
    },
    checkUser: function(route) {
      if(Meteor.user() === null) {
        Router.go('notAuthorized');
      } else {
        route.next();
      }
    }
};

var filters = Router._filters;
