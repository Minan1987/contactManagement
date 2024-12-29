import React from 'react'
import { useFormik } from 'formik'
import { contactSchema } from '../../validations/contactSchema'
import { useContext } from 'react'
import { ContactContext } from '../../context/ContactContext'
import { Link } from 'react-router-dom'
import img from "/images/add-contact-img.png"
import Spinner from '../Spinner'

const AddContact = () => {
  const { loading, contact, groups, createContact } = useContext(ContactContext)
  const formik = useFormik({
    initialValues: {
      fullname: "",
      photo: "",
      mobile: "",
      email: "",
      job: "",
      group: ""
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      createContact(values)
    }
  })
  return (
    <>
      {loading ? (<Spinner />) :
        (
          <>
            <div className='container'>
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={formik.handleSubmit} className='form-group my-5'>
                    <input className='form-control'
                      placeholder='نام و نام خانوادگی'
                      type='text'
                      id='fullname'
                      name='fullname'
                      value={formik.values.fullname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {
                      formik.touched.fullname && formik.errors.fullname ?
                        <div className='text-danger'>{formik.errors.fullname}</div> : null
                    }
                    <input className='form-control mt-2'
                      placeholder='عکس'
                      type='text'
                      id='photo'
                      name='photo'
                      value={formik.values.photo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {
                      formik.touched.photo && formik.errors.photo ?
                        <div className='text-danger'>{formik.errors.photo}</div> : null
                    }
                    <input className="form-control mt-2"
                      placeholder='موبایل'
                      type="text"
                      id='mobile'
                      name='mobile'
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {
                      formik.touched.mobile && formik.errors.mobile ?
                        <div className='text-danger'>{formik.errors.mobile}</div> : null
                    }
                    <input className="form-control mt-2"
                      placeholder='ایمیل'
                      type="email"
                      id='email'
                      name='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {
                      formik.touched.email && formik.errors.email ?
                        <div className='text-danger'>{formik.errors.email}</div> : null
                    }
                    <input className="form-control mt-2"
                      placeholder='شغل'
                      type="text"
                      id='job'
                      name='job'
                      value={formik.values.job}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {
                      formik.touched.job && formik.errors.job ?
                        <div className='text-danger'>{formik.errors.job}</div> : null
                    }
                    <select className='form-control mt-2'
                      id='group'
                      name='group'
                      value={formik.values.group}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option>انتخاب گروه</option>
                      {
                        groups.length > 0 && groups.map((group) => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                        )
                      }
                    </select>
                    {
                      formik.touched.group && formik.errors.group ?
                        <div className='text-danger'>{formik.errors.group}</div> : null
                    }
                    <div className='mt-3 d-flex justify-content-between'>
                      <input className='btn btn-primary'
                        type='submit'
                        value="ساخت مخاطب"
                      />
                      <Link to="/contacts" className="btn btn-secondary">انصراف</Link>
                    </div>
                  </form>

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
