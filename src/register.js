

function register(){

    
    var name = document.getElementById("name").value
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    

    var data = {
        name: name,
        username: username,
        password: password,
        email: username
    };
    console.log(data);


    if(password != password2 ){
        alert ("Las contraseñas no coinciden");
    } else{ 

          
        fetch(`${API_PATH}/register`, {
            method: 'POST',
            body: JSON.stringify(data), //data can be string or object
            headers: {
                'Content-Type': 'application/json'
            }
        })
       .then(res => res.json())
       .then(response => console.log('YESSSuccess:', response))
       .catch(error => console.error('NOOOError:', error));

       alert ("FELICIDADES, " + name +" Usuario creado correctamente. Correo " + username);
       console.log("TE MANDO A PAGE");
       window.location="page.html" ;           
    }     
} 

window.onload = function(){

    console.log("HOLA NUEVO USUARIO");
    document.getElementById("btnRegistro").addEventListener('click', function(){
        register();
    });
}


