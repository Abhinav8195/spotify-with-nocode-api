
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Forget from './pages/Forget';
import { AuthContextProvider } from './context/AuthContext';
import SearchResults from './components/SearchResults.jsx';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
      <Route path='*' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forget' element={<Forget/>}/>
        <Route path="/search/:q" element={<SearchResults />} />
      </Routes>
    </AuthContextProvider>
    
  );
}

export default App;
