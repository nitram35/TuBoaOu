import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Group from './pages/Group'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route path='/group' element={<Group />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
