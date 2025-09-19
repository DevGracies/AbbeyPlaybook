import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Explore from './pages/Explore';
import MainLayout from "./layouts/MainLayout";
import Profile from './pages/Profile';
import Playbook from './pages/Playbook';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/playbooks" element={<Playbook />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
