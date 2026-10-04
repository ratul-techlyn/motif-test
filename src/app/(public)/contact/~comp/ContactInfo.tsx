import React from 'react';
import ContactForm from "./ContactForm";
import SocialLinks from "@/components/shared/SocialLinks";
import ContactMails from './ContactMails';

const ContactInfo = () => {
    return (
        <section className="layout_normal mt-0 md:mt-20 w-[90%] md:w-[90%] lg:w-[70%]">
        <div className="flex flex-col md:flex-row justify-between items-start mt-0 md:mt-20 gap-8">
            <div className="w-full md:w-1/3 md:pr-4 mb-6 lg:mb-0 py-10 md:py-0 hidden md:block">
                <ContactMails />
            </div>

            <div className="w-full md:w-2/3 md:pl-4">
                <ContactForm />
            </div>
        </div>
    </section>
    );
};

export default ContactInfo;
