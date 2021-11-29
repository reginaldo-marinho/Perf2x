



export class MensagemBoxService{
    CloseMessageBox(){
      
        var msg = document.getElementById("messagebox");
        if(msg)
          for(let i=0; i < msg.classList.length;i++){
            if(msg.classList[i]=="message-box"){
              msg.classList.remove("message-box");
              msg.classList.add("message-box-end");
              break;
            }  
          }
      }
  
      OpenMessageBox(){
        var msg = document.getElementById("messagebox");
        if(msg)
          for(let i=0; i < msg.classList.length;i++){
            if(msg.classList[i]=="message-box-end"){
              msg.classList.remove("message-box-end");
              msg.classList.add("message-box");
              break;
          }   
        }
      }
}