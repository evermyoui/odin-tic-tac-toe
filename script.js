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
    printBoard(){
        const cellWithValues = this.board.map((row)=> row.map((cell)=> cell.getValues()));
        console.log(cellWithValues);
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
    constructor(){
        this.board_class = new Board();
        this.player_class = new Player();
        this.winner = null;
        this.hasWon = false;
    }
    placeMark(row, column){
        if (row > 2 || column > 2){
            console.log("Out of Bounds");
            return;
        }

        const activePlayer = this.player_class.getActivePlayer();
        const realBoard = this.board_class.getBoard();

        const cell = realBoard[row][column];

        if (cell.getValues() !== null){
            console.log("Already Taken");
            return;
        }
        cell.addMark(activePlayer.mark);

        this.board_class.printBoard();
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
                console.log(`The Winner is : ${this.winner}`);
                return;
            }
        }

        if (!mappedBoard.includes(null)){
                this.winner = "TIE";
                console.log(this.winner);
                return;
        }
    }
}