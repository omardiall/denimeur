var board = [];
var rows = 8 ;
var colums = 8 ;

var minescount = 5;
var mineslocation = []; 
var tilesClicked = 0 ;
var flagEnabled = false;

var gameOver = false ;

window.onload = function() {
    document.getElementById("start-button").addEventListener("click", resetGame);
};


function setmines(){
   // mineslocation.push("2-2");
   // mineslocation.push("2-3");
   
    let minesLeft = minescount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * colums);
        let id = r.toString() + "-" + c.toString();

        if (!mineslocation.includes(id)) {
            mineslocation.push(id);
            minesLeft -= 1;
        }
    }


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
    if(gameOver || this.classList.contains("title-clicked")){
        return;
    }



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
        
        gameOver=true
        revealMines();
        return;
    }

    
    let coords = tile.id.split("-"); 
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

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= colums) {
        return;
    }
    let tile = board[r][c];
    if (tile.classList.contains("title-clicked")) {
        return;
    }

    
    tile.classList.add("title-clicked");
    tilesClicked++;

    let minesFound = 0;

    
    minesFound += checkTile(r - 1, c - 1); 
    minesFound += checkTile(r - 1, c);     
    minesFound += checkTile(r - 1, c + 1); 

    minesFound += checkTile(r, c - 1);     
    minesFound += checkTile(r, c + 1);  



    minesFound += checkTile(r + 1, c - 1); 
    minesFound += checkTile(r + 1, c);     
    minesFound += checkTile(r + 1, c + 1); 

    
    if (minesFound > 0) {
        tile.innerText = minesFound;
        tile.classList.add("x" + minesFound.toString());
    } else {
        
        checkMine(r - 1, c - 1);
        checkMine(r - 1, c);      
        checkMine(r - 1, c + 1);

        checkMine(r, c - 1);
        checkMine(r, c + 1);

        checkMine(r + 1, c - 1);
        checkMine(r + 1, c);
        checkMine(r + 1, c + 1);
    }

   
    if (tilesClicked === rows * colums - minescount) {
        document.getElementById("mines-count").innerText = "Cleared!";
        gameOver = true;
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

function resetGame() {
    
    let level = document.getElementById("level-select").value;
    if (level === "Débutant") 
        {
        rows = 9;
        colums = 9;
        minescount = 10;
    } else if (level === "Intermédiaire")
         {
        rows = 16;
        colums = 16;
        minescount = 40;
    } else if (level === "Expert") 
        {
        rows = 22;
        colums = 22;
        minescount = 100;
    } else if (level === "Maître")
         {
        rows = 30;
        colums = 30;
        minescount = 250;
    }

    
    let boardElement = document.getElementById("board");
    boardElement.innerHTML = ""; 

    board = [];
    mineslocation = [];


    tilesClicked = 0;

    gameOver = false;

    
    boardElement.style.gridTemplateRows = `repeat(${rows}, 40px)`;
    boardElement.style.gridTemplateColumns = `repeat(${colums}, 40px)`;

    
    startGame();
}
