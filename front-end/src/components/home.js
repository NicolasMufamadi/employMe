import { useEffect, useState } from "react"
import config from "../config";
import { useSelector } from "react-redux";
import { getUser } from "../store/slices/userSlice";

export default function Home(){

    const [jobs,setJobs] = useState([]);
    const user = useSelector(getUser);

    useEffect(() => {
        const fetchJobs = async() => {
           const request = await fetch(`${config.baseURL.endPoint}/job`);
           const response = await request.json();
           setJobs(response)
        }

        fetchJobs();
    },[])
     
    const apply = (job_id) => {

          fetch(`${config.baseURL.endPoint}/application`,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: user.user_id ,job_id: job_id})
          }).then(response => {
              console.log(response)
          })
    }


    
    
    return(
        <div className="container">
            <h1 className="mt-3">Available Jobs</h1>
            {
                jobs.map((job,index) => {
                    return(
                        <div key={index} className="row">
                            <div className="col-12">
                               <div className="card">
                                  <div className="card-body">
                                      <h2>{job.job_name}</h2>
                                      <p>Skills Required: </p>
                                      <p className="text-dark"> {job.job_skills}</p>
                                      <p >Job description:</p>
                                      <p className="text-dark">{job.job_description}</p>
                                      <button className="submitBtn" onClick={() => apply(job.job_id)}>Apply</button>
                                  </div>
                               </div> 
                            </div>    
                        </div>    
                    )
                })
            }
        </div>
    )
}