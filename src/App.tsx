import { Route, Routes } from "react-router-dom";
import { Spin } from 'antd';
import { useAppSelector } from './app/hooks';
import { selectLoader } from "./app/loaderSlice";
import { Navigation } from "./components/Navigation/Navigation";
import { Home } from "./pages/Home/Home";
import { Contacts } from "./pages/Contacts/Contacts";
import 'antd/dist/antd.min.css';

function App ()  {

  const { isLoading  } = useAppSelector(selectLoader);
  
  return (
    <div className="App">
      <Spin spinning={isLoading}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
      </Routes>
      </Spin>
    </div>
  );
}

export default App;