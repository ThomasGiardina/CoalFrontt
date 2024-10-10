import ButtonSaveChanges from "./ButtonSaveChanges";
import InputsAccount from "./InputsAccount";

const AccountSettings = () => {
    return (
        <>
            <div className="h-[550px] w-[650px] rounded-xl flex flex-col " style={{backgroundColor:"#2c3e50"}}>
                <h1 className="flex items-start ml-5 mt-5 text-3xl text-white">Configuraciones de Usuario</h1>
                <p className="flex items-start ml-5 mt-5 text-white">Aquí puedes cambiar la información de tu cuenta</p>
                <InputsAccount />
                <ButtonSaveChanges />
            </div>
        </>
    )
}

export default AccountSettings;
