import React, { useEffect, useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from '../../validations/contactSchema';
import { Link,useNavigate, useParams } from 'react-router-dom';
import { ContactContext } from '../../context/ContactContext';
import { getContact, updateContact} from '../../services/contactServices'
import Spinner from '../Spinner';
import img from "/images/add-contact-img.png"
import Contacts from './Contacts';

const EditContact = () => {
  const { contactId } = useParams()
  const navigate = useNavigate()
  const {
    loading,
    setLoading,
    contacts,
    setContacts,
    setFilteredContacts,
    groups
  } = useContext(ContactContext);

  const [contact, setContact] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: contactData } = await getContact(contactId)
        setLoading(false)
        setContact(contactData)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const editContactForm = async (values) => {
    try {
      setLoading(true)
      const { data, status } = await updateContact(values, contactId)

      if (status==200) {
        setLoading(false)
        const allContacts = [...contacts]
        const contactIndex=allContacts.findIndex((c)=> c.id ===parseInt(contactId))
        allContacts[contactIndex]= {...data}

        setContacts(allContacts)
        setFilteredContacts(allContacts)
        navigate("/contacts")
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (<Spinner />) : (
        <>
          <div className='container'>
            <div className="row">
              <div className="col-md-6">
                <Formik
                  initialValues={{
                    fullname: contact.fullname,
                    photo: contact.photo,
                    mobile: contact.mobile,
                    email: contact.email,
                    job: contact.job,
                    group: contact.group
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    editContactForm(values)
                  }}
                >
                  <Form className='form-group my-5'>
                    <Field className='form-control'
                      placeholder='نام و نام خانوادگی'
                      type='text'
                      name='fullname'
                    />
                    <ErrorMessage name='fullname' render={msg => <div className='text-danger'>{msg}</div>} />

                    <Field className='form-control mt-2'
                      placeholder='عکس'
                      type='text'
                      name='photo'
                    />
                    <ErrorMessage name='photo' render={msg => <div className='text-danger'>{msg}</div>} />

                    <Field className="form-control mt-2"
                      placeholder='موبایل'
                      type="text"
                      name='mobile'
                    />
                    <ErrorMessage name='mobile' render={msg => <div className='text-danger'>{msg}</div>} />

                    <Field className="form-control mt-2"
                      placeholder='ایمیل'
                      type="email"
                      name='email'
                    />
                    <ErrorMessage name='email' render={msg => <div className='text-danger'>{msg}</div>} />

                    <Field className="form-control mt-2"
                      placeholder='شغل'
                      type="text"
                      name='job'
                    />
                    <ErrorMessage name='job' render={msg => <div className='text-danger'>{msg}</div>} />

                    <Field className='form-control mt-2'
                      name='group'
                      as='select'
                    >
                      <option>انتخاب گروه</option>
                      {
                        groups.length > 0 && groups.map((group) => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                        )
                      }
                    </Field>
                    <ErrorMessage name='group' render={msg => <div className='text-danger'>{msg}</div>} />
                    <div className='mt-3 d-flex justify-content-between'>
                      <input className='btn btn-primary'
                        type='submit'
                        value="ویرایش مخاطب"
                      />
                      <Link to="/contacts" className="btn btn-secondary">انصراف</Link>
                    </div>
                  </Form>
                </Formik>
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
