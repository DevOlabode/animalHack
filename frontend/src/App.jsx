import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoggedInHome from './views/LoggedInHome';
import NotLoggedInHome from './views/NotLoggedInHome';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';

import {isLoggedIn} from '../services/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= { isLoggedIn() ? < NotLoggedInHome/> : <LoggedInHome />} />
        <Route path="/signin" element={<SignInView />} />
        <Route path="/signup" element={<SignUpView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App