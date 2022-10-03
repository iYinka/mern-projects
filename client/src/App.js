import React, { useEffect, useState } from "react";
// import { BsTypeH1 } from "react-icons/bs";
import "./App.css";
import ContactForm from "./container/contactForm";
import ContactsTable from "./container/contacts-table";
import SettingsHeader from "./container/header/header";
import LoginLayout from "./container/login";
import { endpoints } from "./service";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./container/sign-up";

function App() {
    const [data, setData] = useState(null);
    const [tabs, setTabs] = useState("Contact Form");

    // useEffect(() => {
    //     fetch(`${endpoints.getAllContacts}`)
    //         .then((res) => res.json())
    //         .then((data) => setData(data.message));
    // }, []);
    // console.log({ data });

    const handleTabs = (e) => {
        setTabs(e);
        console.log({ tabs: e });
    };

    const Token = localStorage.getItem("token");

    console.log(Token);
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginLayout />} />
                    <Route exact path="/register" element={<SignUp />} />
                    <Route
                        exact
                        path="/my_contacts"
                        element={
                            <>
                                <div className="App-header">
                                    <SettingsHeader
                                        handleTabs={handleTabs}
                                        tabs={tabs}
                                    />
                                </div>

                                {tabs === "Contact Form" && (
                                    <ContactForm
                                        handleTabs={handleTabs}
                                        tabs={tabs}
                                    />
                                )}
                                {tabs === "Contacts" && (
                                    <ContactsTable
                                        handleTabs={handleTabs}
                                        tabs={tabs}
                                    />
                                )}
                            </>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
