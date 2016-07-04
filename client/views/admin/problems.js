Template.adminProblems.events = {
    'click .publish': function() {
        Problems.update(this._id, {$set: { draft: false }});
    },
    'click .draft': function() {
        Problems.update(this._id, {$set: { draft: true }});
    },
    'click .delete': function() {
        if (confirm('Vill du ta bort problem "' + this.title + '"?')) {
            Problems.remove(this._id);
        }
    }
};
