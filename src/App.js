import logo from './logo.svg';
import './App.css';

import WithSubnavigation from './component/Navbar';
import Home from './pages/Home';
import Footer from './component/Footer';
import SignIN from './pages/Login';
import SignUp from './pages/SignUp';
import AllRoutes from './AllRoutes/AllRoutes';

function App() {
  return (
    <div className="App">
 <WithSubnavigation/>
 <AllRoutes/>
 <Footer/>
    </div>
  );
}

export default App;
