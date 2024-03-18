import logo from './logo.svg';
import './App.css';
import CodeForm from './components/CodeForm';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
   <>
    <NavBar/>
      <Outlet/>
   </>
  );
}

export default App;
