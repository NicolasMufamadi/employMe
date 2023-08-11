import { Routes,Route } from 'react-router-dom';

import Login from '../components/authentication/login/login';
import Register from '../components/authentication/register/register';
import About from '../components/about/about';
import Home from '../components/home'
import Quotes from '../components/quotes/quotes';
import Profile from '../components/user.management/user.profile/view.profile';
import PersonalDetails from '../components/user.management/user.profile/personal.details/view.all';
import UpdateName from '../components/user.management/user.profile/personal.details/update.names';
import UpdateEmail from '../components/user.management/user.profile/personal.details/update.email';
import UpdateContacts from '../components/user.management/user.profile/personal.details/update.contacts';
import UpdateGender from '../components/user.management/user.profile/personal.details/update.gender';
import UpdateAddressInformation from '../components/user.management/user.profile/address.information/update';
import QualificationInformation from '../components/user.management/user.profile/qualification.information/qualification';
import ViewQualifications from '../components/user.management/user.profile/qualification.information/view.qualifications';
import UpdateQualification from '../components/user.management/user.profile/qualification.information/update.qualification';
import ViewUsers from '../components/user/manage.user';
import Faqs from '../components/Faqs';
import ViewApplications from '../components/application/view';
export default function Router() {

    return(
        <div>
            <Routes>
                <Route path='/' element={<Home /> } />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/about' element={<About />} />
                <Route path='/quotes' element={<Quotes />} />
                <Route path='/myapplications' element={<ViewApplications/>} />
                <Route path='/myaccount' element={<Profile />}/>
                <Route path='/personal-details' element={<PersonalDetails />} />
                <Route path='/update-address' element={<UpdateAddressInformation />} />
                <Route path='/myaccount/qualification-info' element={<QualificationInformation />} />
                <Route path='/myaccount/qualification-info/view-qualifications' element={<ViewQualifications />} />
                <Route path='/myaccount/qualification-info/update-qualification' element={<UpdateQualification />} />
                <Route path='/personal-details/update-names' element={<UpdateName />} />
                <Route path='/personal-details/update-email' element={<UpdateEmail />} /> 
                <Route path='/personal-details/update-numbers' element={<UpdateContacts />} />
                <Route path='/personal-details/update-gender' element={<UpdateGender />} />
                <Route path='/manageusers/view-users' element={<ViewUsers />}/>
                <Route path='/faqs' element={<Faqs />} />
            </Routes>
        </div>
    )

}