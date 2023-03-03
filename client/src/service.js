const baseUrl = "http://localhost:8800";
// const baseUrl = "https://kind-gold-cow-hem.cyclic.app";

export const endpoints = {
    // USERS
    signUpUser: baseUrl + "/register_user",
    signInUser: baseUrl + "/login_user",
    deleteUser: baseUrl + "/delete_user",

    // ENTRIES
    getAllContacts: baseUrl + "/contacts",
    createContact: baseUrl + "/contacts/create",
    updateContact: baseUrl + "/contacts/update",
    deleteContact: baseUrl + "/contacts/delete",
};
