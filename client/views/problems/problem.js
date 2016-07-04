var tickingDate = new Date();

minuteTick = new Tracker.Dependency();

Meteor.setInterval(function() {
    setTickingDate(new Date());
}, 60000);

var getTickingDate = function() {
    minuteTick.depend();
    return tickingDate;
};

var setTickingDate = function() {
    tickingDate = new Date();
    minuteTick.changed();
};

var tickingSecond = new Date();
secondTick = new Tracker.Dependency();

Meteor.setInterval(function() {
    setTickingSecond(new Date());
}, 1000);

var getTickingSecond = function() {
    secondTick.depend();
    return tickingSecond;
};

var setTickingSecond = function() {
    tickingSecond = new Date();
    secondTick.changed();
};

Template.showProblem.helpers({
    solvedOrNoLongerActive: function() {
        if (this.answers !== undefined && this.answers.length > 0) {
            if (this.answers && this.answers[0].solved) {
                Meteor.subscribe('problemComments', this._id);
                return true;
            } else {
                return false;
            }
        } else if (this.activeTo && this.activeTo < getTickingDate()) {
            Meteor.subscribe('problemComments', this._id);
            return true;
        } else {
            return false;
        }
    },
    solved: function() {
        if (this.answers === undefined || this.answers.length < 1) {
            return false;
        } else {
            return this.answers && this.answers[0].solved;
        }
    },
    stats: function() {
        return ProblemStats.findOne();
    },
    problemEnds: function() {
        var diff = this.activeTo - getTickingSecond();
        var duration = moment.duration(diff, 'milliseconds');
        return duration.hours() + 'h, ' + duration.minutes() + 'min, ' + duration.seconds() + 's kvar!';
    },
    stillActive: function() {
        var diff = this.activeTo - getTickingSecond();
        return diff > 0;
    },
    toggleCopyButton: function(template) {
        if (this.description !== undefined) {
            if (this.description.indexOf("</code>" >= 0)) {
                var codeBlock = this.description.substring(this.description.indexOf('<code'), this.description.indexOf('</code>'));
                if(codeBlock.indexOf('has-copy') >= 0) {
                  var copyText = codeBlock.replace(/<(?!br\s*\/?)[^>]+>/g, '');
                  if(codeBlock.indexOf('has-array') >= 0) {
                    var val = copyText.split(/<.+?>/);
                    copyText = 'var problem_' + this.title + '_array = [';
                    val.forEach(function(item, index, array){
                      if(index === array.length -1) {
                        copyText = copyText + "'" + item + "']";
                        $('code').append('<button class="copy" data-clipboard-text="' + copyText + '"><i class="fa fa-copy"></i> Kopiera</button>');
                      }
                      else {
                        copyText = copyText + "'" + item + "', ";
                      }
                    });
                  }
                  else {
                    $('code').append('<button class="copy" data-clipboard-text="' + copyText + '"><i class="fa fa-copy"></i> Kopiera</button>');
                  }
              }
                var clipboard = new Clipboard('.copy');
            }
        }
    }
});
