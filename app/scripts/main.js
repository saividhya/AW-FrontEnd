$(function() {
        $("#login-form").submit(function(e) {
            e.preventDefault();
            var data = {};
            data.username = $("#username").val();
            data.password = $("#password").val();
            var loginhistory = {};
            $.post("http://ec2-34-214-75-67.us-west-2.compute.amazonaws.com:8000/login", data)
            .done(function(msg){
                sessionStorage.setItem("username",msg.username.username);
                Cookies.set("username", msg.username.username);
                sessionStorage.setItem("sessionId",msg.id);
                Cookies.set("sessionId", msg.id);
                $.ajax({
                    type: 'GET',
                    url: "http://ec2-34-214-75-67.us-west-2.compute.amazonaws.com:8000/loginhistory",
                    data: {"username":msg.username.username,"sessionId":msg.id},
                    success: function(data, status){
                        loginhistory = data;
                        var t ='';
                        $.each(data, function(i, v) {
                            var status = '';
                            if(v.status=='false' || v.status == false)
                                status = "Logged out";
                            else
                                status = "Currently logged in";
                            var logoutTime ='';
                            if(v.logoutTime ==null || v.logoutTime=="null")
                                logoutTime = '';
                            else
                                logoutTime = v.logoutTime;
                            t += '<tr><td>'+status+'</td><td>'+v.loginTime+'</td><td>'+logoutTime+'</td></tr>';
                         });
                        sessionStorage.setItem('loginhistory', t);
                        window.location.href ="home.html";
                    },
                    dataType: "json",
                    async:false
                  });
            })
            .fail(function(response) {
                $("#error").text(JSON.parse(response.responseText))
                $('#login-form')[0].reset(); 
            });
            return false;
        });
        $('#login-form-link').click(function(e) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
            $('#register-form')[0].reset();     
            $("#registererror").text("")
            $("#message").text("")
            return false;
        });
        $('#register-form-link').click(function(e) {
            $("#register-form").delay(100).fadeIn(100);
             $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            $('#login-form')[0].reset();   
            $("#error").text("")  
            e.preventDefault();
        });
        $("#register-form").submit(function(e) {
            e.preventDefault();
            var data = {};
            data.username = $("#newusername").val();
            data.password = $("#newpassword").val();
            data.email = $("#email").val();
            $.post("http://ec2-34-214-75-67.us-west-2.compute.amazonaws.com:8000/users", data)
            .done(function(msg){
                $("#message").text("Successfully registered!");
                $('#register-form')[0].reset();          
            }).fail(function(response) {
                $("#registererror").text(JSON.parse(response.responseText))
                $('#register-form')[0].reset(); 
            });;
            return false;
        });  
    });

    