import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { swal } from "../../../../utils/swal";
import "../Auth.css";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    password: "",
  };

  const length = "* La cantidad mínima de caracteres es 4";
  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(4, length).required(required),
    password: Yup.string().required(required),
  });

  const onSubmit = (e) => {
    const { userName, password } = values;

    fetch(`${API_ENDPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user?.userName);
          navigate("/", { replace: true });
          swal(
            "¡Iniciaste sesión con éxito!",
            "Bienvenidx a GoScrum"
          );
        } else {
          swal(
            "Credenciales inválidas",
            "Por favor introduzca credenciales válidas"
          );
        }
      })
      .catch((err) => console.log(err));
    navigate("/", { replace: true });
  };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            onBlur={handleBlur}
            values={values.userName}
            onChange={handleChange}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && (
            <span className="errors">{errors.userName}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            onBlur={handleBlur}
            values={values.password}
            onChange={handleChange}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="errors">{errors.password}</span>
          )}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div className="">
          <Link to="/register">Registrarme</Link>
        </div>
      </form>
    </div>
  );
};
