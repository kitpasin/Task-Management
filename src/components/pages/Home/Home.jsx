// LIBRARIES
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Home(props) {
  // PROPS
  const { theme, setTheme } = props;

  // STATES
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("Tasks")) || []);
  const [inputTasks, setInputTasks] = useState("");
  const [editTasks, setEditTasks] = useState(null);

  // FUNCTIONS

  // SET DATA IN LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ADD & UPDATE
  function addNupdateTask(event) {
    event.preventDefault();
    // CHECK IF NO DATA
    if (!inputTasks) {
      Swal.fire({
        icon: "error",
        title: "NO DATA FOUND",
        text: "PLEASE INSERT YOUR TASK.",
        showConfirmButton: true,
      });
    }

    // UPDATE
    else if (editTasks) {
      Swal.fire({
        title: "ARE YOU SURE ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#48bb78",
        cancelButtonColor: "#ef4444",
        cancelButtonText: "CANCEL",
        confirmButtonText: "YES, UPDATE TASK !",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "UPDATED !",
            text: "YOUR TASK HAS BEEN UPDATED.",
            icon: "success",
            confirmButtonColor: "#48bb78",
          });
          const updateTask = tasks.map((task) => {
            if (task.id === editTasks) {
              return { ...task, title: inputTasks };
            }
            return task;
          });
          setTasks(updateTask);
          setInputTasks("");
          setEditTasks(null);
          document.querySelector("input").value = "";
        }
      });

      // ADD
    } else {
      Swal.fire({
        icon: "success",
        title: "YOUR TASK HAS BEEN SAVED.",
        showConfirmButton: true,
        confirmButtonColor: "#48bb78",
      });
      const newTask = {
        id: tasks.length + 1,
        title: inputTasks,
      };
      setTasks([...tasks, newTask]);
      setInputTasks("");
      document.querySelector("input").value = "";
    }
  }
  // EDIT
  function editTask(id) {
    setEditTasks(id);
    const findTask = tasks.find((tasks) => tasks.id === id);
    setInputTasks(findTask.title);
    document.querySelector("input").value = findTask.title;
    document.querySelector("input").focus();
  }
  // DELETE
  function deleteTask(id) {
    Swal.fire({
      title: "ARE YOU SURE ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#48bb78",
      cancelButtonColor: "#ef4444",
      cancelButtonText: "CANCEL",
      confirmButtonText: "YES, DELETE TASK !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "DELETED !",
          text: "YOUR TASK HAS BEEN DELETED.",
          icon: "success",
          confirmButtonColor: "#48bb78",
        });
        const result = tasks.filter((tasks) => tasks.id !== id);
        setTasks(result);
      }
    });
  }

  return (
    <div className={`${theme ? "bg-white" : "bg-gradient-to-r from-gray-500 to-gray-900"} absolute w-full h-full`}>
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 m-auto p-4 sm:p-12 w-3/4 ${
          theme
            ? "bg-gradient-to-r from-red-500 to-red-900"
            : "bg-gradient-to-r from-blue-500 to-blue-900"
        } flex flex-col justify-between items-center gap-12 rounded-xl`}
      >
        <h1 className="font-bold text-xl text-center xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-white">
          TASK MANAGEMENT
        </h1>
        <form onSubmit={addNupdateTask} className="w-full">
          <div className="flex justify-center w-full">
            <input
              onChange={(event) => setInputTasks(event.target.value)}
              className="rounded-l-full outline-none h-14 p-2 w-3/4 font-bold text-sm xl:text-xl lg:text-lg md:text-md sm:text-sm"
              type="text"
              placeholder="ENTER YOUR TASK :"
            ></input>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 font-bold text-sm xl:text-xl lg:text-lg md:text-md sm:text-sm text-black w-1/4 rounded-r-full"
            >
              {editTasks ? "UPDATE" : "ADD"}
            </button>
          </div>
        </form>
        {tasks.map((data) => (
          <div
            key={data.id}
            className="bg-white flex flex-col sm:flex-row justify-between items-center w-full font-bold text-sm xl:text-xl lg:text-lg md:text-md sm:text-sm gap-4 rounded-full p-2"
          >
            <div className="flex justify-center sm:justify-start items-center gap-2 w-full">
              <p>
                {data.id}.{data.title}
              </p>
            </div>

            <div className="w-full flex justify-center sm:justify-end items-center gap-4 sm:w-1/2 md:w-1/4">
              <img
                src="/public/images/home/editicon.png"
                onClick={() => editTask(data.id)}
                className="bg-yellow-500 hover:bg-yellow-600 w-10 h-10 rounded-full text-white p-2 cursor-pointer"
              />
              <img
                src="/public/images/home/deleteicon.png"
                onClick={() => deleteTask(data.id)}
                className="bg-red-500 hover:bg-red-600 w-10 h-10 rounded-full text-white p-2 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
