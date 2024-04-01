import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import FindMeds from "./pages/FindMeds/FindMeds";
import SearchPage from "./pages/SearchPage/SearchPage";

import Details from "./pages/Details/Details";
import Header from "./components/Header/Header";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<FindMeds />} >
            <Route path="" element={<SearchPage />} />

            <Route path=":medId" element={<Details />} />
          </Route>
          <Route path="*" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
