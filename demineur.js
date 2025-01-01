var board = [];
var rows = 8 ;
var colums = 8 ;

var minescount = 5;
var mineslocation = []; 
var tilesClicked = 0 ;
var flagEnabled = false;

var gameOver = false ;

window.onload = function(){
    startGame();
}

function setmines(){
    mineslocation.push("2-2");
    mineslocation.push("2-3");
    mineslocation.push("5-6");
    mineslocation.push("3-4");
    mineslocation.push("1-1");
}

function startGame(){
    document.getElementById("mines-count").innerText = minescount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setmines();

    for(let r = 0; r < rows ; r++){
        let row = []
        for(let c = 0; c < colums ; c++){
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board)
}

function setFlag(){
    if(flagEnabled){
        flagEnabled = false;
         document.getElementById("flag-button").style.background = "lightgray";

        }
    else{
        flagEnabled = true 
        document.getElementById("flag-button").style.background = "darkgray";

    }
}

function clickTile(){
    let tile = this;
    if (flagEnabled){
        if(tile.innerText == ""){
            tile.innerText = "🚩";
        }
        else if (tile.innerText == "🚩"){
            tile.innerText = ""
        }
        return;
    }
    if (mineslocation.includes(tile.id)){
        // alert("game over")
        gameOver=true
        revealMines();
        return;
    }

    
    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}

function revealMines(){
    for( let r=0; r < rows; r++){
        for(let c = 0; c < colums; c++){
            let tile = board[r][c];
            if(mineslocation.includes(tile.id)){
                tile.innerText = "💣";
                tile.style.backgroundColor="red";
            }
        }
    }
}

function checkMine(r, c){
    if (r < 0 || r >= rows || c < 0 || c >= colums) {
        return;
    }
    if(board[r][c].classList.contains("tile.clicked")){
        return;
    }

    let minesFound = 0;

    //top 3
    minesFound += checkTile(r-1, c-1);      //top left
    minesFound += checkTile(r-1, c);        //top 
    minesFound += checkTile(r-1, c+1);      //top right

    //left and right
    minesFound += checkTile(r, c-1);        //left
    minesFound += checkTile(r, c+1);        //right

    //bottom 3
    minesFound += checkTile(r+1, c-1);      //bottom left
    minesFound += checkTile(r+1, c);        //bottom 
    minesFound += checkTile(r+1, c+1);      //bottom right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else{
        checkMine(r-1,c-1)
        checkMine(r-1,c)
        checkMine(r-1,c+1)

        checkMine(r,c-1)
        checkMine(r,c+1)

        checkMine(r+1,c-1)
        checkMine(r+1,c)
        checkMine(r+1,c+1)
    }

    
}

function checkTile(r,c) {
    if (r < 0 || r >= rows || c < 0 || c >= colums) {
        return 0;
    }
    if (mineslocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}