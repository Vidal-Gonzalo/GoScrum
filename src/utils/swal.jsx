import Swal from 'sweetalert2';

export const swal = (title, text) =>
  Swal.fire({
    title,
    text,
    confirmButtonText: "Aceptar",
    width: "400px",
    timer: 10000,
    timerProgressBar: true,
  });
