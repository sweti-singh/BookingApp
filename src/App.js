import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateBooking from './Components/CreateBooking';
import ViewBooking from './Components/ViewBooking';
import UpdateBooking from './Components/UpdateBooking';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 className='Heading'>FLOATING RESTAURANT</h1><br></br>
        <div className='Link-class'>
            <Link className='link' to='/createBooking'>Book Buffet</Link>&nbsp;
            <Link className='link' to='/viewBooking'>View Booking</Link>
         </div>
      </div>

      <Routes basename={process.env.PUBLIC_URL}>
        <Route path='/' element={<CreateBooking />} />
        <Route path='/createBooking' element={<CreateBooking />} />
        <Route path='/viewBooking' element={<ViewBooking />} />
        <Route path='/updateBooking/:id' element={<UpdateBooking />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
