import Swal from "sweetalert2";

export const swal = (title, text) =>
  Swal.fire({
    title,
    text,
    confirmButtonText: "¡Hecho!",
    width: "400px",
    timer: 20000,
    timerProgressBar: true,
  });
