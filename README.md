# React Trutorial Tic-Tac-Toe
리액트 공식 문서의 튜토리얼을 참고하여 개인 공부용으로 제작하였습니다.  
(https://react.dev/learn/tutorial-tic-tac-toe)

## 1. Inspecting the Starter Code
### 예시 코드
```
export default function Square() {
  return <button className="square">X</button>;
}
```

### 함수 선언 및 export 방식
- `export default function Square()`는 Square라는 함수를 선언하고 외부 파일에서 사용할 수 있게 내보낸다.  
- `export`는 모듈 밖에서 접근 가능하게 만드는 키워드이다.  
- `default`는 이 파일의 대표(기본) 함수임을 의미한다.  
- 다른 파일에서는 이름을 자유롭게 정해 import 할 수 있다.  
- 이 함수는 JSX를 반환하는 React 컴포넌트 역할을 한다.

### JSX 반환 구조 (UI 렌더링)
- `return` 키워드는 함수의 실행 결과를 호출한 곳으로 반환한다.  
- `<button>`은 JSX 요소로, 화면에 버튼을 표시한다.  
- JSX는 JavaScript 코드와 HTML 태그를 결합한 문법이다.  
- `className="square"`는 CSS 스타일을 적용하기 위한 클래스 지정이다.  
- `X`는 버튼 안에 표시되는 텍스트이며 `</button>`으로 요소를 닫는다.

### index.js 파일의 역할
- React 앱의 시작점(Entry Point)
- 컴포넌트와 브라우저 연결
- 스타일 및 메인 컴포넌트 로드
- 화면에 렌더링 수행

## 2. Building the board
### 예시 코드
```
export default function Square() {
  return (
    <>
      <button className="square">X</button>
      <button className="square">X</button>
    </>
  );
}
```
### React 컴포넌트 반환 구조 이해하기
- `App.js`는 주요 컴포넌트를 작성하는 핵심 파일이다.
- JSX에서는 여러 요소를 나란히 반환할 수 없다.
- React 컴포넌트는 반드시 하나의 JSX 요소만 반환해야 한다.
- Fragment는 불필요한 HTML 태그를 추가하지 않고 묶어주는 역할을 한다.
- 두 개 이상의 요소를 반환하려면 Fragment(`<> </>`)로 감싸야 한다.
- 만약 Fragment를 사용하지 않는다면 아래와 같은 오류가 발생한다.  
    `/src/App.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX Fragment <>...</>?`

## 3. Passing data through props
### 예시 코드
```
function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
                .
                .
                .
        <Square value="9" />
      </div>
    </>
  );
}
```

### 재사용 컴포넌트와 Props 전달
- React는 컴포넌트를 재사용하여 중복 코드를 줄일 수 있다.  
- 기존 버튼 JSX를 분리해 `Square` 컴포넌트를 생성한다.  
- `Board` 컴포넌트에서 `<Square />`를 여러 번 렌더링해 보드를 구성한다.  
- 컴포넌트 이름은 반드시 대문자로 시작해야 한다.  
- 각 Square에 값을 전달하기 위해 props(`value`)를 사용한다.  
- JSX에서 JavaScript 변수를 출력하려면 `{}` 중괄호를 사용한다.  
- `Board`에서 `value`를 전달하면 각 Square가 서로 다른 값을 표시한다.
 
## 4. Making an interactive component
### 예시 코드
```
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button className="square" onClick={handleClick}>
        {value}
    </button>
  );
}
```

### React State를 활용한 UI 업데이트
- `onClick` 속성을 사용해 버튼 클릭 이벤트를 처리할 수 있다.  
- 클릭 시 실행될 함수 `handleClick`를 컴포넌트 내부에 정의한다.  
- 처음에는 `console.log()`로 클릭 동작을 확인한다.  
- 컴포넌트가 값을 기억하도록 `useState`를 사용해 상태를 관리한다.  
- `useState(null)`은 초기값을 null로 설정한다.  
- `value`는 현재 상태 값이고 `setValue`는 값을 변경하는 함수이다.  
- 클릭 시 `setValue('X')`를 호출해 상태를 변경한다.  
- 상태가 변경되면 React가 자동으로 컴포넌트를 다시 렌더링한다.  
- 각 `Square` 컴포넌트는 서로 독립적인 state를 가진다.

## 5. Lifting state up
### 예시 코드
```
function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Board() {
    const[squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        const nextSquares = squares.slice();
        nextSquares[i] = "X";
        setSquares(nextSquares);
    }

    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
                                            .
                                            .
                                            .
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}
```

### 부모 컴포넌트에서 State 관리하기
- 여러 Square의 상태를 관리하기 위해 state를 부모(Board) 컴포넌트로 이동한다.  
- Board는 9개의 값을 담은 배열 `squares`를 state로 관리한다.  
- 각 Square는 자신의 값을 props로 전달받아 표시한다.  
- Square 내부의 state와 클릭 이벤트는 제거한다.  
- 자식 컴포넌트가 부모 state를 변경할 수 있도록 함수 props를 전달한다.  
- `onSquareClick`을 통해 클릭 시 Board의 `handleClick` 함수가 실행된다.  
- `handleClick`은 배열을 복사한 후 특정 인덱스 값을 변경한다.  
- `setSquares`를 호출하면 React가 자동으로 화면을 다시 렌더링한다.  
- 무한 렌더링을 방지하기 위해 함수 호출 대신 화살표 함수로 전달한다.
- 무한 렌더링 시 아래와 같은 오류가 발생한다.  
  `Too many re-renders. React limits the number of renders to prevent an infinite loop.`
- 각 Square는 인덱스를 인자로 받아 자신의 위치를 업데이트한다.  
- 모든 게임 상태는 Board 컴포넌트에서 중앙 관리된다.

## 6. Why immutability is important
### 예시 코드
```
function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return ...
```

### 불변성(Immutability)과 차례 관리 구현
- React에서는 기존 state를 직접 수정하지 않고 복사본을 만들어 변경한다.  
- `.slice()`를 사용해 배열을 복사한 후 새로운 값으로 업데이트한다.  
- 데이터 변경 방식에는 직접 수정(mutation)과 복사 후 변경이 있다.  
- 불변성을 유지하면 이전 상태를 보존할 수 있어 undo/redo 기능 구현이 쉽다.  
- 변경 여부 비교가 쉬워져 성능 최적화에도 유리하다.  
- 다음 차례를 관리하기 위해 `xIsNext` boolean state를 추가한다.  
- 클릭 시 `xIsNext` 값에 따라 "X" 또는 "O"를 저장한다.  
- 한 번 클릭 후에는 `xIsNext`를 반전시켜 차례를 변경한다.  
- 이미 값이 있는 칸은 더 이상 수정되지 않도록 early return 처리한다.  
- 이를 통해 게임 규칙에 맞는 동작을 구현한다.

## 7. Declaring a winner
### 예시 코드
```
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function handleClick(i) {
  if (squares[i] || calculateWinner(squares)) {
    return;
  }
  ...
}
```

### 게임 결과 로직 구현
- 게임 승자를 확인하기 위해 `calculateWinner` 헬퍼 함수를 추가한다.  
- 이 함수는 9칸 배열을 받아 승리 조건을 검사한다.  
- 가로, 세로, 대각선 조합을 순회하며 같은 값이 있는지 확인한다.  
- 승자가 있으면 "X" 또는 "O"를 반환하고 없으면 null을 반환한다.  
- 클릭 시 이미 값이 있거나 승자가 있으면 더 이상 진행하지 않는다.  
- Board 컴포넌트에서 `calculateWinner(squares)`를 호출해 결과를 저장한다.  
- 승자가 있으면 "Winner: X/O" 메시지를 표시한다.  
- 게임 중이면 다음 차례 플레이어를 화면에 출력한다.  
- 상태 메시지는 UI 상단에 실시간으로 반영된다.

## 8. Lifting state up, again
### 예시 코드
```
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  ...
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

```

### 최상위 Game 컴포넌트와 히스토리 상태 관리
- 게임 전체 상태를 관리하기 위해 최상위 Game 컴포넌트를 생성한다.  
- Game 컴포넌트는 Board와 게임 정보 영역을 함께 렌더링한다.  
- 기존 Board의 state를 Game으로 끌어올려 history로 관리한다.  
- history는 각 턴의 보드 상태를 배열 형태로 저장한다.  
- 현재 보드는 history의 마지막 값을 사용해 계산한다.  
- Game에서 handlePlay 함수를 만들어 Board로 전달한다.  
- Board는 클릭 시 변경된 squares 배열을 onPlay로 전달한다.  
- Board는 더 이상 자체 state를 가지지 않고 props로만 동작한다.  
- handlePlay는 새로운 보드 상태를 history에 추가한다.  
- 동시에 xIsNext 값을 반전시켜 다음 차례를 관리한다.  
- spread 문법을 사용해 기존 기록을 유지한 채 새 상태를 추가한다.  
- 모든 게임 흐름 제어는 Game 컴포넌트에서 중앙 관리된다.
- 전개 연산자(...) : 배열 안의 요소들을 하나씩 풀어서 복사

## 9. Showing the past moves
### 예시 코드
```
function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
```

### map을 이용한 이동 기록 렌더링
- React 요소는 JavaScript 객체이므로 배열로 관리하고 렌더링할 수 있다.
- history 배열을 map()으로 순회해 이동 기록 버튼 리스트로 변환한다.
- 각 이동마다 `<li>`와 `<button>`을 생성해 과거 상태로 이동할 수 있게 한다.
- 버튼 클릭 시 jumpTo(move) 함수가 호출된다.
- 리스트 렌더링 시 고유한 key prop이 필요하며 없으면 경고가 발생한다.
- React는 리스트 렌더링 시 각 요소에 고유한 `key` prop을 요구한다.  
- key가 없으면 콘솔에 경고 메시지가 출력된다.
    `Warning: Each child in an array or iterator should have a unique “key” prop. Check the render method of 'Game'.`

## 10. Picking a key
### 예시 코드
```
<li key={move}>
```

### React 리스트 렌더링에서 key의 역할
- React는 리스트를 다시 렌더링할 때 각 항목을 구분하기 위해 key를 사용한다.
- key는 각 컴포넌트의 고유한 정체성을 나타내며 상태 유지에 도움을 준다.
- 데이터의 id 같은 변하지 않는 값을 key로 사용하는 것이 가장 좋다.
- key가 없으면 React는 배열 인덱스를 사용하며 이는 버그를 유발할 수 있다.
- key는 형제 요소 사이에서만 고유하면 된다.

## 11. Implementing time travel 
### 예시 코드
```
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  ...
}
```

### 히스토리 관리와 시간 되돌리기 기능 구현
- 틱택토 히스토리는 순서가 변하지 않으므로 move 인덱스를 key로 사용해도 안전하다.
- <li key={move}>를 추가하면 React의 key 경고가 사라진다.
- currentMove 상태를 추가해 현재 보고 있는 수를 관리한다.
- jumpTo 함수로 특정 시점으로 이동하며 차례(X/O)도 함께 조정한다.
- 새로운 수를 둘 때는 slice로 이전 기록 이후를 잘라 히스토리를 갱신한다.

## 12. Final cleanup 
### 예시 코드
```
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  ...
}
```
### 중복 상태를 제거하고 currentMove로 다음 차례 계산하기
- currentMove가 짝수면 X 차례, 홀수면 O 차례라는 규칙이 항상 성립한다.
- 따라서 xIsNext를 별도의 state로 저장할 필요가 없다.
- xIsNext는 currentMove % 2 === 0 으로 계산해서 사용한다.
- 중복 state를 제거하면 버그 가능성이 줄고 코드가 단순해진다.
- 상태 간 불일치(sync 문제)를 원천적으로 방지할 수 있다.