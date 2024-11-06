import { useEffect, useState } from "react";
import "./App.css";
import InputTimer from "./InputTimer";
import ShowTimer from "./ShowTimer";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds <= 0) {
      alert("Invalid Input");
      return;
    } else {
      setIsStart(true);
    }
  };

  const handleResume = () => {
    setIsPause(false);
    runTimer(seconds, minutes, hours);
  };

  const handlePause = () => {
    setIsPause(true);
    clearInterval(timerId);
  };

  const handleReset = () => {
    setIsStart(false);
    resetTimer();
  };

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  };

  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;

    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (min === 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (hr === 0 && min === 0 && sec === 0) {
      handleReset();
      clearInterval(tid);
      alert("Timer Finished");
    }
  };

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerId(tid);
    }

    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, minutes, seconds]);

  return (
    <div className="App">
      <h1>CountDown Timer</h1>
      {!isStart ? (
        <InputTimer handleInput={handleInput} handleStart={handleStart} />
      ) : (
        <ShowTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          handleResume={handleResume}
          handlePause={handlePause}
          handleReset={handleReset}
          isPause={isPause}
        />
      )}
    </div>
  );
}

export default App;
