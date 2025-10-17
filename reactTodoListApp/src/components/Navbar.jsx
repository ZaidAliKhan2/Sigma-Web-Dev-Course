import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="navCont flex justify-around items-center bg-green-100 shadow-sm mb-2">
        <div className="logoCont flex justify-start items-center">
          <img
            src="./src/assets/tasklyIcon.png"
            alt="icon"
            width={50}
            height={50}
          />
          <h1 className="text-green-700 text-2xl font-bold">Taskly</h1>
        </div>
        <div>
          <ul className="flex justify-center items-center list-none gap-3 text-green-700 font-bold cursor-pointer ">
            <li
              className="text-green-700 
          hover:text-green-800 
          hover:scale-110 
          transition-all duration-200"
            >
              Home
            </li>
            <li
              className="text-green-700 
          hover:text-green-800 
          hover:scale-110 
          transition-all duration-200"
            >
              Your Tasks
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
