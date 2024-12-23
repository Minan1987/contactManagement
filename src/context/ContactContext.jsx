import { createContext } from "react";
export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contact: {},
    setContact: () => { }, contacts: [],
    filteredContacts: () => { },
    editableContact: {},
    contactQuery: {},
    group: {},
    groups: [],
    getContactById: () => { },
    getGroupById: () => { },
    onContactChange: () => { },
    deleteContact: () => { },
    updateContact: () => { },
    createContact: () => { },
    searchContact: () => { },
    editContactForm: () => {},
    onContactChangeEdit:() =>{},
    fetchContactForEdit: () => { }
})