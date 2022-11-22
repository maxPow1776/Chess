import { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  currentPlayer: Player | null,
  restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
  // add the ability to set the time
  const [blackTime, setBlackTime] = useState(300);
  const [whireTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = currentPlayer?.color === Colors.WHITE
      ? decrementWhiteTimer
      : decrementBlackTimer;
    timer.current  = setInterval(callback, 1000);
  }

  const decrementBlackTimer = () => {
    setBlackTime(prev => prev - 1);
  }
  const decrementWhiteTimer = () => {
    setWhiteTime(prev => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whireTime}</h2>
    </div>
  )
};

export default Timer;