Accounts.validateNewUser(function (user) {
    if (!getSetting('userSignup', true)) {
        throw new Meteor.Error(403, "Det är tyvärr inte möjligt att skapa nya konton för tillfället.");
    }
    return user
});
