var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}

var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = ()=> {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=random')
	xhrRequest.send()
}

function isSafe(board,r,c,k,n) {
	for (let i = 0; i<n; i++) {
	  if (board[r][i] == k || board[i][c]==k)
		return false;
	}
	let rn=Math.sqrt(n);
	let si= r-r%rn;
	let sj= c-c%rn;
	for(let x=si; x<si+rn; x++){
		for(let y=sj; y<sj+rn; y++){
			if(board==k){
				return false;
			}
		}
	}
	return true;
  }

function SudokuSolver(board, i, j, n) {
    if (i == n) {
        FillBoard(board)
        return true;
      }
      if (j == n) {
        return SudokuSolver(board, i + 1, 0, n);
      }
      if (board[i][j] != 0) {
        return SudokuSolver(board, i, j + 1, n);
      }
      for (let k = 1; k <= 9; k++) {
        if (isSafe(board, i, j, k, n)) {
          board[i][j] = k;
          let nxtpos = SudokuSolver(board, i, j + 1, n);
          if (nxtpos) {
            return true;
          } 
          board[i][j] = 0;
        }
      }
      return false;
}
  
SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
    };