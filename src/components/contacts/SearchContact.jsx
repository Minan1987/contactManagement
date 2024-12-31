import React from 'react'
import { useContext } from 'react';
import { ContactContext } from '../../context/ContactContext';
import { IoSearchSharp } from "react-icons/io5";
import { PURPLE } from "../../helpers/colors"

const SearchContact = () => {
  const { searchContact } = useContext(ContactContext)
  return (
    <div className="d-flex justify-content-center" role="search">
      <input className="form-control me-2"
        type="search"
        onChange={(event) => searchContact(event.target.value)}
        placeholder="جستجو"
        aria-label="Search"
        id="basic-addon1"
        style={{ borderRadius: "0 5px 5px 0" }}
      />
      <span className='d-flex justify-content-center align-items-center'
        style={{ backgroundColor: PURPLE, borderRadius: "5px 0 0 5px" }}
        aria-describedby="basic-addon1"
      >
        <IoSearchSharp style={{ margin: "0 10px" }} />
      </span>
    </div>
  )
}

export default SearchContact
