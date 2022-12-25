/* eslint-disable default-case */
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { validation } from "../validators/validation";
import axios from "axios";
import '../App.css'

const CreateBooking = () => {
    //const navigate = useNavigate();
    const [mandatory, setMandatory] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [valid, setValid] = useState(false);
    const [state, setState] = useState({
        Caterers: "",
        Email: '',
        Plate: null,
        Date: null
    })

    const [messages] = useState({
        "EMAILID_ERROR": "PLEASE ENTER VALID EMAIL",
        "PLATE_COUNT_ERROR": "PLATE COUNT SHOULD BE 1 OR MORE",
        "CATERER NAME ERROR": "PLEASE SELECT BUFFET TYPE",
        "BOOKED_ON_ERROR": "BOOKING DATE SHOULD BE AFTER TODAY'S DATE",
        "ERROR": "SOMETHING WENT WRONG",
        "MANDATORY": "ENTER ALL THE FORM FIELD",
        "SUCCESS":"EVERYTHING WAS SUCCESSFUL"
    })

    const [formError, setFormError] = useState({
        errorCaterers: "",
        errorEmail: '',
        errorPlate: '',
        errorDate: '',
    })



    const handleChange = (event) => {
        const value = event.target.value;
        setState({...state,
            [event.target.name]: value
        });
        if(mandatory===true){
            setValid(false)
        }

        validateField(event)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(state);
        if (state.Caterers === "" || state.Email === "" || state.Date === null || state.Plate === null) {
            setMandatory(true)
            setErrorMsg(messages.MANDATORY)
            setValid(true)

        }
        else {
            //setValid(false)
            setErrorMsg("")
            try{
            const resp= await axios.post('http://localhost:4000/booking', {
                Caterers: state.Caterers,
                Email: state.Email,
                Plate: state.Plate,
                Date: state.Date
            })
            //setState([...state,resp.data])
            setSuccessMsg(`booking id: ${resp.data.id}`)
        }
        catch(err){
                    setErrorMsg(messages.ERROR)
                }
                
        }
    }

    const validateField = (event) => {
        setErrorMsg("")
        //let errors = formError;
        switch (event.target.name) {
            case "Caterers":
                if (!validation.validateBuffet(event.target.value)) {
                    setFormError({...formError, errorCaterers: messages["CATERER NAME ERROR"] })
                    setValid(true)
                }
                else{
                    setFormError({...formError,errorCaterers:""})
                    if(formError.errorDate===""&&formError.errorEmail===""&&formError.errorPlate===""){
                        setValid(false)
                    }
                }

                break;

            case "Email":
                if (!validation.validateEmail(event.target.value)) {
                    setFormError({...formError, errorEmail: messages.EMAILID_ERROR })
                    setValid(true)
                }
                else{
                    setFormError({...formError, errorEmail:""})
                    if(formError.errorCaterers===""&&formError.errorDate===""&&formError.errorPlate===""){
                        setValid(false)
                    }
                }
               
                break;

            case "Plate":
                if (!(validation.validatePlate(event.target.value))) {
                    setFormError({...formError, errorPlate: messages["PLATE_COUNT_ERROR"] })
                    setValid(true)
                }
                else{
                    setFormError({...formError, errorPlate:""})
                    if(formError.errorCaterers===""&&formError.errorDate===""&&formError.errorEmail===""){
                        setValid(false)
                    }
                }
                break;

            case "Date":
                if (!validation.validateDate(event.target.value)) {
                    setFormError({...formError, errorDate: messages["BOOKED_ON_ERROR"] })
                    setValid(true)
                }
                else{
                    setFormError({...formError, errorDate:""})
                    if(formError.errorCaterers===""&&formError.errorEmail===""&&formError.errorPlate===""){
                        setValid(false)
                    }
                    
                }
                break;
                

            default:
              
                break;

        }
        //setFormError(errors);
        // setState({
        //     [event.target.name]: event.target.value
        // });

    }

    return (
        <div className="booking-form">
            <form onSubmit={handleSubmit}>
                <div className="form-element">
                <label name="Caterers">Select Buffet Type:</label><br></br>
                <select name="Caterers" type='text'  onChange={handleChange}>
                    <option selected disabled>select a buffet</option>
                    <option value="south indian food caterers">south indian food caterers</option>
                    <option value="north indian food caterers">north indian food caterers</option>
                </select>
                <br></br>
                </div>
                <div className="error">
                {formError.errorCaterers}<br></br>
                </div>
                <div className="form-element">
                <label name="Email">Email Id:</label><br></br>
                <input name="Email" value={state.Email} onChange={handleChange}></input><br></br>
                </div>
                 <div className="error">
                {formError.errorEmail}<br></br>
                </div>
                <div className="form-element">
                <label name="Plate">Number of Plates:</label><br></br>
                <input name="Plate" type='number'  onChange={handleChange} /><br></br>
                </div>
                <div className="error">
                {formError.errorPlate}<br></br>
                </div>
                <div className="form-element">
                <label name="Date">Date of Booking:</label><br></br>
                <input name="Date" type='date'  onChange={handleChange} /><br></br>
                </div>
                <div className="error">
                {formError.errorDate}<br></br>
                </div>
                
                <button type="submit" disabled={valid}>Submit</button><br></br>
               
                <div className="success">
                {successMsg.length>0 ? <div>{successMsg}</div>:null}</div>
                <div className="error">
                {errorMsg}
                </div>
            </form>
        </div>
    )

}

export default CreateBooking;