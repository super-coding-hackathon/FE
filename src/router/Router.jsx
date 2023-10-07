import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../layout/GlobalStyle';
import Main from '../pages/main/MainPage';
import RegisterPage from '../pages/register/RegisterPage';
import GeneralLayout from './../layout/GeneralLayout';
import Apart from './../pages/apart/Apart';
import Studio from './../pages/studio/Studio';
import Office from './../pages/office/Office';
import SignUp from '../pages/sign-up/SignUp';
import SignIn from '../pages/sign-In/SiginIn';

const Routeres = () => {
    return (
        <Router>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<GeneralLayout />}>
                    <Route path="" element={<Main />} />
                    <Route path="1" element={<Apart />} />
                    <Route path="2" element={<Studio />} />
                    <Route path="3" element={<Office />} />
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="sign-in" element={<SignIn />} />
                </Route>
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
};

export default Routeres;
