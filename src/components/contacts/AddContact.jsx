import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { contactSchema } from '../../validations/contactSchema'
import { useContext } from 'react'
import { ContactContext } from '../../context/ContactContext'
import { Link } from 'react-router-dom'
import img from "/images/add-contact-img.png"
import Spinner from '../Spinner'

const AddContact = () => {
  const { loading, groups, createContact } = useContext(ContactContext)
  return (
    <>
      {loading ? (<Spinner />) :
        (
          <>
            <div className='container'>
              <div className="row">
                <div className="col-md-6">
                  <Formik
                    initialValues={{
                      fullname: "",
                      photo: "",
                      mobile: "",
                      email: "",
                      job: "",
                      group: ""
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      createContact(values)
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
                          value="ساخت مخاطب"
                        />
                        <Link to="/contacts" className="btn btn-secondary">انصراف</Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-md-6">
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

export default AddContact
