'use strict';

Template.activitystream.helpers({
    activities: function() {
        return ActivityStream.find({}, {sort: {created_at: -1}});
    },
    urlify: function() {
        switch (entity.objectType) {
            case "problem":
                return Router.routes['showProblem'].path({_id: entity.id});
        }
    },
    title: function() {
        if (this.type === 'UserRegistrationEvent') {
            return this.actor.name + ' har registrerat sig';
        } else if (this.type === 'ProblemSolvedEvent') {
            var luker = 'luckor';
            if (this.payload.points == 1) {
                luker = 'lucka';
            }
            return this.actor.name + ' har löst ' + this.payload.points  + ' ' + luker + '!';
        }
    },
    content: function() {
        if (this.type === 'UserRegistrationEvent') {
            return ''
        } else if (this.type === 'ProblemSolvedEvent') {
            return 'Löste <a href="' + Router.url('showProblem', {_id: this.payload.problem.id}) + '"> lucka ' + this.payload.problem.name + '</a>'
        }
    }

});

Template.activitystream.events = {
    'click .close': function() {
        if (confirm('Vill du ta bort den här aktiviteten från aktivitetsfältet?')) {
            ActivityStream.remove(this._id);
        }
    }
};
