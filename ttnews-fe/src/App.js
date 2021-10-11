import Home from './components/Homepage/Home';
import { Header } from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { GlobalStyles } from './GlobalStyles';
import { News } from './components/News/Newspage';
const App =() => (
  
    <Router>
      <Header /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:title' element={<News />} />
      </Routes>
      
      <GlobalStyles />
    </Router>
  );


export default App;
