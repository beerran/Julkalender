Meteor.publish 'userIsAdmin', ->
  if isAdminById @userId
    Meteor.users.find {_id: @userId}, fields:
      isAdmin: true
  else
    []

Meteor.publish 'activityStream', ->
  ActivityStream.find {}, {sort: {created_at: -1}, limit: 10}

Meteor.publish 'settings', ->
  if isAdminById @userId
    Settings.find {}, {}
  else
    Settings.find {}, {}

Meteor.publish 'leaderboard', ->
  fields = {
    username: true
    solved: true,
    lastSolved: true
  }
  Meteor.users.find {isAdmin: false}, fields: fields

Meteor.publish 'currentUser', ->
  if @userId
    console.log(@userId)
    Meteor.users.find {_id: @userId}
  else
    console.log('no')
    undefined

Meteor.publish 'problems', ->
  Problems.find {draft: false}, {sort: {sortOrder: 1}}, fields:
    title: true
    sortOrder: true
    activeFrom: true
    activeTo: true
    answers: {$elemMatch: {userId: @userId}}

Meteor.publish 'problem', (problemId) ->

  fields = {
    answers: {$elemMatch: {userId: @userId}}
    title: true
    activeFrom: true
    activeTo: true
    description: true,
    description_sv: true
  }

  Problems.find({_id: problemId, draft: false, activeFrom: {$lte: new Date()}}, fields: fields)

Meteor.publish 'problemComments', (problemId) ->
  Comments.find({problemId: problemId})

Meteor.publish 'problemStats', (problemId) ->
  self = this
  solved = 0
  solveAttempts = 0

  #TODO: This is calculated for every client viewing the same problem.... Seems unnecessary?
  handle = Problems.find({_id: problemId}, fields: {answers: true}).observeChanges(
    changed: (id, doc) ->
        if doc.answers
          solved = countSolved(doc.answers)
          solveAttempts = doc.answers.length
          self.changed('problemStats', problemId, {solveCount: solved, solveAttempts: solveAttempts})
    added: (id, doc) ->
      if doc.answers
        solved = countSolved(doc.answers)
        solveAttempts = doc.answers.length
  )

  self.added('problemStats', problemId, {solveCount: solved, solveAttempts: solveAttempts})
  self.ready()

  self.onStop ->
    handle.stop()
