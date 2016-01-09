$(function(){
         var token;
         $('#login').on('click', function(e){
           e.preventDefault();
           $.post("http://localhost:8000/api/authenticate", {name: $('#name').val(), password: $('#password').val()},
         function(data){
           if(data.token){
             $('#login').hide();
             alert("login successful " + data.token);
             token = data.token;
             $.ajaxSetup({
               headers: {'x-access': token}
             });
           }
         })
         });
         $('#users-list').on('click', function(e){
           e.preventDefault();

           $.ajax({
            //  data: {token: token},
             url: 'http://localhost:8000/api/users',
             type: 'GET',
             success: function(data){
               for(var i in data){
                 $('#users').append('<li>' +data[i] +'</li>');
               }
             }
           });
        });
      });
