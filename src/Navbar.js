import { Route, Routes, Link } from "react-router-dom";
import Contact from "./Contact";
import Home from "./Home";
import Profile from "./Profile";
import Todo from "./Todo";
import { useTheme } from './ThemeContext';


const users = [
    {
      image:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg",
      name:"Thirumalesh",
      age:19,
      job:"Full Stack Developer"
  },
  {
    image:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg",
    name:"Thirumalesh",
    age:19,
    job:"Full Stack Developer"
  }, {
    image:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg",
    name:"Thirumalesh",
    age:19,
    job:"Full Stack Developer"
  }
  ]

function Navbar(){
  const { isDarkMode, toggleTheme } = useTheme();

    return <>
        <nav>
            <h3>Fish</h3>
            <ul className="links">
                <li className="nav-link"><Link to="/">Home</Link></li>
                <li className="nav-link"><Link to="/contact">Contact</Link></li>
                <li className="nav-link"><Link to="/cards">Cards</Link></li>
                <li className="nav-link"><Link to="/todo">Todo</Link></li>

            </ul>
        <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
        <h1>Dark Theme Toggle</h1>
        <button onClick={toggleTheme}>
        {isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        </button>
    </div>
        </nav>
        <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/cards" element={<Profile data={users} />}></Route>
                <Route path="/todo" element={<Todo />}></Route>
        </Routes>
    </>
}

export default Navbar;