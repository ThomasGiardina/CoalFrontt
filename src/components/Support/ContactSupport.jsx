import React, { useRef } from 'react';
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
                background: '#1D1F23',
                customClass: {
                    popup: 'custom-toast',
                    title: 'text-primary',
                    confirmButton: 'btn-primary',
                },
            }).then(() => {
                resetForm(); 
                navigate('/store'); 
            });
        }
    };

    return (
        <div id="contact-section" className="relative w-full flex flex-col items-center bg-background p-8 lg:p-12 rounded-lg mt-2 space-y-12">
            <div className="absolute top-0 left-0 w-1/4 h-48 bg-accent rounded-br-full opacity-30 z-0"></div>
            <div className="absolute top-0 right-0 w-1/4 h-32 bg-primary rounded-bl-full opacity-40 z-0"></div>
            <motion.h1 
                className="text-5xl font-bold text-primary mb-2 relative z-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Formulario de Contacto
            </motion.h1>
            <motion.p
                className="text-lg text-white    mb-6 relative z-10"
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
                    <Form className="w-full max-w-lg bg-background p-8 rounded-lg shadow-md relative z-10">
                        <div className="mb-4">
                            <label className="block text-gray-200 text-lg font-bold mb-2" htmlFor="name">
                                Nombre y Apellido
                            </label>
                            <Field
                                type="text"
                                name="name"
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
                                name="email"
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
                                name="issue"
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
                                name="description"
                                className="textarea textarea-bordered w-full"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="btn btn-primary text-lg px-6 py-3"
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