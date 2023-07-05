import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../../config";


export default function RemoveQualification({qualificationId}) {
    
    const navigate = useNavigate();


    const getId = () => {
       console.log(qualificationId)
       localStorage.setItem('IdToDelete',qualificationId)
       console.log(qualificationId)
    }
     
    
    const removebyId = async() => {
    
            const request = await fetch(`${config.baseURL.endPoint}/qualification/${localStorage.getItem('IdToDelete')}`,{
                method: 'DELETE'
            })
            const response = await request.json();
            if(response.rowCount === 1){
                navigate(0);
            }
    }


return(
    <div>
       
<button type="button" className="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> getId()}>
  delete
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" style={{marginLeft: '8rem'}} id="exampleModalLabel">Are you sure you want to remove this qualification?</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p className="text-center">This will delete this qualification permanently. You cannot undo this action.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-info text-light" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger text-light" onClick={()=>removebyId()}>delete</button>
      </div>
    </div>
  </div>
</div>

    </div>
)

}