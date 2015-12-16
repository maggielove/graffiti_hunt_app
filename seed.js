'use strict';
let mongoose = require('mongoose');
let User = require('./models/user');
let Place = require('./models/place');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/graffitiApp');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', (callback) => {
  console.log('Mongoose connected.');
});

////USERS

let usernames = [ 'jamesh', 'lilskips' ]

let passwords = [ 'password1', 'password2' ]

let jamesh = new User({
  username: usernames[0],
  password: passwords[0]
})

jamesh.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    jamesh.save();
  }
})

let  lilskips = new User({
  username: usernames[1],
  password: passwords[1]
})

lilskips.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    lilskips.save();
  }
})

///PLACES
let names = [ "The Bushwick Collective", "ODB Mural", "Bowery Mural", "Big Fish Mural", "Lorca Mural"]

let locations = [ [40.70732570533678, -73.9226090549172], [40.683250017495986, -73.95631692526705], [40.72429917430525, -73.99279117584229], [40.69752676665401, -73.92908334732056], [40.701496138477786, -73.9226245880127] ]

let venueIds = ['4fca53c5e4b01dfc7f381f4d', '4bca074eb6c49c74ce8e8f91', '4ef1925177166617fd378b8e', '566e2a5c498ed26e2ffa13b4', '566e24b1498ef6790e8ed863' ]

let artGraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga',
  'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
  'Artmakers, Inc. has embarked on a series of murals based on the poem Sleepless City (Brooklyn Bridge Nocturne) by Spanish poet Federico Garcia Lorca (1898-1936).  Established in 1984, Artmakers, Inc. collaborates with community organizations to create high quality public art relevant to lives and concerns of neighborhood residents (www.artmakersnyc.org). Source: http://lorcamurals.blogspot.com/p/about-sleepless-city-mural.html'
]

let bushwickCollective = new Place({
  name: names[0],
  loc: locations[0],
  venueId: venueIds[0],
  artInfo: artGraphs[0]
})

bushwickCollective.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    bushwickCollective.save();
  }
})

let odbMural = new Place({
  name: names[1],
  loc: locations[1],
  venueId: venueIds[1],
  artInfo: artGraphs[1]
})

odbMural.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    odbMural.save();
  }
})

let boweryMural = new Place({
  name: names[2],
  loc: locations[2],
  venueId: venueIds[2],
  artInfo: artGraphs[2]
})

boweryMural.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    boweryMural.save();
  }
})

let bigFishMural = new Place({
  name: names[3],
  loc: locations[3],
  venueId: venueIds[3],
  artInfo: artGraphs[3]
})

bigFishMural.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    bigFishMural.save();
  }
})

let lorcaMural = new Place({
  name: names[4],
  loc: locations[4],
  venueId: venueIds[4],
  artInfo: artGraphs[4]
})

lorcaMural.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    lorcaMural.save();
  }
})
