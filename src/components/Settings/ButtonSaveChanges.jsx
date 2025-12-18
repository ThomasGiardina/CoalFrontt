const ButtonSaveChanges = ({ handleSubmit }) => {
    return (
        <div className="flex justify-end mt-4 sm:mt-5 mr-2 sm:mr-4 lg:mr-5">
            <button className="btn w-full sm:w-[200px] btn-primary text-white rounded-md p-2 sm:p-3 text-sm sm:text-base" onClick={handleSubmit}>
                Guardar Cambios
            </button>
        </div>
    );
};

export default ButtonSaveChanges;
