import React from 'react'
import { useContext } from 'react';
import { ContactContext } from '../../context/ContactContext';
import { IoSearchSharp } from "react-icons/io5";
import { PURPLE } from "../../helpers/colors"

const SearchContact = () => {
  const {contactQuery, searchContact} = useContext(ContactContext)
  return (
    <div className="d-flex justify-content-center" role="search">
      <input className="form-control me-2"
        type="search"
        value={contactQuery.text}
        onChange={searchContact}
        placeholder="جستجو"
        aria-label="Search"
        style={{ borderRadius: "0 5px 5px 0" }}
      />
      <span className='d-flex justify-content-center align-items-center' style={{backgroundColor: PURPLE, borderRadius:"5px 0 0 5px"}}><IoSearchSharp style={{margin:"0 10px"}}/></span>
    </div>
  )
}

export default SearchContact
