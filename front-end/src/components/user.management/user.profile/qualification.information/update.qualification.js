import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import config from "../../../../config";

export default function UpdateQualification() {
  const navigate = useNavigate();
  const [qualification, setQualification] = useState({});
  const [type, setType] = useState("Bachelor's Degree");
  const [status, setStatus] = useState("In Progress");
  const [institution, setInstitution] = useState("");
  const [studyField, setStudyField] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [institutionErr, setInstitutionErr] = useState("");
  const [degreeErr, setDegreeErr] = useState("");
  const [startDateErr, setStartDateErr] = useState("");
  const [endDateErr, setEndDateErr] = useState("");

  const faculties = [
    { id: 1, name: "Faculty of Arts and Humanities" },
    { id: 2, name: "Faculty of Science" },
    { id: 3, name: "Faculty of Engineering" },
    { id: 4, name: "Faculty of Health Sciences" },
    { id: 5, name: "Faculty of Law" },
    { id: 6, name: "Faculty of Social Sciences" },
    { id: 7, name: "Faculty of Education" },
    { id: 8, name: "Faculty of Business and Economics" },
    { id: 9, name: "Faculty of Information Technology" },
    { id: 10, name: "Faculty of  Agriculture and Environmental Sciences" },
    { id: 11, name: "Faculty of Architecture and Planning" },
    { id: 12, name: "Faculty of Medicine" },
    { id: 13, name: "Faculty of Veterinary Science" },
    { id: 14, name: "Faculty of Pharmacy" },
    { id: 15, name: "Faculty of Dentistry" },
    { id: 16, name: "Faculty of Theology" },
    { id: 17, name: "Faculty of Journalism and Media Studies" },
    { id: 18, name: "Faculty of Sports Science" },
    { id: 19, name: "Faculty of Music" },
    { id: 20, name: "Faculty of Fine Arts" },
    { id: 21, name: "Other" },
  ];

  const [faculty, setFaculty] = useState(faculties[0].name);

  useEffect(() => {
    async function getQualification() {
      const qualificationId = localStorage.getItem("Id");
      console.log(qualificationId);
      const request = await fetch(
        `${config.baseURL.endPoint}/qualification/getbyqualification/${qualificationId}`
      );
      const response = await request.json();
      console.log(response);
      setQualification(response);
      setType(response.qualification_type);
      setInstitution(response.institution_name);
      setStatus(response.qualification_status);
      setStudyField(response.study_type);
      setFaculty(response.study_field);
      console.log(response.starting_date.substring(0,10))
      setStartDate("");
      setEndDate("");
    }

    getQualification();
  }, []);

  const validate = () => {
    let valid = true;

    if (institution === "") {
      setInstitutionErr("Required");
      valid = false;
    } else {
      setInstitutionErr("");
    }

    if (studyField === "") {
      setDegreeErr("Required");
      valid = false;
    } else {
      setDegreeErr("");
    }

    if (startDate === "") {
      setStartDateErr("Required");
      valid = false;
    } else {
      setStartDateErr("");
    }

    if (endDate === "") {
      setEndDateErr("Required");
      valid = false;
    } else {
      setEndDateErr("");
    }

    return valid;
  };

  async function updateQualification() {
    if (validate()) {
      console.log(!startDate)
      const request = await fetch('http://localhost:4444/qualification/'+qualification.qualification_id,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id: 2,
            qualification_type: type,
            qualification_status: status,
            institution_name: institution,
            study_field: faculty,
            study_type: studyField,
            starting_date: dayjs(startDate.$d).format('YYYY-MM-DD'),
            ending_date: dayjs(endDate.$d).format('YYYY-MM-DD')
        })
      });

      const response = await request.json()
      if(response.qualification_id){
        navigate('/myaccount/qualification-info/view-qualifications')
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mt-4">
        <div className="container">
          <h2>Update Qualification Information</h2>
          <div className="d-flex mb-3">
            <button
              type="button"
              className="btn text-light"
              style={{ backgroundColor: "#388087" }}
              onClick={() => navigate("/myaccount/qualification-info")}
            >
              Add Qualification
            </button>
            <button
              type="button"
              className="btn"
              style={{ marginLeft: "1rem", backgroundColor: " #C2EDCE" }}
              onClick={() =>
                navigate("/myaccount/qualification-info/view-qualifications")
              }
            >
              View Qualifications
            </button>
          </div>
          <form>
            <div className="row">
              <label className="label">Qualification Type</label>
              <div className="col-6">
                <select
                  className="form-select form-select-lg"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Higher Certificate">Higher Certificate</option>
                  <option value="National Diploma">National Diploma</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Honours Degree">Honours Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Doctoral Degree">Doctoral Degree</option>
                </select>
              </div>
            </div>
            <div className="row mt-1">
              <label className="label">Qualification Status</label>
              <div className="col-6">
                <select
                  className="form-select form-select-lg"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option defaultValue="In Progress" value="In Progress">
                    In-Progress
                  </option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="row mt-1">
              <label className="label">Institution Name</label>
              <div>
                <input
                  className="input col-6"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
                {institutionErr ? (
                  <p className="text-danger">{institutionErr}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="row">
              <label className="label">Faculty Name</label>
              <div className="col-6">
                <select
                  className="form-select form-select-lg"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  {faculties.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mt-1">
              <label className="label">Name of Degree/Diploma</label>
              <div className="col">
                <input
                  className="input col-6 text-wrap"
                  value={studyField}
                  onChange={(e) => setStudyField(e.target.value)}
                />
                {degreeErr ? <p className="text-danger">{degreeErr}</p> : <></>}
              </div>
            </div>
            <div className="d-flex mt-1">
              <div>
                <label className="label">Starting date</label>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
                {startDateErr ? (
                  <p className="text-danger">{startDateErr}</p>
                ) : (
                  <></>
                )}
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <label className="label">Ending Date</label>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
                {endDateErr ? (
                  <p className="text-danger">{endDateErr}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </form>
          <div className="mt-3"></div>
          <div className="mb-5">
            <button
              className="btn submitBtn mb-5"
              onClick={() => updateQualification()}
            >
              Save Changes
            </button>
          </div>
          <div style={{ marginBottom: "10rem" }}></div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
