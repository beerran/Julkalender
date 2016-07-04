Template.editProblem.rendered = function () {
    $('textarea[name="description"]').autogrow();
};

Template.editProblem.helpers({
    getTitle: function() {
      if(this.problem === null) {
        return 'Lägg till nytt problem';
      }
      return 'Ändra problem "' + this.problem.title + '"';
    }
});
