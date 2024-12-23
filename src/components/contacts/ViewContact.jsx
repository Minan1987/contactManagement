import React, { useEffect, useState, useContext } from 'react'
import { ContactContext } from '../../context/ContactContext';
import { CURRENTLINE, CYAN } from "../../helpers/colors";
import { Link, useParams } from 'react-router-dom';
// import { getContact, getGroup } from '../../services/contactServices';
import Spinner from '../Spinner';

const ViewContact = () => {
  const { contactId } = useParams()
  const { loading, getContactById, getGroupById } = useContext(ContactContext)
  const contact = getContactById(contactId)
  const group = contact ? getGroupById(contact.group) : null
  
  // const [state, setState] = useState({
  //   contact: {},
  //   group: {}
  // })

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(false)
  //       const { data: contactData } = await getContact(contactId)
  //       const { data: groupData } = await getGroup(contactData.group)
  //       setLoading(true)
  //       setState({ ...state , contact: contactData, group: groupData })
  //     } catch (err) {
  //       console.log(err)
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])

  // const { contact, group } = state

  return (
    <div className='row justify-content-center'>
      <div className="col-md-8 ">
        <div className="card my-4" style={{ backgroundColor: CURRENTLINE }}>
          <div className="card-body">
            <div className="row justify-content-around align-items-center">
              <h3 className='text-light'>اطلاعات کاربر:</h3>
              {loading ? (<Spinner />) : (
                <>
                  {Object.keys(contact).length > 0 &&
                    <>
                      <div className="col-sm-3">
                        <img src={contact.photo} alt={contact.fullname} className='rounded-2 w-100' />
                      </div>
                      <div className="col-sm-9">
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
                          <li className='list-group-item list-group-item-dark'>
                            شغل: {" "} <span className='fw-bold'>{contact.job}</span>
                          </li>
                          <li className='list-group-item list-group-item-dark'>
                            گروه: {" "} {group? <span className='fw-bold'>{group.name}</span>: "نامشخص"}
                          </li>
                        </ul>
                      </div>
                    </>
                  }
                </>
              )}

            </div>
          </div>
        </div>
        <div className="w-100 text-center">
          <Link to="/contacts" className='btn' style={{ backgroundColor: CYAN }}>بازگشت</Link>
        </div>
      </div>
    </div>
  )
}

export default ViewContact
