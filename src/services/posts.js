export default class UPosts{


    async putLikes(idPost){ // Agrega Likes al Post ------------------------------------------
        
    
        //var ueObject = event.target;
       // console.log('SHow SOmething: ' + ueObject.textContent);
    
        //var idPost= ueObject.getAttribute('data-postid');
        console.log('Post Id = ' +idPost);

        fetch(`http://itla.hectorvent.com/api/post/${idPost}/like`, {
            method: 'PUT',
            
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 5755db3e-3413-4723-bcc9-1451bea8be95`
            }
        })
       //.then(res => res.json())
      // .then(response => console.log('YESSSuccess:', response))
       .catch(error => console.log('NOOOError:', error));
     
     
       
    }
    

  



     



}