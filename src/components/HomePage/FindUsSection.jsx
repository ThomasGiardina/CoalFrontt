
function FindUsSection() {
    return (
        <div className="w-full py-12 sm:py-16 lg:py-20">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="flex flex-col lg:flex-row">
                    {/* Map Section */}
                    <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4903048460383!2d-58.3819186!3d-34.617048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaba6ac89b35%3A0x1a2dc24cbca665a7!2sUADE!5e0!3m2!1ses-419!2sar!4v1728574327503!5m2!1ses-419!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                    
                    {/* Info Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12">
                        <div className="text-center">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Encontranos en
                            </h3>
                            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 sm:mb-8"></div>
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                                Lima 757, C1073 Cdad. Autónoma de Buenos Aires, Argentina
                            </p>
                            <div className="flex flex-col gap-4 text-gray-400">
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm sm:text-base">UADE - Buenos Aires</span>
                                </div>
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm sm:text-base">Lunes a Domingo - 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindUsSection;