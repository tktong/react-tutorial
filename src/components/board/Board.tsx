import React from "react";

import {Square} from "../square/Square";

type BoardProps = {}
type BoardState = {
    squares: string[],
    currentPlayerId: number,
}

class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props)
        this.state = {
            squares: Array(9).fill(""),
            currentPlayerId: 0,
        }
    }

    render() {
        return (
            <div>
                {this.renderStatus()}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }

    private renderStatus() {
        return (
            <div className="status">
                Next player: {Board.getPlayerSymbol(this.state.currentPlayerId)}
            </div>
        )
    }

    private renderSquare(squareIndex: number) {
        return <Square
            value={this.state.squares[squareIndex]}
            onClick={() => this.handleClick(squareIndex)}
        />
    }

    private handleClick(squareIndex:number) {
        if (this.isSquareOccupied(squareIndex)) {
            return;
        }

        const updatedSquares = this.state.squares.slice();
        updatedSquares[squareIndex] = Board.getPlayerSymbol(this.state.currentPlayerId);

        this.setState({
            squares: updatedSquares,
            currentPlayerId: (this.state.currentPlayerId + 1) % 2,
        });
    }

    private isSquareOccupied(squareIndex: number): boolean {
        return this.state.squares[squareIndex] === 'O' || this.state.squares[squareIndex] === 'X';
    }

    private static getPlayerSymbol(playerId: number): string {
        return playerId === 0 ? 'O' : 'X';
    }
}

export default Board;