import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void,
  currentPlayer: Player | null,
  swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = (cell: Cell): void => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if(cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
    }
  }

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell])

  return (
    <div>
      <h3>Current player: {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => 
          <React.Fragment key={index}>
            {row.map(cell =>
              <CellComponent
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                click={click}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default BoardComponent;