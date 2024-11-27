console.log("script.js loaded");
let playFieldHtml = document.querySelector("#playField");

let width = 8;
let height = 8;

let firstClick;
let secondClick;

let firstClickX;
let firstClickY;

let secondClickX;
let secondClickY;

let turn = 1;

// Set up the board
let board = [];
for (let i = 0; i < 8; i++) {
board[i] = new Array(8);
}

function MovePiece(firstClick, secondClick, player){

    // The next code doesn't do anything, but it shows how you can use the functions from functions.js
    // Try and use these functions to check if a move is valid. If a move is not valid, you can use return
    // to stop the function from executing further. This way, you can prevent the player from making an invalid move.

    // Check whose turn it is
    if(turn == 1){
        console.log("Player 1's turn");
    }
    else {
        console.log("Player 2's turn");
    }

    // Check the starting cell (firstclick)
    if(GetPiece(firstClickX, firstClickY) == 0){
        console.log("No piece to move");
    }
    if(GetPiece(firstClickX, firstClickY) != player){
        console.log("Not your piece to move");
    }

    // Check the destination cell (secondclick)
    if(GetPiece(secondClickX, secondClickY) == 1){
        console.log("Cell occupied by your piece");
    }
    if(GetPiece(secondClickX, secondClickY) == -1){
        console.log("Cell occupied by opponent piece");
    }

    // GetMoveDirection returns a string with the direction of the move: "horizontal", "vertical", "diagonal", "none" 
    // or "other". You can use this to implement rules about only moving pieces in certain directions.
    // If you want other directions (maybe a knights move in chess), you will have to add this functionality
    // to GetMoveDirection yourself.
    let moveDirection = GetMoveDirection(firstClickX, firstClickY, secondClickX, secondClickY);
    console.log("Move direction for this move is: " + moveDirection);

    // Manhattan distance is the distance between two points in a grid, where you can only move horizontally and
    // vertically. Chebyshev distance is the distance between two points in a grid, where you can also move diagonally.
    // Which distance is important to you depends on whether you can move diagonally in your game.
    let manhattanDistance = GetManhattanDistance(firstClickX, firstClickY, secondClickX, secondClickY);
    console.log("Manhattan distance for this move is: " + manhattanDistance);

    let chebyshevDistance = GetChebyshevDistance(firstClickX, firstClickY, secondClickX, secondClickY);
    console.log("Chebyshev distance for this move is: " + chebyshevDistance);

    console.log("Moving piece from " + firstClickX + ", " + firstClickY + " to " + secondClickX + ", " + secondClickY);

    // Voorbeeld
    if(moveDirection != "diagonal")
        return;
    if(chebyshevDistance != 1)
        return;

    // If this is a valid move, we clear the first cell
    ClearCell(firstClickX, firstClickY);

    // Now we place the piece in the second cell
    PlacePiece(secondClickX, secondClickY, player);

    CheckWin();

    // Move to the next turn
    NextTurn();
}

ClearBoard();
Setup();
ShowBoard();