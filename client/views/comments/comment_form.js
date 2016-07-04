Template[getTemplate('comment_form')].onRendered(function(){
  $('#comment').autogrow();
});

Template[getTemplate('comment_form')].events({
    'submit .comment-form': function(e, template) {
        var commentForm = template.$('#comment');
        e.preventDefault();
        var content = commentForm.val();

        var problem = Problems.findOne();

        Meteor.call('comment', problem._id, null, content, function(error, newComment) {
            if (error) {
                console.log(error);
            } else {
                commentForm.val('');
                $('.comment-form button').prop('disabled', true);
                Meteor.setInterval( function() {
                    $('.comment-form button').prop('disabled', false);
                }, 20000);
            }
        });

    }
});
