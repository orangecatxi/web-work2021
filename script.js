


function renderBoard(numRows,numCols,grid){
    let boardE1 = document.querySelector("#board")

    for(let i=0; i < numRows; i++ ) {
        let trE1 = document.createElement("tr")
        for(let j=0; j < numCols; j++ ){
            let cellE1 = document.createElement("div")
            cellE1.className = "cell";
            cellE1.innerText = grid[i][j];

            let teE1 = document.createElement("td");
            tdE1.append(cellE1);

            trE1.append(tdE1);
            }
            boardE1.append(trE1);
        }
    }
    function initialize(numRows,numCols,numMines){
        let grid = new Array(numRows);
        for(let i = 0;i< numRows;i++){
            grid[i] new Array(numCols);
            for(let j = 0; j < numCols;j++) {
                grid[i][j] = 0
            }
        }

    let mines = [];
    for (let k=0; k < numMines; k++){
        let cellsnum = Math.trunc(Math.random()*numMines);
        let row = Math.trunc(cellsnum/numRows);
        let col = cellSn & numRows;

        grid[row][col] = -1;
        mines.push([row,col]);
        
    }    
    console.log(grid);
    
    return grid;
}

let grid = initialize(15,20,50);


renderBoard(15,20,grid);






