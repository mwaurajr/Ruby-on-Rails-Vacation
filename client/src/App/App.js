import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  
  useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar.js';
import AvailableHouses from '../Components/AvailableHouses/AvailableHouses.js';
import UserProfile from '../Components/UserProfile/UserProfile.js';
import MyReviews from '../Components/MyReviews/MyReviews.js';
import MyVisits from '../Components/MyVisits/MyVisits.js';
import LoginSignUpPage from '../Components/LoginSignUpPage/LoginSignUpPage.js';
import HouseProfile from '../Components/HouseProfile/HouseProfile.js';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([])
  const [reviews, setReviews] = useState([])
  const [selectedState, setSelectedState] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://ruby-vacations-production-400a.up.railway.app/authorized_user')
    .then(r => {
      if(r.ok){
        r.json()
        .then(user => {
          setIsAuthenticated(true)
          setUser(user)
        })
      }
    })
  }, []);

  



  const unlockHouses = () => {
    fetch('https://ruby-vacations-production-400a.up.railway.app/houses')
    .then(r => r.json())
    .then(data => setHouses(data))
    }
  const unlockReviews = () => {
    fetch(`https://ruby-vacations-production-400a.up.railway.app/reviews/${user.id}`)
    // http://localhost:3000/reviews/by_user/
      .then((res) => res.json())
      .then((data) => setReviews(data))
  }


//   useEffect(() => { 
//   // if (user){
//   //   unlockHouses()
//   //   unlockReviews()
//   }
// }, [user])



  const filterHouses = () => {
    if(selectedState === "All"){
        return houses
    } else {
        return houses.filter(h => h.location.toLowerCase().includes(selectedState.toLowerCase()))
    }
}

  if(!isAuthenticated) return <LoginSignUpPage setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
  return (
      <div className="app">
        <Routes>
          
          <Route exact path="/" element={<LoginSignUpPage  setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>} />
             
         
          {/* <div> */}
            {/* <NavBar setUser={setUser} setIsAuthenticated={setIsAuthenticated} /> */}
            {/* <div className="body"> */}
              <Route exact path="/availablehouses" element={ <AvailableHouses houses={filterHouses()} setSelectedState={setSelectedState} selectedState={selectedState} /> } />
                  
              
              <Route path="/userprofile" element={ <UserProfile user={user}/> } />
                
              
              <Route path="/myvisits"element={ <MyVisits user={user} houses={houses}/> } />
                
              
              <Route path="/myreviews"element= { <MyReviews user={user} reviews={reviews} setReviews={setReviews} houses={houses}/>  } />
               
              
              <Route path="/availablehouses/:id"element=  { <HouseProfile user={user}/>  } />
              
              
            {/* </div> */}
          {/* </div> */}
        </Routes>
        <script src="https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js" ></script>
      </div>
      
  );
}
export default App;