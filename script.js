const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restartBtn");
const winner = document.querySelector(".winner");

class Board {
    constructor(){
        this.rows = 3;
        this.columns = 3;
        this.board = [];
        this.resetBoard();
    }
    resetBoard(){
        for (let i = 0; i< this.rows; i++){

            this.board[i] = [];

            for (let j = 0; j < this.columns; j++){
                this.board[i].push(new Cell);
            }
        }
    }
    getBoard(){
        return this.board;
    }
}

class Cell{
    constructor(){
        this.value = null;
    }

    getValues(){
        return this.value;
    }
    addMark(mark){
        this.value = mark;
    }
}

class Player {
    constructor(p1="PlayerOne", p2= "PlayerTwo"){
        this.p1 = p1;
        this.p2 = p2;
        this.players = [{
            name: p1,
            mark: "X"
        },{
            name: p2,
            mark: "O"
        }];
        this.activePlayer = this.players[0];
    }
    switchPlayer(){
        this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
    }
    getActivePlayer(){
        return this.activePlayer;
    }
}

class Game {
    constructor(cells){
        this.board_class = new Board();
        this.player_class = new Player();
        this.winner = null;
        this.hasWon = false;
        this.cells = cells;
    }
    displayGame() {
        const cellWithValues = this.board_class.getBoard().map((row)=> row.map((cell)=> cell.getValues())).flat();

        this.cells.forEach((cell, cellIndex)=>{
            cell.textContent = cellWithValues[cellIndex] || "";
        })
    }
    resetGame(){
        this.board_class.resetBoard();
        this.hasWon = false;
        this.winner = null;
        this.player_class.activePlayer = this.player_class.players[0];
        this.cells.forEach((cell)=>{
            cell.classList.remove("won");
        });
        winner.textContent = ``;
    }

    placeMark(cellRow, cellCol){
        const activePlayer = this.player_class.getActivePlayer();
        const realBoard = this.board_class.getBoard();

        const cell = realBoard[cellRow][cellCol];

        if (cell.getValues() !== null){
            return;
        }
        cell.addMark(activePlayer.mark);

        this.checkWin();

        if (!this.hasWon){
            this.player_class.switchPlayer();
        }
    }
    checkWin(){
        const WIN_PATTERNS = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ];
        const mappedBoard = this.board_class.getBoard().map(row => row.map(cell => cell.getValues())).flat();

        for (let pattern of WIN_PATTERNS){
            const pattern1 = pattern[0];
            const pattern2 = pattern[1];
            const pattern3 = pattern[2];
            
            if (mappedBoard[pattern1] !== null && mappedBoard[pattern1] === mappedBoard[pattern2] && mappedBoard[pattern1] === mappedBoard[pattern3]){
                this.winner = this.player_class.getActivePlayer().name;
                this.hasWon = true;
                pattern.forEach((index)=>{
                    this.cells[index].classList.add("won");
                })
                winner.textContent = `Winner: ${this.winner}`;
                return;
            }
        }

        if (!mappedBoard.includes(null)){
                this.winner = "TIE";
                winner.textContent = `${this.winner}`;
                return;
        }
    }
}


const game = new Game(cells);

cells.forEach((cell)=> {
    cell.addEventListener("click", ()=>{
        if (game.hasWon){
            return;
        }
        const cellRow = cell.getAttribute("cellRow");
        const cellCol = cell.getAttribute("cellCol");
        game.placeMark(cellRow, cellCol);
        game.displayGame();
    })
})

restartBtn.addEventListener("click",()=>{
    game.resetGame();
    game.displayGame();
})