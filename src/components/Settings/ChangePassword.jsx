import ButtonSaveChanges from "./ButtonSaveChanges";
import InputsNewPassword from "./InputsNewPassword";

const ChangePassword = () => {
    return (
        <>
        <div className="h-[550px] w-[650px] rounded-xl flex flex-col mt-14" style={{backgroundColor:"#2c3e50"}}>
            <h1 className="font-bold text-3xl ml-5 mt-5">Cambiar Contraseña</h1>
            <p className="mt-5 ml-5">Aqui puedes establecer una nueva contraseña</p>
            <InputsNewPassword />
            <ButtonSaveChanges />
        </div>
        </>
    )
}

export default ChangePassword;