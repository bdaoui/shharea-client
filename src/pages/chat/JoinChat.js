import React, {useState} from 'react'

const JoinChat = () => {

const [room, setRoom] = useState(null);

const handleJoin = (e) => {
    e.preventDefault();
    window.open(`/room/${room}`)
}

    return (
    <div>
        <span>Chat Rooms</span>
        <p>Enter the room you want to join</p>
        <input name="room" label="room" onChange={(e) => setRoom(e.target.value)} /> 
        <button onClick={handleJoin}>Join Room</button>
    </div>
    )
}

export default JoinChat