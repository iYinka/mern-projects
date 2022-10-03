const baseUrl = "http://localhost:8800";

export const endpoints = {
    // USERS
    signUpUser: baseUrl + "/register_user",
    signInUser: baseUrl + "/login_user",

    // ENTRIES
    getAllContacts: baseUrl + "/contacts",
    createContact: baseUrl + "/contacts/create",
    updateContact: baseUrl + "/contacts/update",
    deleteContact: baseUrl + "/contacts/delete",
};
