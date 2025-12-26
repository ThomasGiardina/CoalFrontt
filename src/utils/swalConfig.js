import Swal from 'sweetalert2';

const swalConfig = {
    background: '#1D1F23',
    color: '#fff',
    confirmButtonColor: '#FF6828',
    cancelButtonColor: '#374151',
    customClass: {
        popup: 'custom-toast',
        title: 'text-white',
        confirmButton: 'btn-primary',
    },
};

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: swalConfig.background,
    color: swalConfig.color,
    customClass: swalConfig.customClass,
});

export const showSuccess = (title, text = '') => {
    return Swal.fire({
        icon: 'success',
        title,
        text,
        ...swalConfig,
    });
};

export const showError = (title, text = '') => {
    return Swal.fire({
        icon: 'error',
        title,
        text,
        ...swalConfig,
    });
};

export const showWarning = (title, text = '') => {
    return Swal.fire({
        icon: 'warning',
        title,
        text,
        ...swalConfig,
    });
};

export const showInfo = (title, text = '') => {
    return Swal.fire({
        icon: 'info',
        title,
        text,
        ...swalConfig,
    });
};

export const showConfirm = (title, text = '', confirmText = 'Sí', cancelText = 'Cancelar') => {
    return Swal.fire({
        icon: 'warning',
        title,
        text,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        ...swalConfig,
    });
};

// Toast notifications
export const toastSuccess = (title) => {
    return Toast.fire({
        icon: 'success',
        title,
    });
};

export const toastError = (title) => {
    return Toast.fire({
        icon: 'error',
        title,
    });
};

export const toastWarning = (title) => {
    return Toast.fire({
        icon: 'warning',
        title,
    });
};

export const toastInfo = (title) => {
    return Toast.fire({
        icon: 'info',
        title,
    });
};

// Export the base config for custom usage
export const getSwalConfig = () => ({ ...swalConfig });

export default Swal;
