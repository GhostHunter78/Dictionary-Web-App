const LightModeToggle = ({ onClick, isVisible }) => {
  return (
    <>
      <svg
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <rect width="40" height="20" rx="10" fill="#757575" />
        <circle cx="10" cy="10" r="7" fill="white" />
      </svg>
    </>
  );
};

export default LightModeToggle;
