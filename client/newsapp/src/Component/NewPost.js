import React from 'react';
import style from '../asset/css/newpost.module.css';
function NewPost()
{
const [title,setTitle]=React.useState('');
const [desc,setDes]=React.useState('');
const [cat,setCat]=React.useState('');
const submit=()=>{
    
}
const handleChange= (e)=>{
  const change=e.target.value;
 if(e.target.name==="title")
 {
     console.log(e);
     setTitle(change);
 }
 else if(e.target.name==="desc")
 {
     setTitle(change);
 }
 else if(e.target.name==="cat")
 {
     setTitle(change);
 }
}
return(
    <div className={style.newpost}>
        <h2>Create a New News</h2>
        <hr></hr>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleChange}></input>
        <label htmlFor="des">Description</label>
        <textarea type="text" name="desc" value={desc} onChange={handleChange}></textarea>
        <label htmlFor="cat">Category</label>
        <select name="cat" value={cat} onChange={handleChange}>
                    <option value="React">React</option>
                    <option value="Angular">Angular</option>
                    <option value="Vue">Vue</option>
                </select>
                <button type='submit' onClick={submit}>Submit</button>
    </div>
)
}

export default NewPost;