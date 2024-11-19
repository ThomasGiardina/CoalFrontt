import React from 'react';
import SupportContent from '../components/Support/SupportContent';
import ContactSupport from '../components/Support/ContactSupport';

const Support = () => {
    console.log("Rendering Support component");
    return (
        <div>
            <SupportContent />
            <ContactSupport />
        </div>
    );
};

export default Support;