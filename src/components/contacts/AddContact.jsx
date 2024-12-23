import React from 'react'
import { useContext } from 'react'
import { ContactContext } from '../../context/ContactContext'
import { Link } from 'react-router-dom'
import img from "../../../public/images/add-contact-img.png"
import Spinner from '../Spinner'

const AddContact = () => {
  const { loading, contact, onContactChange, groups, createContact } = useContext(ContactContext)
  return (
    <>
      {loading ? (<Spinner />) :
        (
          <>
            <div className='container'>
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={createContact} className='form-group my-5'>
                    <input className='form-control'
                      placeholder='نام و نام خانوادگی'
                      type='text'
                      name='fullname'
                      value={contact.fullname}
                      onChange={onContactChange}
                      required={true}
                    />
                    <input className='form-control mt-2'
                      placeholder='عکس'
                      type='text'
                      name='photo'
                      value={contact.photo}
                      onChange={onContactChange}
                      required={true}
                    />
                    <input className="form-control mt-2"
                      placeholder='موبایل'
                      type="text"
                      name='mobile'
                      value={contact.mobile}
                      onChange={onContactChange}
                      required={true}
                    />
                    <input className="form-control mt-2"
                      placeholder='ایمیل'
                      type="email"
                      name='email'
                      value={contact.email}
                      onChange={onContactChange}
                      required={true}
                    />
                    <input className="form-control mt-2"
                      placeholder='شغل'
                      type="text"
                      name='job'
                      value={contact.job}
                      onChange={onContactChange}
                      required={true}
                    />
                    <select className='form-control mt-2'
                      name='group'
                      value={contact.group}
                      onChange={onContactChange}
                      required={true}
                    >
                      <option>انتخاب گروه</option>
                      {
                        groups.length > 0 && groups.map((group) => (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                        )
                      }
                    </select>
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
