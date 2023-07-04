import { useState } from "react";


export default function RemoveQualification({qualificationId}) {

    console.log(qualificationId)
    const [isOpenModal,setModalState] = useState(false);

    const openModal = () => {
        ('#modal').modal('toggle');
    }

return(
    <div className="modal">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Are you sure you want to remove this qualification?</h4>       
                    <button 
                        type="button"
                        className="btn-close"
                        onClick={()=> openModal()}
                        aria-label="Close">
                    </button> 
                </div>
                <div className="modal-body">
                    <p>This will delete this qualification permanently. You cannot undo this action.</p> 
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn"
                    >
                        Delete
                    </button>
                </div>
            </div> 
        </div>
    </div>
)

}