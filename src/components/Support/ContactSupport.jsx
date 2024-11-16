import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const ContactSupport = () => {
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const initialValues = {
        name: '',
        issue: '',
        photos: [],
        description: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Nombre y Apellido es requerido'),
        issue: Yup.string().required('Problemática es requerida'),
        photos: Yup.array().min(1, 'Debe cargar al menos una foto'),
        description: Yup.string().required('Descripción del problema es requerida'),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("Submitting form", values);
        setSuccess(true);
        setSubmitting(false);
        resetForm();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileChange = (event, setFieldValue) => {
        const files = Array.from(event.target.files);
        setFieldValue('photos', files);
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
                className="text-lg text-gray-700 mb-6 relative z-10"
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
                    <Form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md relative z-10">
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
                                className="input input-bordered w-full"
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
            {success && (
                <motion.div 
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div 
                        className="bg-white p-12 rounded-lg shadow-lg text-center"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h1 
                            className="text-4xl font-bold text-green-500 mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            ¡Tu problema ha sido registrado correctamente!
                        </motion.h1>
                        <motion.p
                            className="text-gray-700 mb-8 text-xl"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Te responderemos cuanto antes. ¡Muchas gracias!
                        </motion.p>
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <button
                                className="btn btn-primary text-xl px-8 py-4"
                                onClick={() => setSuccess(false)}
                            >
                                Cerrar
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
            <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-primary rounded-tr-full opacity-30 z-0"></div>
            <div className="absolute bottom-0 right-0 w-1/4 h-40 bg-accent rounded-tl-full opacity-30 z-0"></div>
        </div>
    );
};

export default ContactSupport;