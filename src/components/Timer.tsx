import { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  currentPlayer: Player | null,
  time: number,
  restart: () => void,
  setLoser: (loser: null | Colors) => void,
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, time, setLoser}) => {
  const [blackTime, setBlackTime] = useState(time);
  const [whiteTime, setWhiteTime] = useState(time);
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
    if (timer.current) {
      clearInterval(timer.current);
    }
    setWhiteTime(time);
    setBlackTime(time);
    restart();
  }

  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  useEffect(() => {
    if (!whiteTime || !blackTime) {
      if (timer.current) {
        clearInterval(timer.current);
      }
      setLoser(currentPlayer?.color ? currentPlayer.color : null);
      restart();
    }
  }, [whiteTime, blackTime])

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
    </div>
  )
};

export default Timer;