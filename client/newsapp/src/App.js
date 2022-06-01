import { Route, Routes } from 'react-router-dom';
import './asset/css/global.css';
import Header from "./Component/Header";
import LogIn from './Component/LogIn';
import NewPost from './Component/NewPost';
import PrivateOutlet from './Component/PrivateOutlet';
import Profile from './Component/Profile';
import Register from './Component/Register';
function App() {
  return (
    <div className="App">
      <Header/>
       <Routes>
         
      <Route path="/login" element={<LogIn/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/*" element={<PrivateOutlet />}>  
      <Route path="profile/newpost" element={<NewPost/>}></Route>
      <Route path="profile" element={<Profile/>}></Route>
     </Route>
     </Routes>
    </div>
  );
}

export default App;
