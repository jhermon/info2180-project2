window.onload = function() {
    main();  
}

let space = [];
let num = 15;

function main() {
    let puzzle_area = document.getElementById("puzzlearea").getElementsByTagName("div");
    document.getElementById("shufflebutton").onclick = shuffle;

    function pieceOfPuzzle(row, col, id, picture) {
    this.row = row;
    this.col = col;
    this.id = id;
    this.picture = picture;
    }

    for (let i = 0; i < 15; i++) {
        puzzle_area[i].className = "puzzlepiece";
        puzzle_area[i].onclick = clickChange;
        space[i] = new pieceOfPuzzle(Math.floor(i / 4), i % 4, i + 1, puzzle_area[i]);
        space[i].picture.style.backgroundPosition = "-" + space[i].col * 100 + "px -" + space[i].row * 100 + "px";
    }
    layoutOfPuzzle();
}

function layoutOfPuzzle (){
    for (let i = 0; i < 15; ++i) {
        space[i].picture.style.left = space[i].col * 100 + "px";
        space[i].picture.style.top = space[i].row * 100 + "px";
    }
}

function movement ( _row, _col) {
    for (let i = 0; i < 15; ++i)
        if (Math.abs(space[i].row - _row) + Math.abs(space[i].col - _col) != 1){
            space[i].picture.className = "puzzlepiece";
        }else{
            space[i].picture.className += " movablepiece";
        }
}

function shuffle (){
    let s = 0;
    for (let i = 0; i < 100; ++i) {
        while (Math.abs(space[s].row - Math.floor(num / 4)) + Math.abs(space[s].col - num % 4) != 1){
            s == 14 ? s = 0 : s++;
        }
        move(s, Math.floor(num / 4), num % 4);
        s == 14 ? s = 0 : s++;
    }
    layoutOfPuzzle();
}

function check () {
    for (let i = 0; i < 15; i++)
        if (space[i].row * 4 + space[i].col != space[i].id - 1){
          return false;  
        } 
    return true;
}

function move (choose, _row, _col){
    
    num = space[choose].row * 4 + space[choose].col;
    space[choose].col = _col, space[choose].row = _row;
    layoutOfPuzzle();
}

function clickChange (){
    
    let choose = parseInt(this.textContent) - 1;
    let _row = Math.floor(num / 4);
    let _col = num % 4;
    (Math.abs(space[choose].row - _row) + Math.abs(space[choose].col - _col) != 1); 
    move(choose, _row, _col);
    movement(Math.floor(num / 4), num % 4);
    if (check()){
        let body = document.getElementById('body');
        body[0].style.backgroundColor = "green";
        alert("Congralutions, You Win!");
    }
}
