# chat-app
https://fathomless-garden-24983.herokuapp.com/

A room-based chat app built with [Socket IO](https://socket.io/).

Note: To deploy the chat-app to Heroku, you need to push only this directory (i.e. `git subtree push --prefix chat-app heroku master`).

# hello-world
Hello world!

# notes-node
A console app that allows you to add, remove, and read notes from the file system.

# tests

Node unit testing with [Mocha](https://mochajs.org/), [Expect](https://github.com/mjackson/expect), and [SuperTest](https://github.com/visionmedia/supertest).

# todo-api
API Server: https://sleepy-ocean-67400.herokuapp.com

A todo app API built with [Express](https://expressjs.com/), using [MongoDB](https://www.mongodb.com/) and [Mongoose](http://mongoosejs.com/) for data storage, and hosted on [Heroku](https://www.heroku.com/). Includes CRUD operations for users and todos. APIs are protected using [JWT](https://jwt.io/) tokens which are provided to users on login and can be passed through an HTTP header when making a request to an API.

Note: To deploy the todo-api to Heroku, you need to push only this directory (i.e. `git subtree push --prefix todo-api heroku master`).

# weather-app
A console app that uses the [Google Maps API](https://cloud.google.com/maps-platform/) and [Dark Sky API](https://darksky.net/dev) to get the current weather for a given location.

Note: You will need to add your Dark Sky API secret to the `weather.js` file.

# web-server
https://secret-anchorage-18068.herokuapp.com

A simple web server built with [Express](https://expressjs.com/) and [Handlebars](https://handlebarsjs.com/) and hosted on [Heroku](https://www.heroku.com/).

Note: To deploy the web-server to Heroku, you need to push only this directory (i.e. `git subtree push --prefix web-server heroku master`).
