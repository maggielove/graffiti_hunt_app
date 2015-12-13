'use strict';
const client_id = 'foo' //process.env.CLIENT_ID;
const client_secret = 'bar' //process.env.CLIENT_SECRET;
const push_secret = 'foobar' //process.env.PUSH_SECRET;

$(function(){

  $('#credentials-test').click(function(event){
    event.preventDefault();

    console.log('clicked credentials-test button');

    $.ajax({
      // hard-coded route to test client_id, client_secret and other params
      url: 'https://api.foursquare.com/v2/venues/search?client_id=' + client_id + '&client_secret=' + client_secret + '&ll=40.7,-74&query=sushi&v=20140806&m=foursquare'
    }).done(function(data) {
      console.log(data)
    })
  })

})
