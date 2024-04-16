import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import List from './pages/list/List';
import Homestay from './pages/homestay/Homestay'
import ListHomestay from './pages/list/ListHomestay';
import SignUp from './account/login/SignUp';
import SignIn from './account/login/SignIn';
import SignOut from './account/login/SignOut';
import RoomList from './pages/room/RoomList';
import AddRoom from './pages/room/AddRoom';
import Reserve from './components/reserve/Reserve';
import RequireAuth from './account/auth/RequireAuth';
import Profile from './account/profile/Profile';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rooms" element={<List/>}/>
        <Route path="/rooms/:id" element={<Homestay/>}/>
        <Route path="/list" element={<ListHomestay/>} />

        <Route path='/booking' element={
          <RequireAuth>
        <Reserve/>
          </RequireAuth>
        } />

        <Route path='/manage-room' element={<RoomList/>}/>
        <Route path='/add-room' element={<AddRoom/>}/>

        <Route path='/profile' element={<Profile/>}/>
        <Route path='/signup' element= {<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/' element={<SignOut/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App