import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './layout/GlobalStyle';
import GeneralLayout from './layout/GeneralLayout';
import Main from './pages/main/MainPage.jsx';
import Apart from './pages/apart/Apart';
import Studio from './pages/studio/Studio';
import Office from './pages/office/Office';

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<GeneralLayout />}>
                    <Route path="" element={<Main />} />
                    <Route path="1" element={<Apart />} />
                    <Route path="2" element={<Studio />} />
                    <Route path="3" element={<Office />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
