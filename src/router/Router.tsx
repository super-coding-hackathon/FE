import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../layout/GlobalStyle'
import Main from '../pages/main/MainPage'
import RegisterPage from '../pages/register/RegisterPage'
import Apart from '../pages/apart/Apart'
import Studio from '../pages/studio/Studio'
import Office from '../pages/office/Office'
import MyPage from '../pages/my/MyPage'
import NotFound from '../pages/NotFound'

import DetailPage from '../pages/detail/DetailPage'
import GeneralLayout from '../layout/GeneralLayout'
import SignUp from '../pages/auth/SignUp'
import SignIn from '../pages/auth/SiginIn'
import EditDetailPage from '../pages/detail/EditDetailPage'
import StepDetail from '../pages/transaction/TransactionDetail'

const Routeres = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<GeneralLayout />}>
          <Route path="" element={<Main />} />
          <Route path="apart" element={<Apart />} />
          <Route path="office" element={<Office />} />
          <Route path="studio" element={<Studio />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="/building/:homeId" element={<DetailPage />} />
          <Route path="/building/:homeId/edit" element={<EditDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/:roll/:transactionId/detail" element={<StepDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Routeres
