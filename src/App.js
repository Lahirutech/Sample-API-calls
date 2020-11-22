import React,{useState,useEffect} from "react";
const axios = require('axios');
export default function App() {
  const [counter,setCounter]=useState(0)
  const [randomUserData,setRandomUserData]=useState('')
  const[basicInfo,setBasicInfo]=useState([])
  const[pageNumber,setPageNumber]=useState(1)



const fetchdata=(pageNumber)=>{
  return axios.get(`https://randomuser.me/api/?page=${pageNumber}`)
  .then(({data})=> { 
    // handle success
  console.log(data)
  return data
  })
  .catch( (error)=> {
    // handle error
    console.log(error);
  })
  
}
  useEffect(()=>{
    fetchdata().then(randomData =>{
    setBasicInfo(randomData.results)
    })
  },[])

      console.log(basicInfo)


// const myData= basicInfo.map((userInfor,id)=>{
//   return(
//     <p>{userInfor.name} </p>
//   )
// })

const increment =()=>{
  setCounter(counter+1)
}

const decrement =()=>{
  if(counter >0){
    setCounter(counter-1)
  }
  
}
const moreImages=()=>{
  fetchdata(pageNumber).then((randomData) =>{
    const newUserInfo=[
      ...basicInfo,
      ...randomData.results,
    ]
    setBasicInfo(newUserInfo)
    setPageNumber(randomData.info.page+1)

    })

}


const getFullUserName= (userinfo)=>{
  const {name:{first,last}}=userinfo
  return `${first} ${last}`
}
  
  
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    {counter} <br/>


    <button onClick={()=> increment()}> Incremenet </button> <br/>
    <button onClick={()=> fetchdata()}> FetchData </button>
    <button onClick={()=>moreImages()}> More Images</button>
{
  basicInfo.map((userinfo,idx)=>(
    <div key={idx}> 
    <p> {getFullUserName(userinfo)}</p>
    <img src={userinfo.picture.thumbnail}/>
    </div>
  ))
}
  
    </div>
  );
}
