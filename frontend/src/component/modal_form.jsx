function Modal({ children, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[9998]">
      <div className="bg-white p-4 rounded-lg max-w-md w-full z-[9999] shadow-lg" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
