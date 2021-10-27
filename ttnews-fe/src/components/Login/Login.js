import react, {useState} from "react";
import { Wrapper } from "./Login.styles";
import { createBrowserHistory } from 'history';
import { Redirect } from "react-router-dom";
import Home from '../Homepage/Home'
import { useEffect } from "react/cjs/react.development";
import { Header } from "../Header";

export const Login=()=>{


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [user, setUser] = useState();



    // let history = createBrowserHistory();
    // //console.log(history);
    const [LoggedIn, setLoggedIn] = useState(false);

    const handleLogin=async(e)=>{
        e.preventDefault();
        const data ={username:username,password:password};
        await fetch(`https://localhost:44387/authenticate?username=${data.username}&password=${data.password}`)
        .then(res => res.json()
        ).then(data=>{
            console.log(data);
            localStorage.setItem('token',data.token);
            localStorage.setItem('iduser',data.newsuser.id);
            localStorage.setItem('user',data.newsuser);
            
            setRole(data.newsuser.role);
            //setUser(data.newsuser);
            setLoggedIn(true);
        })
        .catch(err =>{
            console.log(err);
        });
    }
    if(role=='user' && LoggedIn){
        return <Redirect to= {< Home/>} />
        
    }
    else if(role=='admin' && LoggedIn){
        return <Redirect to ='/admin'/>
    } 
    
       
    return(
        <>
        <Header />
        <Wrapper>
            <div className="title-loginpage">
                <h1 className="tt-news_title">TTNews</h1>
                <p className="tt-news_quote">Welcome you to our Website</p>
            </div>
            <form className="form-login">
                <h1>Đăng nhập</h1>
                <div className="form-group">
                    <label htmlFor="username">Tài khoản</label>
                    <input type="text" className="username" name="username" onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your username" autoComplete="off"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" className="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" autoComplete="off"/>
                </div>
                <div className="login">
                    <input type="submit" className="submit-login" name="login" value="Đăng nhập" onClick={handleLogin}/>
                </div>
    
                
                <div className="signup-option">
                    <p>Chưa có tài khoản ?</p>
                    <button className="sign-up" name="signup">Đăng ký</button>
                </div>
                
            </form>
        </Wrapper>
       </> 
    )
}
