import React from 'react'
import DailyIframe from '@daily-co/daily-js';

const Chat = () => {

    let callFrame = DailyIframe.wrap();

    return (
    <div>
        <h1>Chat</h1>
        {callFrame}
    </div>
  )
}

export default Chat