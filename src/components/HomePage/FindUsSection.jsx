import React from 'react';

function FindUsSection() {
    return (
        <div className="w-full flex justify-center items-center bg-white p-6 rounded-lg mt-20 border border-gray-300">
            <div className="w-1/2">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4903048460383!2d-58.3819186!3d-34.617048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaba6ac89b35%3A0x1a2dc24cbca665a7!2sUADE!5e0!3m2!1ses-419!2sar!4v1728574327503!5m2!1ses-419!2sar"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                    className="rounded-lg"
                ></iframe>
            </div>
            <div className="w-1/2 text-black text-center pl-6">
                <h3 className="text-3xl font-bold mb-4 text-orange-500">Encontranos en</h3>
                <p className="text-lg">Lima 757, C1073 Cdad. Autónoma de Buenos Aires, Argentina</p>
            </div>
        </div>
    );
}

export default FindUsSection;