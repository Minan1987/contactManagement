import React from 'react'
import { CURRENTLINE, CYAN, ORANGE, RED } from "../../helpers/colors";
import { FaRegEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Contact = ({contact, deleteContact}) => {
  return (
    <div className='col-md-6'>
      <div className="card my-2" style={{ backgroundColor: CURRENTLINE }}>
        <div className="card-body">
          <div className="row justify-content-around align-items-center">
            <div className="col-sm-4">
              <img src={contact.photo} alt={contact.fullname} className='rounded-2 w-100' />
            </div>
            <div className="col-sm-7">
              <ul className='list-group pe-2'>
                <li className='list-group-item list-group-item-dark'>
                  نام و نام خانوادگی: {" "} <span className='fw-bold'>{contact.fullname}</span>
                </li>
                <li className='list-group-item list-group-item-dark'>
                  شماره تماس: {" "} <span className='fw-bold'>{contact.mobile}</span>
                </li>
                <li className='list-group-item list-group-item-dark'>
                  آدرس ایمیل: {" "} <span className='fw-bold'>{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-sm-1 d-flex flex-column align-items-center">
              <Link to={`/contacts/${contact.id}`} className='btn my-1' style={{ backgroundColor: ORANGE }}><FaRegEye /></Link>
              <Link to={`/contacts/edit/${contact.id}`} className='btn my-1' style={{ backgroundColor: CYAN }}><FaPencil /></Link>
              <button onClick={deleteContact} className='btn my-1' style={{ backgroundColor: RED }}><MdDelete /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
