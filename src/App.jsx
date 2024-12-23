import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { Route, Routes, Navigate, useNavigate, useParams } from "react-router-dom"
import { Navbar, Contacts, AddContact, EditContact, ViewContact } from './components'
import { createContact, deleteContact, getAllContacts, getAllGroups, getContact, getGroup, updateContact } from './services/contactServices'
import { RiDeleteBin2Line } from "react-icons/ri";
import { ContactContext } from './context/ContactContext'

const App = () => {

  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [groups, setGroups] = useState([])
  const [contact, setContact] = useState({})
  const [group, setGroup] = useState({})
  const [contactQuery, setContactQuery] = useState({ text: "" })
  const [editableContact, setEditableContact] = useState({})
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

  const getContactById = (contactId) => {
    return contacts.find((contact) => contact.id === parseInt(contactId))
  }

  const getGroupById = (groupId) => {
    return groups.find((group) => group.id === groupId)
  }

  const fetchContactForEdit = async (contactId) => {
    try {
      setLoading(true)
      const { data: contactData } = await getContact(contactId)
      setEditableContact(contactData)
      setLoading(false)
    } catch (err) {
      console.log(err.message)
      setLoading(false)
    }
  }

  const editContactForm = async (event, contactId) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await updateContact(editableContact, contactId);
      setLoading(false);
      if (data) {
        const updatedContacts = contacts.map((contact) =>
          contact.id === parseInt(contactId) ? data : contact
        );
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  const createContactForm = async (event) => {
    event.preventDefault()
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(contact)
      if (status === 201) {
        const allContacts = [...contacts, data];

        setContacts(allContacts)
        setFilteredContacts(allContacts)

        setContact({})
        setLoading((prevloading) => !prevloading)
        navigate("/contacts")
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const onContactChangeEdit = (event) => {
    setEditableContact({ ...editableContact, [event.target.name]: event.target.value })
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

  const searchContact = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value })
    const allFillteredContacts = contacts.filter((contact) => {
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredContacts(allFillteredContacts)
  }

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      contacts,
      filteredContacts,
      contactQuery,
      groups,
      getContactById,
      getGroupById,
      onContactChange,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      searchContact,
      fetchContactForEdit,
      editableContact,
      onContactChangeEdit,
      editContactForm,
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
