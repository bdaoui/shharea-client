import React, {useState} from 'react'
import Upload from '../components/upload/upload';
import Feed from '../components/feed/feed';


const HomePage = () => {
  const [refresh, setRefresh] = useState(false)

  return (
    <div>


      <Upload setRefresh={setRefresh} refresh={refresh}/>
      <Feed refresh={refresh}/>

        </div>
   
  )
}

export default HomePage