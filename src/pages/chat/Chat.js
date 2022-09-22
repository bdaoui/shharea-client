import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Chat = () => {

const {id} = useParams()
    
useEffect(() => {
    const domain = 'https://shharea.daily.co/'
    axios
        .get(`https://mittens-buffalo.cyclic.app/chat/room/${id}`)
        .then((res) => {
            if (res.status === 200){
                const script = document.createElement("script");
                script.innerHTML =  `window.DailyIframe.createFrame({
                    iframeStyle: {
                        position: 'fixed',
                        top: 20,
                        width: '100%',
                        height: '80%',
                    },
                    showLeaveButton: true,
                })
                .join({
                    url: '${domain}${id}',
                });`;
                document.body.appendChild(script);
            }
        })
        .catch(err => console.log(err));
}, [id]);

  return (
   <>
   </>
  )
}

export default Chat