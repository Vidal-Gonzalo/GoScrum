import "./TaskForm.css";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = (e) => {
    fetch(`${API_ENDPOINT}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        task: {
          title: values.title,
          status: values.status,
          importance: values.importance,
          description: values.description,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        resetForm();
        toast("Tu tarea se creó");
      })
      .catch((err) => console.log(err));
  };

  const length = "* La cantidad mínima de caracteres es 6";
  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(6, length).required(required),
    status: Yup.string().required(required),
    importance: Yup.string().required(required),
    description: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    resetForm,
  } = formik;
  return (
    <section className="task-form">
      <h2>Crear tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="">
            <input
              name="title"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Título"
              className={errors.title && touched.title ? "error" : ""}
              value={values.title}
            />
            {errors.title && touched.title && (
              <span className="error-msg">{errors.title}</span>
            )}
          </div>

          <div className="">
            <select
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
              className={errors.status && touched.status ? "error" : ""}
            >
              <option value="">Seleccionar un estado</option>
              <option value="NEW">Nueva</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-msg">{errors.status}</span>
            )}
          </div>

          <div className="">
            <select
              name="importance"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.importance}
              className={errors.importance && touched.importance ? "error" : ""}
            >
              <option value="">Seleccionar prioridad</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            {errors.importance && touched.importance && (
              <span className="error-msg">{errors.importance}</span>
            )}
          </div>

          <div className="">
            <textarea
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Descripción"
              value={values.description}
              className={
                errors.description && touched.description ? "error" : ""
              }
            ></textarea>
            {errors.description && touched.description && (
              <span className="error-msg">{errors.description}</span>
            )}
          </div>
        </div>
        <button type="submit">Crear</button>
      </form>
      <ToastContainer />
    </section>
  );
};
