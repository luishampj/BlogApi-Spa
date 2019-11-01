import showUProfile from './profile'

var postTemplate =
    `<div>   
<h3 class="mt-4"> {{TITLE}}</h3>
<h5 class="lead"> ddby: {{NAME}} - <span style="color: yellow"> <a href="#" data-userid="{{USERID}}" class="btn_email"> {{EMAIL}} </a> </span> </h5>
<p class="lead"> {{BODY}}</p>
<hr>

</div>`




export default function showPost() {
    console.log('Show Posts');

    var postView = '';

    fetch('http://itla.hectorvent.com/api/post', {
            headers: {
                'Authorization': 'Bearer 548d6de2-e0f0-4720-8b3d-5b129506aa46'
            }
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res);

            res.forEach(p => {
                // console.log(p);
                postView = postView +
                    postTemplate.replace('{{BODY}}', p.body)
                    .replace('{{NAME}}', p.userName)
                    .replace('{{EMAIL}}', p.userEmail)
                    .replace('{{USERID}}', p.userId)
                    .replace('{{TITLE}}', p.title);

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



