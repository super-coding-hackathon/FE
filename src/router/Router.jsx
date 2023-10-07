import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "../layout/GlobalStyle";
import MainPage from "../pages/main/MainPage";
import RegisterPage from "../pages/register/RegisterPage";

const Routeres = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default Routeres;
