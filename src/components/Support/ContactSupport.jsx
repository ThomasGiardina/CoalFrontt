import { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useForm } from '@formspree/react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ContactSupport = () => {
    const [state, handleSubmitFormspree] = useForm("xdkodnov");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        issue: '',
        photos: [],
        description: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Nombre y Apellido es requerido'),
        email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
        issue: Yup.string().required('Problemática es requerida'),
        photos: Yup.array().min(1, 'Debe cargar al menos una foto'),
        description: Yup.string().required('Descripción del problema es requerida'),
    });

    const handleFileChange = (event, setFieldValue) => {
        const files = Array.from(event.target.files);
        setFieldValue('photos', files);
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        handleSubmitFormspree(values);
        setSubmitting(false);

        if (state.succeeded) {
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje enviado!',
                text: 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#FF6828',
                background: '#1D1F23',
                color: '#fff',
                customClass: {
                    popup: 'custom-toast',
                },
            }).then(() => {
                resetForm();
                navigate('/store');
            });
        }
    };

    return (
        <div id="contact-section" className="relative w-full flex flex-col items-center bg-background p-4 sm:p-6 lg:p-12 rounded-lg mt-2 space-y-6 sm:space-y-8 lg:space-y-12">
            <div className="absolute top-0 left-0 w-1/4 h-48 bg-accent rounded-br-full opacity-30 z-0"></div>
            <div className="absolute top-0 right-0 w-1/4 h-32 bg-primary rounded-bl-full opacity-40 z-0"></div>
            <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2 relative z-10 text-center px-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Formulario de Contacto
            </motion.h1>
            <motion.p
                className="text-base sm:text-lg text-white mb-4 sm:mb-6 relative z-10 text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                Si tienes algún problema, puedes dejar tu consulta abajo y te responderemos cuanto antes.
            </motion.p>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="w-full max-w-lg bg-background p-4 sm:p-6 lg:p-8 rounded-lg shadow-md relative z-10 mx-4">
                        <div className="mb-4">
                            <label className="block text-gray-200 text-lg font-bold mb-2" htmlFor="name">
                                Nombre y Apellido
                            </label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                autoComplete="name"
                                className="input input-bordered w-full"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200 text-lg font-bold mb-2" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                className="input input-bordered w-full"
                                placeholder="ejemplo@gmail.com"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200 text-lg font-bold mb-2" htmlFor="issue">
                                Problemática
                            </label>
                            <Field
                                type="text"
                                id="issue"
                                name="issue"
                                autoComplete="off"
                                className="input input-bordered w-full"
                            />
                            <ErrorMessage name="issue" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200 text-lg font-bold mb-2" htmlFor="photos">
                                Carga de múltiples fotos
                            </label>
                            <input
                                type="file"
                                id="photos"
                                name="photos"
                                multiple
                                className="file-input file-input-bordered w-full"
                                onChange={(event) => handleFileChange(event, setFieldValue)}
                                ref={fileInputRef}
                            />
                            <ErrorMessage name="photos" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-200 text-lg font-bold mb-2" htmlFor="description">
                                Descripción del problema
                            </label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                autoComplete="off"
                                className="textarea textarea-bordered w-full"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="btn bg-gradient-to-r from-[#FF6828] to-[#E57028] hover:from-[#E57028] hover:to-[#FF6828] text-white border-none shadow-lg shadow-[#FF6828]/25 hover:shadow-[#FF6828]/40 transform hover:-translate-y-0.5 transition-all duration-300 text-lg px-6 py-3"
                                disabled={isSubmitting}
                            >
                                Enviar
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-primary rounded-tr-full opacity-30 z-0"></div>
            <div className="absolute bottom-0 right-0 w-1/4 h-40 bg-accent rounded-tl-full opacity-30 z-0"></div>
        </div>
    );
};

export default ContactSupport;