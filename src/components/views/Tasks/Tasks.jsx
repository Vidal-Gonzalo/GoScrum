import "./Tasks.css";
import { useResize } from "../../../hooks/useResize";
import Skeleton from "react-loading-skeleton";
import { Header } from "../../Header/Header";
import { Card } from "../../Card/Card";
import { TaskForm } from "../../TaskForm/TaskForm";
import {
  getTasks,
  deleteTask,
  editTaskStatus,
} from "../../../store/actions/taskActions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import debounce from "lodash.debounce";

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [search, setSearch] = useState("");
  const [tasksFromWho, setTasksFromWho] = useState("ALL");
  const { isPhone } = useResize();
  const dispatch = useDispatch();

  const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "/me" : ""));
  }, [tasksFromWho, API_ENDPOINT, dispatch]);

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (search) {
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    } else {
      setRenderList(list);
    }
  }, [search, list]);

  if (error) return <div>Hay un error</div>;

  const handleDelete = (id) => dispatch(deleteTask(id));

  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data));

  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);

  const renderAllCards = () => {
    return renderList?.map((data) => (
      <Card
        key={data._id}
        data={data}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
      />
    ));
  };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => (
        <Card
          key={data._id}
          data={data}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ));
  };

  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL") setRenderList(list);
    else
      setRenderList(
        list.filter((data) => data.importance === event.currentTarget.value)
      );
  };

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper-list">
          <div className="list-header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                onChange={(event) => {
                  setTasksFromWho(event.currentTarget.value);
                }}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por título..."
                onChange={handleSearch}
              />
            </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div>No hay tareas creadas </div>
            ) : loading ? (
              <>
                <Skeleton height={90} /> <Skeleton height={90} />
                <Skeleton height={90} />
              </>
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list-group">
              {!renderList?.length ? (
                <div>No hay tareas creadas </div>
              ) : loading ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En proceso</h4>
                    {renderColumnCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderColumnCards("FINISHED")}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
