import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Home } from "./pages/Home/Home";
import { Contacts } from "./pages/Contacts/Contacts";
import 'antd/dist/antd.min.css';

function App ()  {
  
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
      </Routes>
    </div>
  );
}

export default App;