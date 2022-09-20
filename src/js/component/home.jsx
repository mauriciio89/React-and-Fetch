import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [toDo, setToDo] = useState([]);
  const [tarea, setTarea] = useState([]);
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mauricio89", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((todoList) => {
        console.log(todoList);
        setToDo(todoList);
      });
  }, []);

  const agregarTareas = (e) => {
    e.preventDefault();
    setToDo((prev) => [...prev, tarea]);
    setTarea("");

    fetch("https://assets.breatheco.de/apis/fake/todos/user/mauricio89", {
      method: "PUT",
      body: JSON.stringify(toDo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
		
      });
  };
  console.log(toDo);
  const elementDellete = (dIndex) => {
    let listaTemporal=toDo.filter((e, i) => i !== dIndex); 
    setToDo(listaTemporal);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mauricio89", {
      method: "PUT",
      body: JSON.stringify(toDo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
		
      });
  };

  return (
    <div className="container">
      <div>
        <h1 className="text-center">ToDo's</h1>
        <form onSubmit={agregarTareas}>
          <div className="input-group d-flex justify-content-center">
            <input
              value={tarea}
              placeholder="agrega tus tareas"
              className="border-2 text-muted fs-4 container-fluid"
              type="text"
              onChange={(e) => setTarea(e.target.value)}
            />
          </div>
          <div>
            {toDo.map((element, dIndex) => {
              return (
                <div
                  key={dIndex}
                  className="d-flex justify-content-between my-3 col-4 mx-auto"
                >
                  <p>{element.label}</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => elementDellete(dIndex)}
                  >
                    borrar
                  </button>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
