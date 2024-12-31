import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { Route, Routes, Navigate, useNavigate, useParams } from "react-router-dom"
import { Navbar, Contacts, AddContact, EditContact, ViewContact } from './components'
import { createContact, deleteContact, getAllContacts, getAllGroups, getContact, getGroup, updateContact } from './services/contactServices'
import { RiDeleteBin2Line } from "react-icons/ri";
import { ContactContext } from './context/ContactContext'
import _ from 'lodash'

const App = () => {

  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);


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
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(values)
      if (status === 201) {
        const allContacts = [...contacts, data];

        setContacts(allContacts)
        setFilteredContacts(allContacts)
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
    try {
      setLoading(true)
      const response = await deleteContact(contactId)
      if (response) {
        const { data: contactsData } = await getAllContacts()
        setContacts(contactsData)
        setLoading(false)
      }
    } catch (err) {
      console.log(err.message)
      setLoading(false)
    }
  }

  const searchContact =  _.debounce((query) => {

    if (!query) return setFilteredContacts([...contacts]);

    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.fullname.toLowerCase().includes(query.toLowerCase());
      })
    );
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
