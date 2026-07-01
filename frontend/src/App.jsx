import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotLoggedInHome from './views/NotLoggedInHome'
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< NotLoggedInHome/>} />
        <Route path="/signin" element={<SignInView />} />
        <Route path="/signup" element={<SignUpView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App