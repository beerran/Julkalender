Template.settings.events = {
    'click #clear-activity-stream': function () {
        if (confirm('Vill du ta bort alla aktiviteter i aktivitetsfältet?')) {
            Meteor.call('clearActivityStream');
        }
    }
};
