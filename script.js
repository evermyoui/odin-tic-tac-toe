function Board(){
    const row = 3;
    const column = 3;
    const board = [];

    for(let i = 0; i< row; i++){
        board[i]= [];
        for(let j = 0; j < column; j++){
            board[i].push(Cell());
        }
    }
    const printBoard = () => {
        const boardWithValues = board.map((row)=> row.map((cell)=> cell.getValue()));
        
    }

}
function Cell(){
    let value = "";

    const addMark = (mark) => {
        value = mark;
    }
    const getValue = () => value;

    return {
        addMark, getValue
    }
}
function Player(p1 = "PlayerOne", p2 = "PlayerTwo"){
    const players = [{
        name: p1,
        value: "X"
    }, {
        name: p2,
        value: "O"
    }];
    
    let activePlayer = players[0];

    const switchPlayer = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    return {
        switchPlayer, getActivePlayer
    }
}
function Game(){
    const chooseMark = () => {
        
    }
}