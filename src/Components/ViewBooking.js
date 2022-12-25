import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import { AiFillDelete } from "react-icons/ai"
import {MdModeEdit} from "react-icons/md"



const ViewBooking = () => {
    const [states, setStates] = useState({
        bookingId: "",
        bookingData: '',
        infoMsg: ""
    })

    let [details, setDetails] = useState({});
    const navigate = useNavigate();

    const onChange = (e) => {
        setStates({
            ...states,
            [e.target.name]: e.target.value
        });
    }

    const handleAction = (action) => {
        let id = parseInt(states.bookingId)
        if (action === 'onDelete') {
            axios.delete('https://my-json-server.typicode.com/sweti-singh/bookingJson/booking/' + id)
        }
        else if (action === 'onUpdate') {
            navigate(`/updateBooking/${id}`)
        }

    }

    const onSubmit = (event) => {
        event.preventDefault();
        let id = parseInt(states.bookingId)
        setStates({ ...states, bookingData: '', infoMsg: '' })
        axios.get('http://localhost:4000/booking/' + id).then(
            resp => {
                setDetails(resp.data);
                setStates({ ...states, bookingData: 'Data received!!!',infoMsg:"" })
            }
        ).catch(err => {
            setStates({ ...states, infoMsg: `Reservation for booking id: ${id} is not found`,bookingData:"" })

        })
    }

    return (
        <div>
            <h1 className="sub-heading">View Bookings..</h1>
            <div className="booking-form">
                <form onSubmit={onSubmit}>
                    <div className="form-element">
                        <label name="bookingId">Booking Id</label>
                        <input type='text' name="bookingId" onChange={onChange} />
                    </div>
                    <button type='submit'>Get Booking</button>

                    {states.bookingData !== "" ? <table className="content-table">
                        <thead>
                            <tr>
                                <th>Booking Id</th>
                                <th>Buffet Name</th>
                                <th>Email Id</th>
                                <th>Plate Count</th>
                                <th>Booking Date</th>
                                <th>Action Items</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>{details.id}</td>
                                    <td>{details.Caterers}</td>
                                    <td>{details.Email}</td>
                                    <td>{details.Plate}</td>
                                    <td>{details.Date}</td>
                                    <td><div className="icons">
                                        <div className="delete"><AiFillDelete onClick={() => handleAction('onDelete')}/></div>
                                        <div className="update"><MdModeEdit onClick={() => handleAction('onUpdate')}/></div>
                                        
                                        {/* <th><div><button onClick={() => handleAction('onUpdate')}>update</button> */}
                                    
                                        {/* <button onClick={() => handleAction('onDelete')}>delete</button> */}
                                    </div></td>
                                </tr>
                        </tbody>
                    </table> : null}<br></br>
                    <div className="error">{states.infoMsg}</div>
                    <div className="success">{states.bookingData}</div>
                </form>
            </div>
        </div>
    )

}

export default ViewBooking;
