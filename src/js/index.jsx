import React from 'react';
import ReactDOM from 'react-dom';







function Square(props) {  
  return (                                                      // when button (box) is clicked..., hits onClick function(line58)
    <button className="square" onClick={props.onClick}>             
      {props.value} 
    </button>   
  );
}








class Board extends React.Component {


  // handleClick(i) {
  //   // this will copy this.state.squares (an array with our x's and o's...and nulls)
  //   const copySquares = this.state.squares.slice(); // see constructor to see where this.state.squares is defined for the first time (line 28 - fills with x,o,nulls).
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }
    // if(this.state.xIsNext) {
    //   squares[i] = 'X';
    // } else {
    //   squares[i] = 'O';
    // } this is what copySquares[i] below is doing. 
  //   copySquares[i] = this.state.xIsNext ? 'X' : 'O'; // see this.setState below to see how xIsNext is flipped/switched/whatever. ultimately will be x or o.


  //   // this.state.squares = copySquares;
  //   // this.state.xIsNext = !this.state.xIsNext;
  //   this.setState({                 // setState updates our initial state above, the board state, which contains our array full of nulls. 
  //     squares: copySquares,
  //     xIsNext: !this.state.xIsNext,     // updates the above state with the the inverse of the previous xIsNext variable. so, if it was true, now it's false.  
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}       // board's state is set equal to value, which is that square at that index(i). 
        onClick={() => this.props.onClick(i)}   // this hits after the first box is clicked. passes (i) to handleClick. (line 34).
      />
    );
  }

  render() { // after this.setState is called, render is called ..... 
    // ... then it will calculate winner 
      // const winner = calculateWinner(this.state.squares); // winner can only be one of three options: X, O, or none. this.state.squares refers to 
      // // ..(cont) lines 28-29 where your array will be that is filled with x's, o's, and nulls. it will pass this to the calculateWinner function
      // //..(cont) which will then see if there are lines of x's o's and whether or not there is a winner. 
      // let status;  // defines empty variable called status 
      // if (winner) {
      //   status = 'Winner: ' + winner; // if there is a winner, it will set status winner: to O or X. 
      // } else {
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // will tell us next player , x or o. 
      // }
  
      return (

      <div>
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
    );
  }
}









class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
//   0     1     2     3     4     5     6     7     8
// [null, null, null, null, null, null, null, null, null]

/*
  0 1 2
  3 4 5
  6 7 8
*/

function calculateWinner(squares) { // squares comes in / is called from line 65 after render is called. 
  const winningLines = [
    [0, 1, 2], // top line horizontal
    [3, 4, 5], // middle line horizontal
    [6, 7, 8], // bottom line horizontal
    [0, 3, 6], // left line vertical
    [1, 4, 7], // middle line vertical
    [2, 5, 8], // right line vertical
    [0, 4, 8], // top left diagonal to bottom right
    [2, 4, 6], // top right 
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {       // squares comes in from calculateWinner, which comes in from.... (follow the trail). 
      //...(cont) it will compare squares at index a and see if it is equal to squares at index b, and compare a to index c (comparing x's and o's, not numbers)
      //...(cont) if there is a match, then we will return squares[a], which is simply just an x or an o. 
      return squares[a];
    }
  }
  return null; //returns null if no match
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);