import showPost from './components/posts';
//import {showUpost, showMyProfile} from './components/profile'
import moment from 'moment';
import UPosts from './services/posts';
//import showMePost from './components/posts';

//import showMeProfile from './components/profile'

var me;
var tokens;

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
        window.localStorage.setItem("token", response.token);
       // sessionStorage.setItem('Token', response.token);
          alert("PERFECTO " + usuariodato.username + " Te has logueado correctamente, tu id es: " + usuariodato.id);
         window.location="page.html";
          
       }
   })
   .catch(error => console.error('Error:', error));
} 



function logout(){
    console.log("Saliendo");
    console.log("Adiós");
    localStorage.clear();
    window.location="index.html";



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
              <textarea class="form-control"input type="text"  placeholder="Título" id="titulo" rows="1"></textarea>
            </div>
            <h6 >Contenido:</h6>
            <div class="form-group">
              <textarea class="form-control" input type="text" placeholder="Contenido" id="contenido" rows="3"></textarea>
            </div>
            <h6 >Etiquetas:</h6>
            <div class="form-group">
              <textarea class="form-control" input type="text"  placeholder="Etiquetas separadas por comas (,)" id="tags" rows="1"></textarea>
            </div>
            <button type="submit" id="btn-nuevo-post" class="btn btn-primary">Enviar</button>
            </form>
        </div>
</div>`


var userPostTemplate =
    `<div>   
<h3 class="mt-4"> {{TITLE}} </h3>
<h5> Created:  {{FECHA}} </h5>
<p> {{BODY}} </p>
<h6> OOH <span style="color: blue"> <a href="#"  data-postid="{{POSTID}}"  id= "btn_like"> ME GUSTA </a> </span> </h6>
<h5> by: {{NAME}} <h5>
<h6> Likes: {{LIKES}}   -    Comments: {{NCOMMENTS}}   -    Views: {{VIEWS}}   -   Tags: {{TAGS}}  <h6>
<hr>
<div class="card my-4">
          <h5 class="card-header">Deje su comentario:</h5>
          <div class="card-body">
            <form>
              <div class="form-group">
                <textarea class="form-control" placeholder="Su comentario" rows="3"></textarea>
              </div>
              <button type="submit" id="btn_comment" class="btn btn-info">Enviar</button>
            </form>
          </div>
        </div>
</div>`


function showMeProfile(){
    console.log('Show MY Profile'); 

    var tokens = window.localStorage.getItem('token');
       
    fetch(`${API_PATH}/users/me`, {
        method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ tokens 
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
    var tokens = window.localStorage.getItem('token');

        fetch(`${API_PATH}/post/?userId=`+ me.id, {
        method: 'GET',
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ tokens 
            }
        })
        .then(res => res.json())
        .then(res=> {
          console.log(res);
          var idPost = res.id;
            var postView = '';
            res.forEach(p => {
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

function  submitPost(titulo,contenido, tags){

    console.log("Titulo: ", titulo);
    console.log("Contenido: ", contenido);
    console.log("Etiquetas: ", tags);

    var nuevoPost = {
        "title": titulo,
        "body": contenido,
        "tags": tags.split(',').map(Function.prototype.call, String.prototype.trim)
    };
    console.log(nuevoPost);
    var tokens = window.localStorage.getItem('token');

    fetch(`${API_PATH}/post/`, {
            method: 'POST',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + tokens 
            },
            body: JSON.stringify({
                "title": titulo,
                "body": contenido,
                "tags": tags.split(',').map(Function.prototype.call, String.prototype.trim)
 
            })
        })
        .then(function (data) {  
            console.log('Request success: ', data);  
            window.location="page.html";
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
        var tags = document.getElementById("tags").value;
        console.log(titulo, contenido, tags);
        submitPost(titulo, contenido, tags);
    
    });
}


var wsAvisoTemplate = 
`<div>
<br>   
<br>
<h4> Notificaciones</h4>
<br>   
<br>
<h5  class="lead"> {{NAME}} {{MENSAJE}} </h5>
<hr>
</div>`




function wsAvisos(datos){

    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode("Water");         // Create a text node
    
    //node.appendChild(textnode);                              // Append the text to <li>
   // document.getElementById("app2").appendChild(node); 


    console.log("El tipo de datos fue:", datos.type);

             switch(datos.type) {
                 case "logged":
                     console.log("El Usuario", datos.userName, "se ha logueado");
                   var profileView = '';
                   profileView = profileView +
                       wsAvisoTemplate.replace('{{NAME}}', datos.userName)
                       .replace('{{MENSAJE}}', "se ha logueado");

                    document.getElementById('app2').innerHTML = profileView;
                    break;

                     
                case "disconnected":
                   console.log("El Usuario", datos.userName, "se ha desconectado");
                   var profileView = '';
                    profileView = profileView +
                    wsAvisoTemplate.replace('{{NAME}}', datos.userName)
                    .replace('{{MENSAJE}}', "está desconectado");
                    document.getElementById('app2').innerHTML = profileView;
                    break;

                case "user-connected":
                    console.log("El Usuario se ha conectado");
                    var profileView = '';
                    profileView = profileView +
                    wsAvisoTemplate.replace('{{NAME}}', datos.userName)
                    .replace('{{MENSAJE}}', "se ha conectado");
                    document.getElementById('app2').innerHTML = profileView;
                    break;

                case "new-post":
                    console.log("se ha creado un nuevo post");
                    var profileView = '';
                    profileView = profileView +
                    wsAvisoTemplate.replace('{{NAME}}', "Se ha" )
                    .replace('{{MENSAJE}}', "creado un post");
                    document.getElementById('app2').innerHTML = profileView;


                    break;

                case "likes":
                    console.log("ALGUIEN HA DADO UN LIKE")
                    var profileView = '';
                    profileView = profileView +
                    wsAvisoTemplate.replace('{{NAME}}', "Se")
                    .replace('{{MENSAJE}}', "ha dado un like al post "+ datos.postTitle);
                    document.getElementById('app2').innerHTML = profileView;
                    break;
             }
}

function loadMe(){

    var tokens = window.localStorage.getItem('token');

    fetch(`${API_PATH}/users/me`,{
        headers:{
            'Authorization': 'Bearer '+ tokens 
        }
    })
    .then(res=>res.json())
    .then(res=>{
        console.log("EL USUARIO TUYO ES:", res.id);
        me = res;
        // return res.id;
        console.log('Loged')
    })
    .catch(err=> {
        // return 0;
        console.log(err);
    })
}



window.onload = function(){

    var tokens = window.localStorage.getItem('token');
   

    if(window.location.pathname === '/' && tokens !== null ) {
        console.log("TE MANDO A PAGE");
        window.location="page.html"
        //showPost();
    }
    else{
    
        if(tokens !== null && window.location.pathname === "/page.html" ){
            console.log('TU TOKEN ES ', tokens);
            console.log("veamos posts");
            loadMe();
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
            document.getElementById("get_out").addEventListener('click', function(){
                    logout();
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


