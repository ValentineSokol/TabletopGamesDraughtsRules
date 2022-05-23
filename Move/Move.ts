import Position from '../Position/Position';
import Board from '../Board/Board';
import Piece from '../Pieces/Piece';
import IMove from '../interfaces/IMove';

class Move implements IMove {
  protected readonly board: Board;

  public from: Position;

  public to: Position;

  public capturedPiecePosition: Position | null = null;

  public capturedPiece: Piece | null = null;

  constructor(
    board: Board,
    from: Position,
    to: Position,
    capturedPiecePosition?: Position,
  ) {
    this.board = board;
    this.from = from;
    this.to = to;

    if (capturedPiecePosition) {
      this.capturedPiecePosition = capturedPiecePosition;
    }
  }

  public execute() : any {
    let chainCaptures : Move[] = [];
    const movingPiece = this.board.getPieceAtPosition(this.from);
    if (!movingPiece) return {};

    this.board.movePiece(this);
    if (Board.hasPiecePromoted(movingPiece)) this.board.promotePiece(movingPiece);

    if (this.capturedPiecePosition) {
      const capturedPiece = this.board.getPieceAtPosition(this.capturedPiecePosition);
      if (capturedPiece) {
        this.capturedPiece = capturedPiece;
        this.board.removePiece(capturedPiece);
        chainCaptures = movingPiece.getAvailableCaptures();
      }
    }
    if (!chainCaptures.length) {
      this.board.finishMove();
    }

    return { movedPiece: movingPiece, hasChainCaptures: chainCaptures.length };
  }

  public revert() {
    const from = this.to;
    const to = this.from;

    if (this.capturedPiece) {
      this.board.placePiece(this.capturedPiece);
    }
    this.board.movePiece(new Move(this.board, from, to));

    const movedPiece = this.board.getPieceAtPosition(to);
    if (movedPiece) {
      const chainCaptures = movedPiece.getAvailableCaptures();
      if (!chainCaptures.length) this.board.finishMove();
    }
  }

  public toBoardNotation() : string {
    const delimiter = this.capturedPiecePosition ? 'x' : '-';
    return `${this.from.toBoardNotation()}${delimiter}${this.to.toBoardNotation()}`;
  }
  public toJSON(): string {
    return JSON.stringify({
      from: this.from,
      to: this.to,
      capturedPiecePosition: this.capturedPiecePosition ? this.capturedPiecePosition.toJSON() : null
    });
  }
}

export default Move;
