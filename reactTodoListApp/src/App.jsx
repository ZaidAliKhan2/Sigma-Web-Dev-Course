import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [finished, setFinished] = useState(false);
  const [showInput, setShowInput] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("Tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("CheckedStates");
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleEditClick = (index) => {
    setShowInput(index);
    setEditValue(tasks[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editValue;
    setTasks(updatedTasks);
    setShowInput(null);
  };

  const addTask = () => {
    if (task.trim() === "") return;
    const updatedTasks = [...tasks, task];
    const updatedChecked = [...checked, false];
    setTasks(updatedTasks);
    setChecked(updatedChecked);
    setTask("");
  };

  const deleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t !== task);
    const index = tasks.indexOf(task);
    const updatedChecked = checked.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setChecked(updatedChecked);
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("CheckedStates", JSON.stringify(updatedChecked));
  };

  const toggleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    localStorage.setItem("CheckedStates", JSON.stringify(checked));
  }, [tasks, checked]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="mainContainer w-2xl rounded-xl bg-stone-150 border border-green-700 shadow-2xl p-4 min-h-96">
          <div className="headingCont flex justify-center">
            <h1 className="text-green-700 font-bold">
              Taskly - Manage your todos at one place
            </h1>
          </div>
          <div className="searchCont mb-2">
            <p className="font-bold text-xl text-green-700">Add a todo</p>
            <form className="flex justify-center items-center gap-0.5">
              <input
                type="text"
                className="bg-transparent border border-green-700 rounded-2xl w-full p-2 focus:ring-1 focus:ring-green-900 
              outline-none text-gray-500"
                onChange={handleChange}
              />
              <button
                className="rounded-3xl py-3 px-6 bg-green-600 text-white hover:bg-green-700 transition-all duration-200 cursor-pointer"
                onClick={addTask}
              >
                Save
              </button>
            </form>
          </div>
          <div className="TodosMainCont mb-2">
            <div className="finishedTaskCont flex justify-start items-center gap-1">
              <input
                type="checkbox"
                className="accent-green-600"
                onChange={() => {
                  setFinished(!finished);
                }}
              ></input>
              <p className="text-gray-500 text-xs">Show Finished</p>
            </div>
            <p className="border-b-2 border-b-gray-300 rounded-2xl m-3"></p>

            <div className="todosTaskCont">
              <h1 className="font-bold text-xl text-green-700">Your Todos</h1>
              <ul>
                {tasks.map((t, index) => (
                  <li
                    key={index}
                    className={`flex justify-start items-center gap-2 w-full py-2 whitespace-nowrap 
                        ${checked[index] ? "line-through" : ""}
                          ${
                            finished
                              ? checked[index]
                                ? "block"
                                : "hidden"
                              : "block"
                          }
                        
                      `}
                    onClick={handleChange}
                  >
                    <input
                      type="checkbox"
                      checked={checked[index] || false}
                      onChange={() => toggleCheck(index)}
                      className="accent-green-600"
                    />
                    {showInput === index ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="bg-transparent border border-green-700 rounded-2xl w-full p-2 focus:ring-1 focus:ring-green-900 
              outline-none"
                        />
                        <button
                          onClick={() => handleSaveEdit(index)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <p>{t}</p>
                        <div className="iconsCont flex justify-end items-center gap-4 w-full">
                          <span
                            className="editBtn text-xl hover:scale-120 cursor-pointer"
                            onClick={() => handleEditClick(index)}
                          >
                            <CiEdit />
                          </span>
                          <span
                            className="delBtn text-xl hover:scale-120 cursor-pointer"
                            onClick={() => deleteTask(t)}
                          >
                            <MdDelete />
                          </span>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
