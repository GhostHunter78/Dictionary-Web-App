const PlayIcon = ({ playerAudio }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70"
        height="70"
        viewBox="0 0 75 75"
        onClick={playerAudio}
      >
        <g fill="#A445ED" fillRule="evenodd">
          <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
          <path d="M29 27v21l21-10.5z" />
        </g>
      </svg>
    </>
  );
};

export default PlayIcon;
