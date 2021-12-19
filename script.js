//绘制棋盘
function renderBoard(PaneRows, PaneCols, grid) {
    let boardEl = document.querySelector("#board");

    for (let x = 0; x < PaneRows; x++) {
        let trEl = document.createElement("tr");
        for (let y = 0; y < PaneCols; y++) {
            let cellEl = document.createElement("div");
            cellEl.className = "cell";
            grid[x][y].cellEl = cellEl;

            cellEl.addEventListener("click", (e)=> {
                if (grid[x][y].count === -1) {
                    explode(grid, x, y, PaneRows, PaneCols)
                    alert("boom!")
                    return;//16
                }

                if (grid[x][y].count === 0 ) {   //19
                    searchClearArea(grid, x, y, PaneRows, PaneCols);
                } else if (grid[x][y].count > 0) {
                    grid[x][y].clear = true;
                    cellEl.classList.add("clear");
                    grid[x][y].cellEl.innerText = grid[x][y].count;
                }

                checkAllClear(grid);
            });

            let tdEl = document.createElement("td");
            tdEl.append(cellEl);

            trEl.append(tdEl);
        }
        boardEl.append(trEl);
    }
}

//找雷的周边
const directions = [
    [-1, -1], [-1, 0], [-1, 1], // 顶上，顶中，顶下
    [0, -1], [0, 1],//中左，中右
    [1, -1], [1, 0], [1, 1], //下左，下中，下右
]

function initialize(PaneRows, PaneCols, numMines) {
    let grid = new Array(PaneRows);
    for (let x = 0; x < PaneRows; x++) {
        grid[x] = new Array(PaneCols);
        for (let y = 0; y < PaneCols; y++) {
            grid[x][y] = {
                clear: false,
                count: 0
            };
        }
    }

    let mines = [];
    for (let k = 0; k < numMines; k++) {
        let cellSn = Math.trunc(Math.random() * PaneRows * PaneCols);
        let row = Math.trunc(cellSn / PaneCols);
        let col = cellSn % PaneCols;

        console.log(cellSn, row, col);

        grid[row][col].count = -1;
        mines.push([row, col]);
    }

    // 计算有雷的周边为零的周边雷数
    for (let [row, col] of mines) {
        console.log("mine: ", row, col);
        for (let [drow, dcol] of directions) {
            let cellRow = row + drow;
            let cellCol = col + dcol;
            if (cellRow < 0 || cellRow >= PaneRows || cellCol < 0 || cellCol >= PaneCols) {
                continue;    //限制雷的定位范围
            }
            if (grid[cellRow][cellCol].count === 0) {
                console.log("target: ", cellRow, cellCol);

                let count = 0;
                for (let [arow, acol] of directions) {
                    let ambientRow = cellRow + arow;
                    let ambientCol = cellCol + acol;
                    if (ambientRow < 0 || ambientRow >= PaneRows || ambientCol < 0 || ambientCol >= PaneCols) {
                        continue;
                    }

                    if (grid[ambientRow][ambientCol].count === -1) {
                        console.log("danger!", ambientRow, ambientCol);
                        count += 1;
                    }
                }
                if (count > 0) {
                    grid[cellRow][cellCol].count = count;
                }
            }
        }
    }
    return grid;
}
//116
function searchClearArea(grid, x, y, PaneRows, Panecols) {
    let gridCell = grid[x][y];
    gridCell.clear = true;
    gridCell.cellEl.classList.add("clear");

    for (let [drow, dcol] of directions) {
        let cellRow = x + drow;
        let cellCol = y + dcol;
        console.log(cellRow, cellCol, PaneRows, Panecols);
        if (cellRow < 0 || cellRow >= PaneRows || cellCol < 0 || cellCol >= Panecols) {
            continue;
        }

        let gridCell = grid[cellRow][cellCol];

        console.log(cellRow, cellCol, gridCell);
       
        if (!gridCell.clear) {
            gridCell.clear = true;
            gridCell.cellEl.classList.add("clear");
            if (gridCell.count === 0) {
                searchClearArea(grid, cellRow, cellCol, PaneRows, Panecols);
            } 
            else if (gridCell.count > 0) {
                gridCell.cellEl.innerText = gridCell.count;
            } 
        }
    }
}

function explode(grid, x, y, PaneRows, PaneCols) {
    grid[x][y].cellEl.classList.add("exploded");

    for (let cellRow = 0; cellRow < PaneRows; cellRow++) {
        for (let cellCol = 0; cellCol < PaneCols; cellCol++) {
            let cell =  grid[cellRow][cellCol];//129
            cell.clear = true;
            cell.cellEl.classList.add('clear');   //成功扫雷

            if (cell.count === -1) {
                cell.cellEl.classList.add('landmine'); //扫出了雷
            }
        }
    }
}
   
function checkAllClear(grid) {
    for (let row = 0; row < grid.length; row ++) {
        for (let col = 0; col < grid.length; col ++) {
            let cell = grid[row][col];
            if (cell.count !== -1 && !cell.clear) {
                return false;
            }
        }
    }
    
    for (let row = 0; row < grid.length; row ++) {
        for (let col = 0; col < grid.length; col ++) {
            let cell = grid[row][col];
            if (cell.count === -1) {
                cell.cellEl.classList.add('landmine');
            }

            cell.cellEl.classList.add("success");
        }
    }
    return true;
}
//不同等级的设定
function toclear(e) {
        let deltr = document.getElementsByTagName("tr") ;
        for (let i = 0; i < deltr.length;) {
            deltr[0].remove();
        }
 }
    
function basicset(e) {
    
    let grid = initialize(9,9,9);
    renderBoard(9,9,grid);
    
    let inputEl = document.getElementsByClassName("diffiset");
    
    for (i = 0; i < inputEl.length; i++) {
    
            inputEl[i].onclick = function() {
    
                let boxwidth,boxheight,num;
                
                if (this.id == 0) {
                    boxwidth = 9;
                    boxheight = 9;
                    num = 9;
    
                } else if (this.id == 1) {
                    boxwidth = 16;
                    boxheight = 16;
                    num = 40;
    
                } else if (this.id == 2) {
                    boxwidth = 30;
                    boxheight = 16;
                    num = 98;
                    
                } else if (this.id == 3) {
                    boxwidth = prompt("请输入宽：");
                    boxheight = boxwidth && prompt("请输入高：");
                    num = boxheight && prompt("请输入雷数：");
                    if (! (boxwidth && boxheight && num)) {
                        return;
                      }
                    if (num > boxwidth * boxheight) {
                        alert("！！！warnin！请重新输入小一点的雷数！")
                    }
                }
                grid.PaneRows = boxheight;
                grid.PaneCols = boxwidth;
                grid.numMines= num;
                toclear();
                grid = initialize(grid.PaneRows,grid.PaneCols,grid.numMines);
                renderBoard(grid.length, grid[1].length, grid);
            }
    }    
    let resest = document.querySelector("#resest");
    resest.addEventListener("click", (e)=> {
        toclear();
        let grid = initialize(9,9,9);
        renderBoard(9, 9, grid);
    });  
}
basicset();
