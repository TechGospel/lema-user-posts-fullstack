import React, { ReactNode } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  modalBgStyle?: string;
  actions?: boolean;
  width?: string;
}

const Modal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  modalBgStyle = "bg-black bg-opacity-50",
  actions = false,
  width = "w-md",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${modalBgStyle} z-50`}
    >
      <div
        className={`bg-white rounded-lg custom-shadow ${width} mx-4 p-6 relative`}
      >
        {/* Modal Header */}
        <div className="flex  border-b items-center pb-3 mb-2">
          <h2 className="text-4xl font-medium text-[#181D27]">{title}</h2>
        </div>

        {/* Modal Content */}
        <div className="mb-4">{children}</div>

        {/* Modal Actions */}
        {actions && (
          <div className="flex justify-end space-x-3">
            {/* <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
              Confirm
            </button> */}
            <button
              onClick={onClose}
              className="w-full  h-10 text-white bg-[#37b793] rounded-xl hover:bg-gray-300"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
