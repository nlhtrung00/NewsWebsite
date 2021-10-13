import Home from './components/Homepage/Home';
import { Header } from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { GlobalStyles } from './GlobalStyles';
import { News } from './components/Newspage/News';
import Profile from './components/Users/Profile';
import CreateNews from './components/Users/CreateNews';
import CreateTopics from './components/Users/CreateTopics';
const App =() => (
  
    <Router>
      <Header /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/:NewsId' element={<News />} />
        <Route path='/profile' exact element={< Profile/>} />
        <Route path="/profile/Thembaiviet" element={<CreateNews/>}/>
        <Route path="/profile/Themchude" element={<CreateTopics/>} />
      </Routes>
      
      <GlobalStyles />
    </Router>
  );


export default App;
