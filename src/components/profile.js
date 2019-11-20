import UPosts from '../services/posts';
import moment from 'moment'


var userTemplate =
    `<div>   
<h1> Usuario: {{NAME}}</h1>
<h4> {{EMAIL}} - ID: {{USERID}} </h4>
<h4> HA PUBLICADO - <span style="color: blue"> <a href="#"  data-userid="{{USERID}}" id="btn_post"> {{POSTS}}  POSTS </a> </span> </h4>
<hr>
</div>`


var userPostTemplate =
    `<div>   
<h3 class="mt-4"> {{TITLE}} </h3>
<h4> Created:  {{FECHA}} </h4>
<p class="text-justify"> {{BODY}} </p>
 <h4> <span style="color: blue"> <a href="#"  data-postid="{{POSTID}}"  id= "btn_like"> ME GUSTA </a> </span> 
 <!--<button type="submit" href="#" data-postid="{{POSTID}} id="btn_like" class="btn btn-success">Me gusta</button>-->
<span style="color: blue"> <a href="#"  data-postid2="{{POSTID2}}"  id="btn_noLike"> NO ME GUSTA </a> </span></h4>
<h5> by: {{NAME}} <h5>
<h6> <i class="fab fa-gratipay" color="red"></i> Likes: {{LIKES}}   -  
     <i class="fas fa-comments"></i> Comments: {{NCOMMENTS}}   -  
     <i class="fas fa-eye"></i>  Views: {{VIEWS}}   -  
     <i class="fas fa-tags"></i> Tags: {{TAGS}}  
     </h6>
<hr>
<div class="card my-4">
          <h5 class="card-header">Deje su comentario:</h5>
          <div class="card-body">
            <form>
              <div class="form-group">
                <textarea id="commentario" class="form-control" "Su comentario" rows="3"></textarea>
              </div>
              <button type="submit" href="#" data-postid3="{{POSTID3}}"  id="btn_comment" class="btn btn-info">Enviar comentario</button>
            </form>
          </div>
        </div>

</div>`








export default  function showUProfile() { // MUESTRA LOS DATOS DEL USUARIO ------------------------------------------
    console.log('Show User Profile');

    var ueObject = event.target;
    console.log('Profile User: ' + ueObject.textContent);
    var tokens = window.localStorage.getItem('token');

    var idUser = ueObject.getAttribute('data-userid');
    console.log('User Id = ' + idUser);

    fetch(`${API_PATH}/users/`+ idUser, {
            headers: {
                'Authorization': `Bearer ` + tokens
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            var profileView = '';

            profileView = profileView +
                userTemplate.replace('{{NAME}}', res.name)
                .replace('{{EMAIL}}', res.email)
                .replace('{{USERID}}', res.id)
                .replace('{{POSTS}}', res.posts);

            document.getElementById('app').innerHTML = profileView;
            document.getElementById('btn_post').addEventListener('click', function () {
                showMyPost(idUser)
            });
        })
        .catch(err => {
            console.log(err);

        })


}


function showMyPost(idUser) { // MUESTRA LOS POSTS DEL USUARIO ------------------------------------------
    console.log('Show ALL Posts FROM USER', idUser);
    var tokens = window.localStorage.getItem('token');
    
    fetch(`${API_PATH}/post/?userId=` + idUser, {
            headers: {
                'Authorization': `Bearer ` + tokens
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            var idPost = res.id
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
                    .replace('{{POSTID}}', p.id)
                    .replace('{{POSTID2}}', p.id)
                    .replace('{{POSTID3}}', p.id);
                console.log(p.liked)
                console.log(p.id);

            });
            document.getElementById('app').innerHTML = postView;
            var bes = document.getElementsByClassName('btn_email');

            for (var i = 0; i < bes.length; i++) {
                bes[i].addEventListener('click', showProfile);
            }

            

            document.getElementById('app').innerHTML = postView;

            document.getElementById('btn_comment').addEventListener('click', function (e) {
                var idPost = e.target.getAttribute('data-postid3');
                var commentario = document.getElementById("commentario").value;
                console.log('EL ID DEL Post QUE VAMOS A TRABAJAR ES Id = ' + idPost);
                submitCommentario(idPost, commentario)
            });

            document.getElementById('btn_like').addEventListener('click', async function (e) {

                var idPost = e.target.getAttribute('data-postid');
                console.log('Post Id = ' + idPost);
                console.log('User Id = ' + idUser);
                console.log('Clicaron LIKE');
                let uposts = new UPosts()
                await uposts.putLikes(idPost, idUser)
            });

            document.getElementById('btn_noLike').addEventListener('click', async function (e) {

                var idPost = e.target.getAttribute('data-postid2');
                console.log('Post Id = ' + idPost);
                console.log('User Id = ' + idUser);
                console.log('Clicaron NoLIKE');
                let uposts = new UPosts()
                await uposts.removeLikes(idPost, idUser)
            });
        })
        .catch(err => {
            console.log(err);
        })
}



function submitCommentario(idPost, commentario){
    console.log("Funcion para agregar comentario a un post" );

    console.log("ID POST ", idPost, "Comentario :", commentario);
    //var comm = {commentario};
  
    var tokens = window.localStorage.getItem('token');

    fetch(`${API_PATH}/post/`+idPost+`/comment`, {
            method: 'POST',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + tokens 
            },
           // body: JSON.stringify(commentario)
           body: JSON.stringify(commentario)
           
        
        })
        .then(res => res.json())
        .then(json => {
            console.log('res', json);
       // .then(function (data) {  
            //console.log('Request success: ', data);  
           // window.location="page.html";
          })  
          .catch(function (error) {  
            console.log('Request failure: ', error);  

          });

    
}

