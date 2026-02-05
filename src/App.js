import { useState } from 'react'

//정사각형 선택 칸
function Square({value, onSquareClick}) { //컴포넌트에 props 설정하여 값 전달
    return <button className="square" onClick={onSquareClick}>{value}</button>

    // const[value, setValue] = useState(null); //컴포넌트가 값을 기억함

    // function handleClick() { //클릭 이벤트 핸들러
    //     //console.log('Clicked number is : ' + value);
    //     setValue('X');
    // }
    //
    // return (
    //     <button className="square" onClick={handleClick}>
    //         {value}
    //     </button>
    // );
}

//보드 컴포넌트
// export default function Board() {
function Board({ xIsNext, squares, onPlay }) { //최상위 컴포넌트 변경 (Board -> Game)
    // const[xIsNext, setXIsNext] = useState(true);
    //React 컴포넌트를 리팩토링할 때 상태를 부모 컴포넌트로 옮김
    // const[squares, setSquares] = useState(Array(9).fill(null));

    //클릭 이벤트 핸들러
    function handleClick(i) {
        //1. 이미 선택된 칸은 선택 불가
        //2. 승리한 게임은 더 이상 진행 불가
        if(squares[i] || calculateWinner(squares)) return;

        const nextSquares = squares.slice(); //배열 복사

        if(xIsNext) {
            //첫 번째 움직임을 X로 설정
            nextSquares[i] = "X";
        } else {
            //두 번째 움직임을 O로 설정
            nextSquares[i] = "O";
        }

        // setSquares(nextSquares);
        // setXIsNext(!xIsNext); //턴 변경
        onPlay(nextSquares);
    }

    //승자 또는 다음 플레이어 표시
    const winner = calculateWinner(squares);
    let status;
    if(winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div  className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

//게임 결과 판단
function calculateWinner(squares) {
    const lines = [ //승리 조건 배열
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

//최상위 컴포넌트 변경 (Board -> Game)
export default function Game() { //전체 게임 기록 저장
    //플레이어 및 이동 내역 추적
    // const[xIsNext, setXIsNext] = useState(true);
    const[history, setHistory] = useState([Array(9).fill(null)]);
    //현재 이동한 칸
    const [currentMove, setCurrentMove] = useState(0);
    // const currentSquares = history[history.length - 1];
    const currentSquares = history[currentMove];
    //이동 내역을 status 변수로 저장하지 않고 파악하도록 수정
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        // setHistory([...history, nextSquares]); //전개 연산자(...) : 배열 안의 요소들을 하나씩 풀어서 복사
        setCurrentMove(nextHistory.length - 1);
        // setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        // setXIsNext(nextMove % 2 === 0);
    }

    //이동 내역 렌더링
    const moves = history.map((squares, move) => {
       let description;
       if(move > 0) {
           description = 'Go to move #' + move;
       } else {
           description = 'Go to game start';
       }

       return (
         <li key={move}>
             <button onClick={() => jumpTo(move)}>{description}</button>
         </li>
       );
    });

    return (
      <div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
            <ol>{moves}</ol>
        </div>
      </div>
    );
}