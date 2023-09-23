import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import Purchase from './pages/Purchase'
import PaymentComplete from './PaymentComplete'
import Dashboard from './pages/Dashboard'
import Packages from './pages/Packages'
import TOS from './pages/TOS'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'

const App = () =>
{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Layout /> }>
                    <Route index element={ <Home /> } />
                    <Route path='/purchase/starter' element={ <Purchase packageName='Starter' /> } />
                    <Route path='/purchase/premium' element={ <Purchase packageName='Premium' /> } />
                    <Route path='/purchase/popular' element={ <Purchase packageName='Popular' /> } />
                    <Route path='/payment-complete' element={ <PaymentComplete /> } />
                    <Route path='/packages' element={ <Packages /> } />
                    <Route path='/dashboard' element={ <Dashboard /> } />
                    <Route path='/tos' element={ <TOS /> } />
                    <Route path='/privacy' element={ <PrivacyPolicy /> } />
                    <Route path='/refund' element={ <RefundPolicy /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App