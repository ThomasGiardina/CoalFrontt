import { FaMapMarkerAlt, FaClock, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

function FindUsSection() {
    return (
        <section className="py-16 sm:py-20">
            <div className="text-center mb-10">
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">Contacto</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Encontranos</h2>
            </div>

            <div className="bg-neutral border border-base-200 rounded-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 h-[250px] lg:h-[350px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4903048460383!2d-58.3819186!3d-34.617048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaba6ac89b35%3A0x1a2dc24cbca665a7!2sUADE!5e0!3m2!1ses-419!2sar!4v1728574327503!5m2!1ses-419!2sar"
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                    <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <FaMapMarkerAlt className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Dirección</p>
                                    <p className="text-gray-400 text-sm">Lima 757, CABA, Argentina</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <FaClock className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Horario</p>
                                    <p className="text-gray-400 text-sm">Atención 24/7 - Siempre disponibles</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Email</p>
                                    <p className="text-gray-400 text-sm">contacto@coal.com</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://maps.google.com/?q=Lima+757+CABA+Argentina" target="_blank" rel="noopener noreferrer" className="btn btn-primary text-white mt-6 w-fit gap-2">
                            <FaExternalLinkAlt className="text-sm" /> Abrir en Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FindUsSection;