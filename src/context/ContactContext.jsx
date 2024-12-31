import { createContext } from "react";
export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contact: {},
    contacts: [],
    setContacts: () => { }, 
    filteredContacts: [],
    setFilteredContacts: () => { },
    editableContact: {},
    contactQuery: {},
    groups: [],
    onContactChange: () => { },
    deleteContact: () => { },
    createContact: () => { },
    searchContact: () => { },
})