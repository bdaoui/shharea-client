import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Chat = () => {

const {id} = useParams()
    
useEffect(() => {
    const domain = 'https://shharea.daily.co/'
    axios
        .get(`http://localhost:5005/chat/room/${id}`)
        .then((res) => {
            if (res.status === 200){
                const script = document.createElement("script");
                script.innerHTML =  `window.DailyIframe.createFrame({
                    iframeStyle: {
                        position: 'absolute',
                            width: '100vw',
                            height: '100vh',
                            border: '0',
                            zIndex: "9999",
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