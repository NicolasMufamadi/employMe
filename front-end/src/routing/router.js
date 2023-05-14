import { Routes,Route } from 'react-router-dom';

import Login from '../components/authentication/login/login';
import Register from '../components/authentication/register/register';
import About from '../components/about/about';
import Home from '../components/home'
import Quotes from '../components/quotes/quotes';

export default function Router() {

    return(
        <div>
            <Routes>
                <Route path='/' element={<Home /> } />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/about' element={<About />} />
                <Route path='/quotes' element={<Quotes />} />
            </Routes>
        </div>
    )

}