import showUProfile from "../components/profile";
import showMyPost from "../components/profile";
//import {showUpost, showMyProfile} from '../components/profile';


export default class UPosts{


    async putLikes(idPost, idUser){ // Agrega Likes al Post ------------------------------------------
       
        console.log("IdPost: ", idPost, "IdUser: ", idUser);
        
       //var ueObject = event.target;
       // console.log('SHow SOmething: ' + ueObject.textContent);
    
        //var idPost= ueObject.getAttribute('data-postid');
        console.log('Post Id = ', idPost);
        var tokens = window.localStorage.getItem('token');

        fetch(`${API_PATH}/post/${idPost}/like`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + tokens
            }
        })
       
       //.then(res => res.json())
      // .then(response => console.log('YESSSuccess:', response))
       .catch(error => console.log('NOOOError:', error));
       console.log("IdPost: ", idPost, "IdUser: ", idUser);
      //showMyPost(idUser);
    
       
    }


    async removeLikes(idPost, idUser){ // Quita Likes al Post ------------------------------------------
       
        console.log("IdPost: ", idPost, "IdUser: ", idUser);
        
       //var ueObject = event.target;
       // console.log('SHow SOmething: ' + ueObject.textContent);
    
        //var idPost= ueObject.getAttribute('data-postid');
        console.log('Post Id = ', idPost);
        var tokens = window.localStorage.getItem('token');

        fetch(`${API_PATH}/post/${idPost}/like`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + tokens
            }
        })
       
       //.then(res => res.json())
      // .then(response => console.log('YESSSuccess:', response))
       .catch(error => console.log('NOOOError:', error));
       console.log("IdPost: ", idPost, "IdUser: ", idUser);
       //showMyPost(idUser);
    
       
    }

}