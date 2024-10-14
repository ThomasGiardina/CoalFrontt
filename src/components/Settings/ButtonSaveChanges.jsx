const ButtonSaveChanges = ({ handleSubmit }) => {
    return (
        <div className="flex justify-end mt-5 mr-5">
            <button className="btn w-[200px] bg-black text-white rounded-md p-2" onClick={handleSubmit}>
                Guardar Cambios
            </button>
        </div>
    );
};

export default ButtonSaveChanges;
