import { Route, Routes } from 'react-router-dom';
import './asset/css/global.css';
import Header from "./Component/Header";
import NewPost from './Component/NewPost';
import Profile from './Component/Profile';
function App() {
  return (
    <div className="App">
      <Header/>
       <Routes>
      <Route path="/profile" element={<Profile/>}>
      </Route>
      <Route path="/profile/newpost" element={<NewPost/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
