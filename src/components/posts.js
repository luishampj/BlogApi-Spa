import showUProfile from './profile';
//import {showUpost, showMyProfile} from './profile'
import moment from 'moment' 



var postTemplate =
    `<div>   
<h3 class="mt-4"> {{TITLE}}</h3>
<h5 class="lead"> by: {{NAME}} - <span style="color: yellow"> <a href="#" data-userid="{{USERID}}" class="btn_email"> {{EMAIL}} </a> </span> </h5>
<p class="text-justify lead"> {{BODY}}</p>
<h6> <i class="fab fa-gratipay" color="red"></i> Likes: {{LIKES}}   -  
     <i class="fas fa-comments"></i> Comments: {{NCOMMENTS}}   -  
     <i class="fas fa-eye"></i>  Views: {{VIEWS}}   -  
     <i class="fas fa-tags"></i> Tags: {{TAGS}}  
     </h6>
<hr>
</div>`




export default function showPost() {
    console.log('Show Posts');

    var postView = '';
    var tokens = window.localStorage.getItem('token');

    fetch(`${API_PATH}/post`, {
            headers: {
                'Authorization': 'Bearer ' + tokens
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);

            res.forEach(p => {
                // console.log(p);
                postView = postView +
                    postTemplate.replace('{{BODY}}', p.body)
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

            });
            document.getElementById('app').innerHTML = postView;
            var bes = document.getElementsByClassName('btn_email');
            

            for (var i = 0; i < bes.length; i++) {
                bes[i].addEventListener('click', showUProfile);
                
            }
        })
        .catch(err => {
            console.log(err);
        });

}



