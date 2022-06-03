import { Route, Routes } from 'react-router-dom';
import './asset/css/global.css';
import Header from "./Component/Header";
import Home from './Component/Home';
import LogIn from './Component/LogIn';
import NewPost from './Component/NewPost';
import PrivateOutlet from './Component/PrivateOutlet';
import Profile from './Component/Profile';
import Register from './Component/Register';
import ShowSinglePost from './Component/ShowSinglePost';
function App() {
  return (
    <div className="App">
      <Header/>
       <Routes>
      <Route path="/login" element={<LogIn/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/*" element={<PrivateOutlet />}>  
      <Route path="profile/newpost/:userId" element={<NewPost/>}></Route>
      <Route path="profile" element={<Profile/>}></Route>
      <Route path="home" element={<Home/>}></Route>
      <Route path="post/:id" element={<ShowSinglePost />}></Route>
     </Route>
     </Routes>
    </div>
  );
}

export default App;
