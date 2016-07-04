Template.adminUsers.events = {
    'click .admin-toggle': function() {
        //Do not allow un admin yourself
        if (this._id !== Meteor.user()._id) {
            Meteor.users.update(this._id, {$set: { isAdmin: !this.isAdmin }});
        }
    },
    'click .user-delete': function() {
        if(this._id === Meteor.user()._id) {
          alert('Du kan inte ta bort dig själv');
        }
        else {
          if (confirm('Vill du ta bort användaren "' + this.username + '"?')) {
              Meteor.users.remove(this._id);
          }
        }
    }
};
