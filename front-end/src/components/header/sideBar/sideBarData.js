import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faChartSimple} from '@fortawesome/free-solid-svg-icons/faChartSimple';
import {faComment} from '@fortawesome/free-solid-svg-icons/faComment';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';

export const SideBarData = [

    {
       title: 'Home',
       path: '/',
       icon: <FontAwesomeIcon icon={faHome} />
    },

    {
        title: 'Users',
        path: '/manageusers/view-users',
        icon: <FontAwesomeIcon icon={faUser} size="lg"/>
    },
    {
        title: 'Applications',
        path: '',
        icon: <FontAwesomeIcon icon={faFile} size="lg"/>
    },
    {
        title: 'Companies',
        path: '',
        icon: <FontAwesomeIcon icon={faBuilding} />
    },
    {
        title: 'Reviews',
        path: '',
        icon: <FontAwesomeIcon icon={faComment} size="lg"/>
    },
    {
        title: 'Reports',
        path: '',
        icon: <FontAwesomeIcon icon={faChartSimple} size="lg"/>
    },

    
]