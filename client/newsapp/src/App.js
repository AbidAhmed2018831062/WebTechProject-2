import { Helmet } from 'react-helmet';
import { Navigate, Route, Routes } from 'react-router-dom';
import './asset/css/global.css';
import About from './Component/About';
import EditProfile from './Component/EditProfile';
import ErrorPage from './Component/ErrorPage';
import Header from "./Component/Header";
import Home from './Component/Home';
import LogIn from './Component/LogIn';
import NewPost from './Component/NewPost';
import PrivateOutlet from './Component/PrivateOutlet';
import Profile from './Component/Profile';
import Register from './Component/Register';
import ShowSinglePost from './Component/ShowSinglePost';
import WatchandFav from './Component/WatchandFav';
function App() {
  return (
    <div className="App">
       <Helmet>
                <meta charSet="utf-8" />
                <title>Trendews</title>
            </Helmet>
      <Header/>
       <Routes>
         <Route path="/" element={<Navigate to="/home"/>}></Route>
      <Route path="/login" element={<LogIn/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/*" element={<PrivateOutlet />}>  
      <Route path="profile/newpost/:userId" element={<NewPost/>}></Route>
      <Route path="profile" element={<Profile/>}></Route>
      <Route path="home" element={<Home/>}></Route>
      <Route path="editprofile" element={<EditProfile/>}></Route>
      <Route path="post/:id" element={<ShowSinglePost />}></Route>
      <Route path="watchandfav/:what" element={<WatchandFav />}></Route>
      <Route path="about" element={<About />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
     </Route>
     </Routes>
    </div>
  );
}

export default App;
