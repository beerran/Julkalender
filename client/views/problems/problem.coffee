Template.showProblem.events
  'click .copy': (event, template) ->
    template.$(event.target).addClass('clicked').delay(300).queue( ->
      template.$(event.target).removeClass('clicked');
      template.$(event.target).dequeue();
    );

  'click .languages span': (event, template) ->
    Session.set('activeLanguage', template.$(event.target).attr('id'));

  'click .close': (event, template) ->
    console.log(template.$(event.target.parentElement))
    template.$(event.target.parentElement).hide()

  'submit .answer-form': (event, template) ->
    $('.danger').hide()
    $('.success').hide()
    event.preventDefault() # don't reload the page on submit
    answer = template.find("#answer").value.trim();
    if answer
      Meteor.call 'checkAnswer', answer, template.data._id, #use template.data._id instead of session object here
      (err, res) ->
        Deps.flush() #Force dom update before we jquery it!
        if res
          $('.success').show()
        else
          $('.danger').show()
          $('#answerButton').prop('disabled', true)
          Meteor.setInterval( ->
            $('#answerButton').prop('disabled', false)
          , 10000)


  'click .reveal': (event, template) ->
    Meteor.call 'retrieveAnswer', template.data._id,
      (err, res) ->
        if res
          $('.reveal').html('');
          $('.reveal').addClass('revealPlaceholder');
          $('.reveal').removeClass('.reveal');
          $('#answer').text('Lösning: ' + res);
        else
          $('.reveal').html('');
          $('.reveal').addClass('revealPlaceholder');
          $('.reveal').removeClass('.reveal');
          $('#answer').text('Du får inte se lösningen till denna lucka riktigt än. Se det som en julklapp!');

  Template.showProblem.helpers
    comment_form: ->
      return getTemplate('comment_form');
    comment_list: ->
      return getTemplate('comment_list');
