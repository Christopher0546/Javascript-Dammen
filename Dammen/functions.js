console.log("functions.js loaded");

let turnCount = 0;

// Shows a checkered board, with the pieces based on the board array
function ShowBoard() {
    let html = "";
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
        html += CreateCell(x, y);
        }
    }
    playFieldHtml.innerHTML = html;
}

// Returns the html for a cell at the given x and y; if a piece is present, it will be added to the cell
function CreateCell(x, y){
    // decide if the cell is black or white based on x and y
    let color = (x + y) % 2 == 0 ? "black" : "white";
    
    let piece = "";

    // If there is a piece at this location, add a white or black piece to the cell
    if (board[x][y] === 1) {
        piece = '<div class="piece white"></div>';
    } else if (board[x][y] === -1) {
        piece = '<div class="piece black"></div>';
    }
    
    let cell = '<div class="cell '+ color+'" id="cell_' + x + '_'+ y + '" style="grid-column: ' + (x + 1) + '; grid-row: ' + (y + 1) + ';" onclick="CellClicked('+x+', '+y+')">'+piece+'</div>';

    return cell;
}

// Places player's and opponent's pieces on the board
function Setup() {
    // Place player pieces (bottom two rows) and opponent pieces (top two rows)
    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < width; x++) {
            PlacePiece(x, y, 1);
        }
    }

    for (let y = 6; y < 8; y++) {
        for (let x = 0; x < width; x++) {
            PlacePiece(x, y, -1);
        }
    }
}

// Clear all cells
function ClearBoard(){
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            ClearCell(x, y);
        }
    }
}

// Clear a specific cell
function ClearCell(x, y) {
    board[x][y] = 0;
    ShowBoard();
}

// Place a player or opponent piece on the board
function PlacePiece(x, y, player) {
    board[x][y] = player;
}

// Handle a cell being clicked
function CellClicked(x, y){
    console.log("Cell clicked: " + x + ", " + y);

    if(firstClick == null){
        firstClick = [x, y];

        firstClickX = x;
        firstClickY = y;

    } else {
        secondClick = [x, y];
        secondClickX = x;
        secondClickY = y;

        MovePiece(firstClick, secondClick, board[firstClick[0]][firstClick[1]]);
        firstClickX = null;
        firstClickY = null;
        firstClick = null;
    }

    ShowBoard();
}


function getFirstClickX(){
    return firstClick[0];
}

function getFirstClickY(){
    return firstClick[1];
}

function getSecondClickX(){
    return secondClick[0];
}

function getSecondClickY(){
    return secondClick[1];
}

function isEmpty(x, y){
    return board[x][y] == 0;
}

function GetMoveDirection(firstClickX, firstClickY, secondClickX, secondClickY){
    let deltaX = secondClickX - firstClickX;
    let deltaY = secondClickY - firstClickY;

    if(deltaX == 0 && deltaY == 0){
        return "none";
    }
    if(Math.abs(deltaX) == Math.abs(deltaY)){
        return "diagonal";
    }
    if(deltaX == 0){
        return "vertical";
    }
    if(deltaY == 0){
        return "horizontal";
    }

    return "other";
}

function GetManhattanDistance(firstClickX, firstClickY, secondClickX, secondClickY){
    return Math.abs(secondClickX - firstClickX) + Math.abs(secondClickY - firstClickY);
}

function GetChebyshevDistance(firstClickX, firstClickY, secondClickX, secondClickY){
    return Math.max(Math.abs(secondClickX - firstClickX), Math.abs(secondClickY - firstClickY));
}

function NextTurn() {
    turn = turn * -1;
    turnCount++;
    console.log("========== Turn " + turnCount + " ==========");
}

function GetPiece(x, y) {
    return board[x][y];
}

function CountPieces(player) {
    let count = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if(board[x][y] == player){
                count++;
            }
        }
    }
    return count;
}

function CheckWin() {
    if(CountPieces(1) == 0){
        console.log("Player 2 wins!");
    }
    if(CountPieces(-1) == 0){
        console.log("Player 1 wins!");
    }
}