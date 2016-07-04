var activeTabDep = new Tracker.Dependency();

Template.adminMain.events = ({
    'click .tab': function(event, template) {
      var value = template.$(event.target).attr('data-name');
      this.activeTab = value;
      activeTabDep.changed();
    }
});

Template.adminMain.helpers({
    isActiveTab: function(template) {
      activeTabDep.depend();
      return template === this.activeTab ? 'active' : '';
    }
});
