import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faUserPen } from "@fortawesome/free-solid-svg-icons/faUserPen";

const Button = styled.button`
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
  background-color: #388087;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0px 10px;

  &:hover {
    background-color: teal;
  }
`;

const DeleteButton = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0px 10px;

  &:hover {
    background-color: #990f02;
  }
`;
const Input = styled.input`
  color: #388087;
  margin-right: 10px;
  width: 25px;
  height: 25px;
`;

export default function ViewUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedId, setId] = useState(null);
  const [msg, setMessage] = useState("");
  const [userRole, setRole] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const request = await fetch(`${config.baseURL.endPoint}/user`);
      const response = await request.json();
      setUsers(response);
    }
    fetchUsers();
  }, []);



  const updateUser = (id) => {
    setId(id);;
  };

  const removeUser = (id) => {
    setId(id);
  };

  const handleDelete = async () => {
    const request = await fetch(
      `${config.baseURL.endPoint}/user/${selectedId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = await request.json();
    if (response.success) {
      setMessage("");
      navigate(0);
    } else if (response.denied) {
      setMessage(response.denied);
    } else {
      setMessage("Something went wrong please try again");
    }
  };

  const updateRole = async () => { 

    const request = await fetch(`${config.baseURL.endPoint}/user/${selectedId}`,{
      method: "PUT",
      headers: {"Content-Type" : "application/json"},
      body:JSON.stringify({userrole: userRole})
    })
 
    const response = await request.json()
    if(response.success){
      navigate(0);
    }
 
  }

  return (
    <>
      <div className="container">
        <h1 className="mt-2">Manage Users</h1>
        <div className="col-12">
          <input
            className="input-group"
            style={{ padding: "10px" }}
            placeholder="search user"
          />
        </div>
        <div className="mt-4"></div>
        <div className="row text-dark">
          <div className="col-4">
            <p>user</p>
          </div>
          <div className="col-3">
            <p>email</p>
          </div>
          <div className="col">
            <p>phone</p>
          </div>
          <div className="col">
            <p>gender</p>
          </div>
          <div className="col">
            <p>role</p>
          </div>
          <div className="col">
            <p>Actions</p>
          </div>
        </div>
        {users.map((item, index) => {
          return (
            <div className="card mb-3" key={item.user_id}>
              <div className="row fw-light text-dark mt-3">
                <div className="col-4">
                  <p style={{ marginLeft: "10px" }}>
                    {item.first_name} {item.middle_name} {item.last_name}
                  </p>
                </div>
                <div className="col-3">
                  <p>{item.email}</p>
                </div>
                <div className="col">
                  <p>{item.number_phone}</p>
                </div>
                <div className="col">
                  <p>{item.gender}</p>
                </div>
                <div className="col">
                  <p>{item.userrole}</p>
                </div>
                <div className="col">
                  <div>
                    <Button>
                      <FontAwesomeIcon
                        icon={faUserPen}
                        size="lg"
                        style={{ marginLeft: "10px", color: "#388087" }}
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        onClick={() => {
                          updateUser(item.user_id);
                        }}
                      />
                    </Button>
                    <Button>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="lg"
                        style={{ marginLeft: "10px", color: "red" }}
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => {
                          removeUser(item.user_id);
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="title">
                  Confirm action
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="close"
                  onClick={() => setMessage("")}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-center text-dark">
                  Are you sure you want to remove this user?
                </p>
                {msg ? <p className="text-danger">{msg}</p> : <></>}
              </div>
              <div className="modal-footer">
                <CancelButton
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={() => setMessage("")}
                >
                  Cancel
                </CancelButton>
                <DeleteButton onClick={() => handleDelete()}>
                  Delete
                </DeleteButton>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal"
          id="updateModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Manage user role</h4>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 form-check">
                  <Input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="admin"
                    value="Admin"
                    onClick={(e)=> setRole(e.target.value)}
                  ></Input>
                  <label
                    className="form-check-label text-dark fs-4"
                    htmlFor="admin"
                  >
                    Admin
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <Input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="manager"
                    value="Manager"
                    onClick={(e)=> setRole(e.target.value)}
                  ></Input>
                  <label
                    className="form-check-label text-dark fs-4"
                    htmlFor="manager"
                  >
                    Manager
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <Input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="hr"
                    value="HR"
                    onClick={(e)=> setRole(e.target.value)}
                  ></Input>
                  <label className="form-check-label text-dark fs-4" htmlFor="hr">
                    HR
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <Input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="employee"
                    value="Employee"
                    onClick={(e)=> setRole(e.target.value)}
                  ></Input>
                  <label
                    className="form-check-label text-dark fs-4"
                    htmlFor="employee"
                  >
                    Employee
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <CancelButton type="button" data-bs-dismiss="modal" onClick={() => setRole('')}>
                  Cancel
                </CancelButton>
                <DeleteButton type="button" onClick={()=> updateRole()}>
                  Confirm
                </DeleteButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
