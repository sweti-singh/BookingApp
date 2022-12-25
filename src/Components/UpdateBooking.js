import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../App.css'
import { validation } from "../validators/validation";

const UpdateBooking = () => {
    let params = useParams()
    let [booking, setBooking] = useState({
        Caterers: "",
        Email: '',
        Plate: null,
        Date: ""
    })

    let [newBooking, setNewBooking] = useState({
        Caterers: "",
        Email: '',
        Plate: null,
        Date: null
    })

    let [buffetName, setBuffetName] = useState("")
    let [emailId, setEmailId] = useState("")
    let [plateCount, setPlateCount] = useState(null)
    let [bookedOn, setBookedOn] = useState(null)

    let [success, setSuccess] = useState('')
    let [error, setError] = useState("")
    const [mandatory, setMandatory] = useState(false);
    const [valid, setValid] = useState(false);

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

    useEffect(() => {
        axios.get('https://my-json-server.typicode.com/sweti-singh/bookingJson/booking/' + params.id).then(resp => {
            setBooking(resp.data)
            console.log(booking)
        })
    }, [])

    const handleChange = (event) => {
        const value = event.target.value;
        setNewBooking({...newBooking,
            [event.target.name]: value
        });
        if(mandatory===true){
            setValid(false)
        }

        validateField(event)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newBooking.Caterers === "" || newBooking.Email === "" || newBooking.Date === null || newBooking.Plate === null) {
            setSuccess("")
            setMandatory(true)
            setError(messages.MANDATORY)
            setValid(true)

        }
        else{
            setError("")
        let justNowBooking = {
            Caterers: newBooking.Caterers,
            Email: newBooking.Email,
            Plate: newBooking.Plate,
            Date: newBooking.Date,
            id: newBooking.id
        }
        axios.put("https://my-json-server.typicode.com/sweti-singh/bookingJson/booking/" + params.id, justNowBooking).then(resp => setSuccess('successful')).catch(err => setError('failed'))}
    }

    const validateField = (event) => {
        setError("")
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
        <div>
            <h1 className="sub-heading">Update Booking..</h1>
            <div className="booking-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-element">
                        <label>caterer</label>
                        <select name="Caterers" type='text' placeholder={booking.Caterers} onChange={handleChange}>
                            <option selected disabled>select a buffet</option>
                            <option value="south indian food caterers">south indian food caterers</option>
                            <option value="north indian food caterers">north indian food caterers</option>
                        </select>
                        <br></br>
                        <div className="error">
                {formError.errorCaterers}<br></br>
                </div>
                    </div>
                    <div className="form-element">
                        <label name="Email">Email</label><br></br>
                        <input name="Email" placeholder={booking.Email} onChange={handleChange}></input><br></br>
                    </div>
                    <div className="error">
                {formError.errorEmail}<br></br>
                </div>
                    <div className="form-element">
                        <label name="Plate">Number of plates</label><br></br>
                        <input name="Plate" type='number' placeholder={booking.Plate} onChange={handleChange} /><br></br>
                    </div>
                    <div className="error">
                {formError.errorPlate}<br></br>
                </div>
                    <div className="form-element">
                        <label name="Date">Date</label><br></br>
                        <input name="Date" type='date' placeholder={booking.Date} onChange={handleChange} /><br></br>
                    </div>
                    <div className="error">
                {formError.errorDate}<br></br>
                </div>
                    <div>
                        <button type="submit" disabled={valid}>update</button><br></br>
                    </div>
            <div className="success">{success}</div>
            <div className="error">{error}</div>
            </form>
            </div>
        </div>
    )

}

export default UpdateBooking;
