

$('.logout-image').on('click', function(event) {
    $.post('/logout'}, function(response) {
        if (response == "Validado") {
            window.location.href = "http://localhost:3000/index.html"
        }else{
          alert(response);  
        }
    })
})

