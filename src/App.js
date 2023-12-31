//hooks
import { useAuthContext } from './hooks/useAuthContext';

//routing
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
//pages
import Signin from './pages/Singin';
import Signup from './pages/Signup';
import Create from './pages/Create';
import Dashbord from './pages/Dashbord';
import Project from './pages/Project';
import Profile from './pages/Profile';
//components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

//styles
import './styles/index.css';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            {!user && <Navbar />}
            <Routes>
              <Route
                path="/signin"
                element={user ? <Navigate to="/" /> : <Signin />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/signin" />}
              />
              <Route
                path="/"
                element={user ? <Dashbord /> : <Navigate to="/signin" />}
              />
              <Route
                path="/profile/:id"
                element={user ? <Profile /> : <Navigate to="/signin" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/signin" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
