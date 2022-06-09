import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/error.module.css';
function ErrorPage()
{

return(
    <div className={style.cont}>
        <h1 className={style.h1}>Lost your way?</h1>
        <h4 className={style.h4}>Sorry, the page you are looking for is not available</h4>
        <NavLink to="/home">
        <button class={style.bt}>Go To Home Page</button>
        </NavLink>
    </div>
)
}

export default ErrorPage;