import { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import StartModal from "./components/StartModal";
import Timer from "./components/Timer";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isShowModal, setIsShowModal] = useState(true);
  const [time, setTime] = useState(300);
  const [loser, setLoser] = useState<Colors | null>(null);

  const restart = () => {
    setIsShowModal(true);
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setCurrentPlayer(whitePlayer);
    setBoard(newBoard);
  }

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])

  return (
    <>
      <StartModal
        loser={loser}
        isShow={isShowModal}
        time={time}
        setTime={setTime}
        setIsShowModal={setIsShowModal}
        setLoser={setLoser}
      />
      <div className="game">
        {!isShowModal && 
          <Timer
            time={time}
            restart={restart}
            currentPlayer={currentPlayer}
            setLoser={setLoser}
          />
        }
        <BoardComponent 
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
        <div>
          <LostFigures
            title='Black figures'
            figures={board.lostBlackFigures}
          />
          <LostFigures
            title='White figures'
            figures={board.lostWhiteFigures}
          />
        </div>
      </div>
    </>
  );
};

export default App;