import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import config from "../../config";
import { getUser } from "../../store/slices/userSlice";


export default function ViewApplications() {

    const [applications,SetApplication] = useState([]);
    const user = useSelector(getUser);

    useEffect(() => {
        const fetchapplications = async () => {
            try {
                const request = await fetch(`${config.baseURL.endPoint}/application/${user.user_id}`)
                const response = await request.json();
                console.log(response)
                SetApplication(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchapplications();
    },[])



    return(
       <div className="container">
            <h1 className="mt-3">My Applications</h1>
       </div>
    )

}