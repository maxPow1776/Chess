import { Colors } from '../Colors';
import { Cell } from './../Cell';
import { Figure, FigureNames } from './Figure';
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {
  
  constructor (color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove = (target: Cell): boolean => {
    if (!super.canMove(target)) return false;
    const possibleY = [this.cell.y + 1, this.cell.y - 1, this.cell.y];
    const possibleX = [this.cell.x + 1, this.cell.x - 1, this.cell.x];
    if(possibleY.includes(target.y) && possibleX.includes(target.x)) 
      return true;
    return false;
  }
}