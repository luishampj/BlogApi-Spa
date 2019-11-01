import showPost from './components/posts';
//import showMePost from './components/posts';

//import showMeProfile from './components/profile'


function login(){

    //alert("Saludar Persona"); 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var data = {
        username: username,
        password: password,
        email: username
    };
    console.log(data);


   fetch(`${API_PATH}/login`, {
       method: 'POST',
       body: JSON.stringify(data), //data can be string or object
       headers: {
           'Content-Type': 'application/json'
       }
   })
   .then(res => res.json())
 //.then(response => console.log('Success:', response))
  //.catch(error => console.error('Error:', error));
  .then(response => {
       if(response.estatus && response.estatus == "error"){
           alert("PROBLEMA");          

             
       }else{
           var usuariodato  = {
               "id" : response.id,
               "username" : response.name
           };

        console.log(response.token)
        window.localStorage.setItem("Token", response.token);
       // sessionStorage.setItem('Token', response.token);

      

          alert("PERFECTO " + usuariodato.username + " Te has logueado correctamente, tu id es: " + usuariodato.id);
         window.location="page.html";
          
       }
   })
   .catch(error => console.error('Error:', error));

   

} 



var meTemplate =
`<div>   
<h1> {{NAME}}</h1>
<h4> {{EMAIL}} - ID: {{USERID}} </h4>
<h4> HE PUBLICADO - <span style="color: blue"> <a href="#"  data-userid="{{USERID}}" id= "btn_post"> {{POSTS}}  POSTS </a> </span> </h4>
<hr>
</div>`

var createPostTemplate = 
`<div class="card my-4">
    <h5 class="card-header">Crear Nuevo Post:</h5>
        <div class="card-body">
            <form>
             <div class="form-group">
             <h6 >Título del Post:</h6>
              <textarea class="form-control"input type="text"  id="titulo" rows="1"></textarea>
            </div>
            <h6 >Contenido:</h6>
            <div class="form-group">
              <textarea class="form-control" input type="text"  id="contenido" rows="3"></textarea>
            </div>
            <button type="submit" id="btn-nuevo-post" class="btn btn-primary">Enviar</button>
            </form>
        </div>
</div>`


function showMeProfile(){
    console.log('Show MY Profile');
    //document.getElementById('app').innerHTML = '<h1>My Profile</h1>';
    
    fetch(`http://itla.hectorvent.com/api/users/me`, {
        method: 'GET',
        
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 5755db3e-3413-4723-bcc9-1451bea8be95`
        }
    })

    .then(res => res.json())
    .then(res=> {
       console.log(res);
        var profileView= '';
       
            profileView = profileView+
            meTemplate.replace('{{NAME}}', res.name)
            .replace('{{EMAIL}}', res.email)
            .replace('{{USERID}}', res.id)
            .replace('{{POSTS}}', res.posts);

            

        document.getElementById('app').innerHTML=profileView;
        document.getElementById('btn_post').addEventListener('click',function(){
            showMePost();
        });
    })
.catch(err=> {
    console.log(err);

})


}

function showMePost(){
    console.log('Show My Posts');
    //document.getElementById('app').innerHTML = '<h1>My Posts List</h1>';
    console.log('FUNCION AUN NO ESTÁ LISTA');

    fetch(`http://itla.hectorvent.com/api/post/?userId=+me`, {
        method: 'GET',
        
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 5755db3e-3413-4723-bcc9-1451bea8be95`
            }
        })
        .then(res => res.json())
        .then(res=> {
          console.log(res);
          var idPost = res.id
            var postView = '';
            res.forEach(p =>{
         console.log(p);
                postView = postView +
                userPostTemplate.replace('{{BODY}}', p.body)
                .replace('{{NAME}}', p.userName)
                .replace('{{EMAIL}}', p.userEmail)
                .replace('{{USERID}}', p.userId)
                .replace('{{TITLE}}', p.title)
                .replace('{{LIKES}}', p.likes)
                .replace('{{TAGS}}', p.tags)
                .replace('{{VIEWS}}', p.views)
                .replace('{{NCOMMENTS}}', p.comments)
                .replace('{{FECHA}}', moment(p.createdAt).format('DD/MM/YYYY h:mm:ss a'))
                .replace('{{POSTID}}', p.id);
                console.log(p.liked);

            });
            document.getElementById('app').innerHTML=postView;
            var bes = document.getElementsByClassName('btn_email');
   
            for (var i= 0; i < bes.length; i++) {
                bes[i].addEventListener('click',showProfile);
            }

            document.getElementById('app').innerHTML=postView;

            document.getElementById('btn_like').addEventListener('click', async function(e){

                var idPost = e.target.getAttribute('data-postid');
                console.log('User Id = ' +idPost);
               

                let uposts = new UPosts()
                await uposts.putLikes(idPost)
            });



        })
    .catch(err=> {
        console.log(err);
    })
}

function  submitComment(titulo,contenido){

    console.log("Titulo: ", titulo);
    console.log("COntenido: ", contenido);
    var nuevoPost = {
        "title": titulo,
        "Body": contenido,
        "tags": ["nuevo"]
    };

    console.log(nuevoPost);

    fetch(`http://itla.hectorvent.com/api/post/`, {
            method: 'POST',
            
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 5755db3e-3413-4723-bcc9-1451bea8be95`
            },
            body: JSON.stringify({
                "title": titulo,
                "Body": contenido,
                "tags": ["nuevo"]  
            })
        })
        .then(function (data) {  
            console.log('Request success: ', data);  
          })  
          .catch(function (error) {  
            console.log('Request failure: ', error);  
          });
          
       //.then(res => res.json())
      // .then(response => console.log('YESSSuccess:', response))
      // .catch(error => console.log('NOOOError:', error));





}

function createPost(){
    document.getElementById('app').innerHTML=createPostTemplate;
    document.getElementById('btn-nuevo-post').addEventListener('click', function(){
        var titulo = document.getElementById("titulo").value;
        var contenido = document.getElementById("contenido").value;
        console.log(titulo, contenido);

       
        
    submitComment(titulo, contenido);
    
    });
}



var avisosWSTemplate = 
`<div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
<div class="toast" style="position: absolute; top: 0; right: 0;">
  <div class="toast-header">
    <img src="./img/Logo-IMG-2.jpg" class="rounded mr-2" alt="...">
    <strong class="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    Hello, world! This is a toast message.
  </div>
</div>
</div>`

function avisosWS(){
    console.log("Vamos a ver que hace esta función");
 
    document.getElementById('app').innerHTML=avisosWSTemplate;

}


function wsAvisos(datos){

    console.log("El tipo de datos fue:", datos.type);

             switch(datos.type) {
                 case "logged":
                     console.log("El Usuario", datos.userName, "se ha logueado");
                    alert("El Usuario "+ datos.userName + " se ha logueado");
                    avisosWS();
                     break;
                case "likes":
                    console.log("ALGUIEN HA DADO UN LIKE")
                    alert("ALGUIEN HA DADO UN LIKE");
                    avisosWS();
                    break;

                    //disconnected - new-post - user-connected
             }
}



window.onload = function(){

    var tokens = window.localStorage.getItem('Token');
    if(window.location.pathname === '/' && tokens !== null ) {
        console.log("TE MANDO A PAGE");
        window.location="page.html"
        //showPost();
    }
    else{
    
        if(tokens !== null && window.location.pathname === "/page.html" ){
            console.log('TU TOKEN ES ', tokens);
            console.log("veamos posts");
            showPost();
            

           document.getElementById("post_view").addEventListener('click', function(){
               showPost();
                });
            document.getElementById("mypost_view").addEventListener('click', function(){
                showMePost();
                });        
            document.getElementById("profile_view").addEventListener('click', function(){
                showMeProfile();
                });
            document.getElementById("create_post").addEventListener('click', function(){
                createPost();
                });

            var ws = new WebSocket(`${WS_PATH}?token=${tokens}`);
             ws.onmessage = function(e){
             console.log(e.data);           
             var datos= JSON.parse(e.data);
             console.log(datos);
             wsAvisos(datos);             
            };
        }else{
        console.log("NO Tenemos un token, hay que loguearse");
       
        console.log(tokens);
        console.log(window.location);
        document.getElementById("btnLogin").addEventListener('click', function(){
            login();
            });
        }
    }
}


