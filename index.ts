import Board from './Board/Board';
import PieceType from "./Pieces/Piece";
import KingType from "./Pieces/King";
import MoveType from "./Move/Move";
import ChainMoveType from "./ChainMove/ChainMove";
import MoveHistoryType from "./MoveHistory/MoveHistory";
import * as customTypes from './customTypes';

export default Board;
export type Piece = PieceType;
export type King = KingType;
export type Move = MoveType;
export type ChainMove = ChainMoveType;
export type MoveHistory = MoveHistoryType;
export type Diagonal = customTypes.Diagonal;
export type Side = customTypes.Side;
export type GameOutcome = customTypes.GameOutcome;
