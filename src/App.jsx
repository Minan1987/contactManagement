import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { Route, Routes, Navigate, useNavigate, useParams } from "react-router-dom"
import { Navbar, Contacts, AddContact, EditContact, ViewContact } from './components'
import { createContact, deleteContact, getAllContacts, getAllGroups, getContact, getGroup, updateContact } from './services/contactServices'
import { RiDeleteBin2Line } from "react-icons/ri";
import { ContactContext } from './context/ContactContext'
import { ToastContainer, toast } from 'react-toastify'
import _ from 'lodash'
import { useImmer } from 'use-immer'

const App = () => {

  const [loading, setLoading] = useImmer(false);
  const [contact, setContact] = useImmer({});
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: contactsData } = await getAllContacts()
        const { data: groupsData } = await getAllGroups()

        setContacts(contactsData)
        setFilteredContacts(contactsData)
        setGroups(groupsData)

        setLoading(false)
      } catch (err) {
        console.log(err.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const createContactForm = async (values) => {
    try {
      setLoading((draft) => !draft);
      const { status, data } = await createContact(values)
      if (status === 201) {
        toast.success("مخاطب جدید ایجاد شد.")
        setContacts((draft) => { draft.push(data) })
        setFilteredContacts((draft) => { draft.push(data) })
        setLoading((prevloading) => !prevloading)
        navigate("/contacts")
      }
    } catch (err) {
      console.log(err.message)
      setLoading((prevLoading) => !prevLoading);
    }
  }

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value })
  }

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui' dir='rtl'>
            <h2 className='h4'><RiDeleteBin2Line /> حذف مخاطب</h2>
            <hr />
            <p>آیا میخواهید {contactFullname} را پاک کنید؟</p>
            <div className="d-flex justify-content-between">
              <button className='btn btn-primary'
                onClick={() => {
                  removeContact(contactId);
                  onClose();
                }}
              >
                مطمئن هستم!
              </button>
              <button onClick={onClose} className='btn btn-secondary'>انصراف</button>
            </div>
          </div>
        );
      }
    });
  }

  const removeContact = async (contactId) => {
    const contactsBackup = [...contacts];
    try {
      setContacts((draft) => draft.filter((c) => c.id !== contactId));
      setFilteredContacts((draft) => draft.filter((c) => c.id !== contactId));

      const { status } = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت حذف شد.")
      if (status !== 200) {
        setContacts(contactsBackup);
        setFilteredContacts(contactsBackup);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup);
    }
  };

const searchContact = _.debounce((query) => {

  if (!query) return setFilteredContacts([...contacts]);
  
  setFilteredContacts((draft) => draft.filter((c)=> c.fullname.toLowerCase().includes(query.toLowerCase())))
  console.log(filteredContacts)
}, 1000);


return (
  <ContactContext.Provider value={{
    loading,
    setLoading,
    contact,
    setContacts,
    setFilteredContacts,
    contacts,
    filteredContacts,
    groups,
    onContactChange,
    deleteContact: confirmDelete,
    createContact: createContactForm,
    searchContact,
  }}>
    <div className='app'>
      <Navbar />
      <ToastContainer rtl={true} position='top-center' autoClose={3000} theme='colored' />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />}
        />
      </Routes>
    </div>
  </ContactContext.Provider>
)
}

export default App
