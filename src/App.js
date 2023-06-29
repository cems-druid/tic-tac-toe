import './App.css';
import './styles.css';
import { useState } from 'react';


function Cell({value, onSquareClick}){
  return (
  <
    button className='square'
    onClick={onSquareClick}
  >
    {value}
  </button>
  )
}

function Board( {isXsTurn, squares, onPlay}){
  const winner = calculateWinner(squares);

  let status;
  if(winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (isXsTurn ? "X" : "O");
  }

  function handleClick(i){

    if(squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    if(isXsTurn)
      nextSquares[i] = "X";
    else      
      nextSquares[i] = 'O';
    onPlay(nextSquares);
  }

  return(

    <div className="App">
    <div className='status'> {status} </div>
    <div className='board-row'>
    <Cell value={squares[0]} onSquareClick={() => handleClick(0)}/>
    <Cell value={squares[1]} onSquareClick={() => handleClick(1)}/>
    <Cell value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>

    <div className='board-row'>
    <Cell value={squares[3]} onSquareClick={() => handleClick(3)}/>
    <Cell value={squares[4]} onSquareClick={() => handleClick(4)}/>
    <Cell value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>

    <div className='board-row'>
    <Cell value={squares[6]} onSquareClick={() => handleClick(6)}/>
    <Cell value={squares[7]} onSquareClick={() => handleClick(7)}/>
    <Cell value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </div>

  ) 
}


export default function Game(){
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[currentMove];

  const isXsTurn = currentMove % 2 === 0;
  
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory([nextHistory.length-1]);
    setIsXsTurn(!isXsTurn);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = "Go to move #" + move;
    }
    else{
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board isXsTurn={isXsTurn} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}


function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
  
}


