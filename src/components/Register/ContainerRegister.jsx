import { useState } from 'react';
import InputsRegister from './InputsRegister';
import CarruselLogin from './CarruselLogin';
import Check from './Check';
import BotonRegister from './BotonRegister';
import DivLogin from './DivLogin';
import BotonesLinksRegister from './BotonesLinksRegister';
import { Link } from 'react-router-dom';

const ContainerRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
    });

    return (
        <div className="h-[700px] w-[1275px] rounded-lg flex bg-neutral">
            <div className="my-5 ml-5 mr-24">
                <CarruselLogin />
            </div>
            <div className="flex flex-col my-20">
                <h1 className="text-6xl mb-10">Crear Cuenta</h1>
                <InputsRegister setFormData={setFormData} formData={formData} />
                <div className="mt-5 flex items-center">
                    <Check />
                    <span className="ml-3">Acepto los Términos y Condiciones</span>
                </div>
                <BotonRegister formData={formData} />
                <div className="mt-3">
                    <DivLogin />
                </div>
                <BotonesLinksRegister />
                <div className="flex justify-center mt-5">
                    <span>
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/Login" style={{ color: '#1E90FF' }}>
                            Iniciar sesión
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContainerRegister;
