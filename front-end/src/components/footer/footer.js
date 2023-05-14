import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter,faLinkedinIn} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return(
        <nav className="navbar fixed-bottom navbar-light bg-light ">
        <div className="container-fluid justify-content-center" style={{ backgroundColor: '#388087', color: '#FFF', padding: '10px', width: '100%',textAlign: 'center' }}>
          <p >"Hope is being able to see that there is light despite all of the darkness." ~ Desmond Tutu</p>
        </div>
        <div className='container-fluid justify-content-center'>
        <div>
            <Link className='link' to='https://twitter.com'>                 
               <FontAwesomeIcon icon={faTwitter} />
            </Link>
          </div>
          <div>
            <Link className='link' to='https://linkedin.com'>
               <FontAwesomeIcon icon={faLinkedinIn} />
            </Link>
          </div>
             
          </div>
      </nav>
    )
}