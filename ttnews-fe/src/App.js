import Home from './components/Homepage/Home';
// import { Header } from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { GlobalStyles } from './GlobalStyles';
import { News } from './components/Newspage/News';
import Profile from './components/Users/Profile';
import CreateNews from './components/Users/CreateNews';
import CreateTopics from './components/Users/CreateTopics';
import { HomeAdmin } from './components/Admin/Home';
import { Login } from './components/Login/Login';
import { DetailNews } from './components/Admin/ViewDetailNews';

const App =() => {
 
  return(
  <>
    
    <Router>
      <Switch>
        <Route exact path='/' component={()=><Home/>} />  
        <Route path='/login' component={()=><Login/>} />
        <Route path='/News/:NewsId' component={News} />
        <Route path='/profile' exact component={Profile} />
        <Route path="/profile/Thembaiviet" component={CreateNews}/>
        <Route path="/profile/Themchude" component={CreateTopics} />
        <Route exact path='/admin' component={HomeAdmin} />
        <Route path='/admin/news/viewdetail/:Newsid' component={DetailNews} />
      </Switch> 
      <GlobalStyles />
    </Router>
  </>
  )
};


export default App;
