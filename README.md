Main code taken from [Alexanbj/programming-ladder](https://github.com/alexanbj/programming-ladder/tree/julekalender).
The main code and schemas remain, but some improvements have been made.

A project Euler clone written with the lovely Meteor framework. Utilizes JavaScript, Stylus and some leftover CoffeeScript.

# Installation
- Install [Meteor](http://meteor.com)
- Download or clone this into /some/path
- cd /some/path
- Run `meteor`

# Admin privileges
During the upstart of the application it checks the number of registered users, if there is only one, he/she will be given admin privileges. So after the installation steps are finished, simply register a user in the app, then kill the server and start it up again with `meteor`.
