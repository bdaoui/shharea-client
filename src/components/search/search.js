import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import Result from '../../pages/Result'
import {AuthContext} from '../../context/context';



const Search = () => {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("")

    const one = "http://localhost:5005/home/search/upload"
    const two = "http://localhost:5005/home/search/user"
    const three = "http://localhost:5005/home/search/comment"
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);

    const { searchResult, setSearchResult } = useContext(AuthContext);


useEffect(() => {
    axios
        .all([requestOne, requestTwo, requestThree])
        .then( axios.spread((...responses) => { setData([responses[0].data, responses[1].data, responses[2].data]) }))
        .catch((err) => console.log(err))
}, [])
    

const handleSearch = () => {

}

const images = data[0]
const users = data[1]
const comments = data[2]

let filteredImage = images?.filter((image) => { return image.name.toLowerCase().includes(query.toLowerCase())})
let filteredUser = users?.filter((user) => { return user.name.toLowerCase().includes(query.toLowerCase()) || user.username.toLowerCase().includes(query.toLowerCase()) })
let filteredComment= comments?.filter((comment) => { return comment.comment.toLowerCase().includes(query.toLowerCase())})




// // console.log(filteredComment)
// console.log(filteredImage)
// // console.log(filteredUser)



  return (

    <div>
        <textarea label="search" type="text" onChange={(e) => setQuery(e.target.value)} value={query} />
        <button onClick={handleSearch}>search</button>
    </div>



  )
}

export default Search