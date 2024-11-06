const ShowTimer = (props) => {
  const {
    hours,
    seconds,
    minutes,
    handleResume,
    handlePause,
    handleReset,
    isPause,
  } = props;
  return (
    <div className="show-container">
      <div className="timer-box">
        <div>{hours < 10 ? `0${hours}` : hours}</div>
        <span>:</span>
        <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
        <span>:</span>
        <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
      </div>
      <div className="action-box">
        {isPause ? (
          <button onClick={handleResume} className="timer-button">
            Resume
          </button>
        ) : (
          <button onClick={handlePause} className="timer-button">
            Pause
          </button>
        )}

        <button onClick={handleReset} className="timer-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ShowTimer;
