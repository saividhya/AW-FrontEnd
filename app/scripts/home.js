$(function() {
    $( document ).ready(function() {
        $("#loginhistory").append(sessionStorage.getItem('loginhistory'));
        $('#accountname').css('font-size', '30px');
        $("#accountname").text("Welcome "+sessionStorage.getItem("username")+",");
        $.ajax({
            type: 'GET',
            url: "http://ec2-34-214-75-67.us-west-2.compute.amazonaws.com:8000/events",
            data: {"username":sessionStorage.getItem("username"),"sessionId":sessionStorage.getItem("sessionId")},
            success: function(data, status){
                $.each(data, function(i, v) {
                    $("#eventstable").append("<tr><td style='word-wrap: break-word;min-width: 160px;max-width: 160px;'>"+v.action+"</td><td>"+v.eventTime+"</td><td>"+JSON.stringify(v.attribute)+"</td></tr>");
                 });
            },
            dataType: "json",
            async:false
          });


    });

    $("#logout").click(function(event){
        event.preventDefault();
        $.ajax({
            url: 'http://ec2-34-214-75-67.us-west-2.compute.amazonaws.com:8000/logout',
            type: 'PUT',
            data: {"username":sessionStorage.getItem("username"),"sessionId":sessionStorage.getItem("sessionId")},
            success: function(data) {
                window.location.href ="index.html";
                sessionStorage.clear();
                localStorage.clear();
                Cookies.remove('username');
                Cookies.remove('sessionId');   
            }
          });
        return false;
    });
    
});