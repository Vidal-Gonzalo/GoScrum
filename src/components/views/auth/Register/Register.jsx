import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";
import { swal } from "../../../../utils/swal";

import "../Auth.css";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Register = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_ENDPOINT}auth/data`)
      .then((res) => res.json())
      .then((data) => setData(data.result));
  }, []);

  const onSubmit = () => {
    const teamID = !values.teamId ? uuidv4() : values.teamId;
    fetch(`${API_ENDPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID: teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        swal(
          "¡Fuiste registrado con exito!",
          `El ID de tu equipo es: ${teamID}.
          ¡Es importante que lo guardes para compartirlo con tu equipo!`
        );
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamId: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const length = "* La cantidad mínima de caracteres es 4";
  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(4, length).required(required),
    password: Yup.string().required(required),
    email: Yup.string().email("Debe ser un email valido").required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") {
      setFieldValue("region", "Otro");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    setFieldValue,
  } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label htmlFor="userName">Nombre de usuario</label>
          <input
            type="text"
            name="userName"
            values={values.userName}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && (
            <span className="error-msg">{errors.userName}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            values={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="error-msg">{errors.password}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            values={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <span className="error-msg">{errors.email}</span>
          )}
        </div>
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="secondary"
            />
          }
          label="Perteneces a un equipo ya creado"
        />
        {values.switch && (
          <div className="">
            <label htmlFor="">
              Por favor introduce un identificador de equipo
            </label>
            <input
              type="text"
              name="teamId"
              value={values.teamId}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label htmlFor="role">Rol</label>
          <select
            name="role"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">Selecciona un rol</option>
            {data.Rol?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-msg">{errors.role}</span>
          )}
        </div>

        <div>
          <label htmlFor="continent">Continent</label>
          <select
            name="continent"
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            onBlur={handleBlur}
            value={values.continent}
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Selecciona un continente</option>
            {data.continente?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-msg">{errors.continent}</span>
          )}
        </div>

        {values.continent === "America" && (
          <div>
            <label htmlFor="region">Region</label>
            <select
              name="region"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.region}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Selecciona una región</option>
              {data.region?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-msg">{errors.region}</span>
            )}
          </div>
        )}

        <div>
          <button type="submit">Enviar</button>
        </div>
        <div className="">
          <Link to="/login">Ir a iniciar sesión</Link>
        </div>
      </form>
    </div>
  );
};
