import Position from '../Position/Position';

interface IMove {
    from: Position,
    to: Position,
    execute: () => any,
    revert: () => any,
    toBoardNotation: () => string,
    toJSON: () => string,
}

export default IMove;
