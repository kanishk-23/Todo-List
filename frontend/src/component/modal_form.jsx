function Modal({ children, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          padding: "16px",
          borderRadius: 8,
          minWidth: 320,
          Width: 450,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
