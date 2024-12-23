import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ContactContext } from '../../context/ContactContext';
// import { getContact, getAllGroups, updateContact } from '../../services/contactServices';
import Spinner from '../Spinner';
import img from "../../../public/images/add-contact-img.png"
import Contacts from './Contacts';

const EditContact = () => {
  const { contactId } = useParams()
  const navigate = useNavigate()
  const {
    loading,
    setLoading,
    fetchContactForEdit,
    editableContact,
    onContactChangeEdit,
    editContactForm,
    groups,
  } = useContext(ContactContext);

  useEffect(() => {
    fetchContactForEdit(contactId);
  }, [contactId]);

  // const [contact, setContact] = useState({})

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       loading(true)
  //       const { data: contactData } = await getContact(contactId)
  //       loading(false)
  //       setContact(contactData)
  //     } catch (err) {
  //       console.log(err)
  //       loading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])


  // const onContactChangeEdit = (event) => {
  //   setContact({ ...contact,  [event.target.name]: event.target.value  })
  // }

  // const editContactForm = async (event) => {
  //   event.preventDefault()
  //   try {
  //     loading(true)
  //     const { data, status } = await updateContact(contact, contactId)

  //     if (data) {
  //       setLoadind(false)
  //       const allContacts = [...Contacts]
  //       const contactIndex=allContacts.findIndex((c)=> c.id ===parseInt(contactId))
  //       allContacts[contactIndex]= {...data}

  //       setContacts(allContacts)
  //       setFilteredContact(allContacts)
  //       navigate("/contacts")
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     loading(false)
  //   }
  // }


  return (
    <>
      {loading ? (<Spinner />) : (
        <>
          <div className='container'>
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={(event) => editContactForm(event, contactId)} className='form-group my-5'>
                  <input
                    name="fullname"
                    type="text"
                    className="form-control"
                    value={editableContact.fullname}
                    onChange={onContactChangeEdit}
                    required={true}
                    placeholder="نام و نام خانوادگی"
                  />
                  <input className='form-control mt-2'
                    type='text'
                    name='photo'
                    value={editableContact.photo}
                    onChange={onContactChangeEdit}
                    required={true}
                  />
                  <input className="form-control mt-2"
                    placeholder='موبایل'
                    type="text"
                    name='mobile'
                    value={editableContact.mobile}
                    onChange={onContactChangeEdit}
                    required={true}
                  />
                  <input className="form-control mt-2"
                    placeholder='ایمیل'
                    type="email"
                    name='email'
                    value={editableContact.email}
                    onChange={onContactChangeEdit}
                    required={true}
                  />
                  <input className="form-control mt-2"
                    placeholder='شغل'
                    type="text"
                    name='job'
                    value={editableContact.job}
                    onChange={onContactChangeEdit}
                    required={true}
                  />
                  <select className='form-control mt-2'
                    name='group'
                    value={editableContact.group}
                    onChange={onContactChangeEdit}
                    required={true}
                  >
                    <option>انتخاب گروه</option>
                    {
                      groups.length > 0 && groups.map((group) => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                      ))
                    }
                  </select>
                  <div className='mt-3 d-flex justify-content-between'>
                    <input className='btn btn-primary'
                      type='submit'
                      value="ویرایش مخاطب"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary mx-2"
                      onClick={() => navigate("/contacts")}
                    >
                      بازگشت
                    </button>
                  </div>
                </form>

              </div>
              <div className="col-6">
                <img src={img} alt="" width="100%" />
              </div>
            </div>
          </div>
        </>
      )
      }
    </>
  )
}

export default EditContact
