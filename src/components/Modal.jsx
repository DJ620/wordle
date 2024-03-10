import React from "react";

const Modal = ({ show, setShow, children }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative bg-gray-600 outline-1 outline outline-gray-400 rounded-sm shadow-lg px-6 pb-6 pt-3 max-w-sm w-full z-10">
            <div className="flex justify-end items-center">
              <button
                onClick={() => setShow(false)}
                className="text-white hover:text-gray-400 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
