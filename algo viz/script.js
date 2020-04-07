// center is the div containing all the nodes which are given unique class 
// -> "node01,node02,...nodeij",here i,j are row and index
var container = document.querySelector(".center")
for (let i = 0; i < 32; i++) // 32 = vh/20
{
    for (let j = 0; j < 76; j++) //76 = vw/20
    {
        container.innerHTML += "<div class='unit node" + i + "j" + j + "' ></div>" //giving the unique class to each node
    }
}
for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 76; j++) {

        //adding event listner to ever node 
        document.querySelector(".node" + i + "j" + j).addEventListener("mousemove", () => addWall(i, j))

        // hard coding the start and end point   (to be deleted later on)
        if (i == 7 && j == 10) {
            document.querySelector(".node" + i + "j" + j).classList.add("start")
        }

        if (i == 27 && j == 70) {
            document.querySelector(".node" + i + "j" + j).classList.add("end")
        }
    }
}

// universal variable for path
pathFound = false

// variables used for animating the path
var visited = []
var path = []
a = 0
b = 0

// used for checking mouse down to create wall
isDown = false
document.addEventListener("mousedown", function () {
    isDown = true
})
document.addEventListener("mouseup", function () {
    isDown = false
})

// function to call be called after the button is pressed
function callAll(s) {
    if (s == "dfs") {
        dfs(7, 10, 27, 70)
        setInterval(fillPath, 10);
    }
    if (s == "bfs") {
        bfs(7, 10, 27, 70)
        setInterval(fillPath, 10);
    }
    if (s == "aStar") {
        aStar(7,10,27,70)
        setInterval(fillPath_A, 10);
    }
}

// function to fill path with animation insted of filling in one instance
function fillPath() {
    if (a < visited.length) {
        document.querySelector(visited[a]).classList.add("visited")
        a++
        return
    }

    if (b >= path.length) {
        clearInterval()
        return
    }
    document.querySelector(path[b]).classList.add("path")
    b++
}

// function to add wall
function addWall(i, j) {
    if (isDown) {
        document.querySelector(".node" + i + "j" + j).classList.add("wall")
    }

}



// ______________________________________________DFS starts here_________________________________________________________

// algo for DFS
function dfs(i, j, fi, fj) {
    if (isValid(i, j)) {
        if (!pathFound) {
            if (i == fi && j == fj) {
                pathFound = true
                return
            }
            if (!document.querySelector(".node" + i + "j" + j).classList.contains("start")) visited.push(".node" + i + "j" + j)

            dfs(i - 1, j, fi, fj) //up
            if (pathFound) {
                if (!document.querySelector(".node" + i + "j" + j).classList.contains("start")) path.push(".node" + i + "j" + j)
                return
            }

            dfs(i, j + 1, fi, fj) //right
            if (pathFound) {
                if (!document.querySelector(".node" + i + "j" + j).classList.contains("start")) path.push(".node" + i + "j" + j)
                return
            }

            dfs(i + 1, j, fi, fj) //down
            if (pathFound) {
                if (!document.querySelector(".node" + i + "j" + j).classList.contains("start")) path.push(".node" + i + "j" + j)
                return
            }

            dfs(i, j - 1, fi, fj) //left  
            if (pathFound) {
                if (!document.querySelector(".node" + i + "j" + j).classList.contains("start")) path.push(".node" + i + "j" + j)
                return
            }
        } else return
    } else return
}

// function to check wether i,j are inside the grid and are not visited before(for dfs)
function isValid(i, j) {
    if (i >= 0 && i < 32 && j >= 0 && j < 76) {
        if (visited.indexOf(".node" + i + "j" + j) == -1 && !document.querySelector(".node" + i + "j" + j).classList.contains("wall")) {
            return true
        } else return false
    } else return false
}

// dfs(7,10,27,70)  first two arguments are the starting indices and the next two are the final indices
// ________________________________________________DFS ends here________________________________________________________________

// ________________________________________________BFS starts here on___________________________________________________________

// Queue class
class Queue {
    constructor() {
        this.items = []
    }

    // enqueue function 
    enqueue(element) {
        // adding element to the queue 
        this.items.push(element);
    }

    dequeue() {
        // removing element from the queue 
        // returns underflow when called  
        // on empty queue 
        var toReturn = this.items[0]
        this.items.shift()
        return toReturn
    }

    size() {
        // returns the size of queue
        return this.items.length
    }

    // how to use this class
    // var queue = new Queue(); 
    // queue.enqueue(10); 
    // queue.dequeue();
}

// algo for bfs
function bfs(i, j, fi, fj) {
    var queue = new Queue()
    var moves = ["U", "R", "D", "L"]
    queue.enqueue("")
    p = ""
    while (!foundEnd(i, j, fi, fj, p)) {
        if (queue.size() == 0) break
        p = queue.dequeue()
        for (var a = 0; a < moves.length; a++) {
            check = p + moves[a]
            if (isValid_bfs(i, j, check)) {
                queue.enqueue(check)
            }
        }
    }
    if (foundEnd(i, j, fi, fj, p)) fillPathArr(i, j, p)
    else alert("Path Not Found")
}

// function to fill the final path array
function fillPathArr(i, j, p) {
    path.push(".node" + i + "j" + j)
    for (var a = 0; a < p.length; a++) {
        if (p[a] == "U") i = i - 1
        if (p[a] == "D") i = i + 1
        if (p[a] == "R") j = j + 1
        if (p[a] == "L") j = j - 1
        path.push(".node" + i + "j" + j)
    }
}

// this function checks if the path leads to end
function foundEnd(i, j, fi, fj, p) {
    for (var a = 0; a < p.length; a++) {
        if (p[a] == "U") i = i - 1
        if (p[a] == "D") i = i + 1
        if (p[a] == "R") j = j + 1
        if (p[a] == "L") j = j - 1
    }
    if (i == fi && j == fj) {
        return true
    } else return false
}

// this function checks if the path is valid and if valid it adds that path to "visited" array
function isValid_bfs(i, j, check) {
    for (var a = 0; a < check.length; a++) {
        if (check[a] == "U") i = i - 1
        if (check[a] == "D") i = i + 1
        if (check[a] == "R") j = j + 1
        if (check[a] == "L") j = j - 1
    }
    if (i >= 0 && i < 32 && j >= 0 && j < 76) {
        if (visited.indexOf(".node" + i + "j" + j) == -1 && !document.querySelector(".node" + i + "j" + j).classList.contains("wall")) {
            visited.push(".node" + i + "j" + j)
            return true
        }
    } else return false
}
// ________________________________________________BFS ends here________________________________________________________________

// ________________________________________________A* starts here_______________________________________________________________

var rows = 32
var colms = 76
var grid = new Array(rows)
for (var i = 0; i < colms; i++) grid[i] = new Array(colms)

class spot {
    constructor(i, j) {
        this.i = i
        this.j = j
        this.f = 0
        this.g = 0
        this.h = 0
        this.previous = undefined
    }
}

fills = []

for (var i = 0; i < rows; i++) {
    for (var j = 0; j < colms; j++) {
        grid[i][j] = new spot(i, j)
    }
}

function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function isValid_a(i, j) {
    if (i >= 0 && i < 32 && j >= 0 && j < 76) {
        if (!document.querySelector(".node" + i + "j" + j).classList.contains("wall")) {
            return true
        } else return false
    } else return false
}

function heuristic(a, b) {
    var d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j)
    return d
}

function fillPath_A() {
    if (a < fills.length && fills[a][1] == 1) {
        document.querySelector(fills[a][0]).classList.add("visited")
        a++
        return
    }

    if (a < fills.length && fills[a][1] == 0) {
        document.querySelector(fills[a][0]).classList.add("visited")
        a++
        return
    }

    if (b >= path.length) {
        clearInterval()
        return
    }
    
    document.querySelector(".node" + path[b].i + "j" + path[b].j).classList.add("path")
    b++
}



function aStar(i, j, fi, fj) {
    var openSet = []
    var closeSet = []
    var shortestPath = []

    var start = grid[i][j]
    var end = grid[fi][fj]

    openSet.push(start)
    x = []
    x.push(".node" + start.i + "j" + start.j)
    x.push(0)
    fills.push(x)
    while (openSet.length > 0) {
        var winner = 0
        for (var i = 0; i < openSet.length; i++)
        {
            if (openSet[i].f < openSet[winner].f) winner = i
        }
        current = openSet[winner]
        if (current.i == end.i && current.j == end.j) {
            shortestPath = []
            var temp = current
            path.push(temp)
            while (temp.previous) {
                path.push(temp.previous)
                temp = temp.previous
            }
            break;
        }

        // console.log(openSet.length)
        removeFromArray(openSet, current)
        // console.log(openSet.length)

        closeSet.push(current)
        
        x = []
        x.push(".node" + current.i + "j" + current.j)
        x.push(1)
        fills.push(x)

        var neighbors = []
        var i = current.i
        var j = current.j
        if (isValid_a(i + 1, j)) neighbors.push(grid[i + 1][j])
        if (isValid_a(i - 1, j)) neighbors.push(grid[i - 1][j])
        if (isValid_a(i, j + 1)) neighbors.push(grid[i][j + 1])
        if (isValid_a(i, j - 1)) neighbors.push(grid[i][j - 1])

        // console.log(neighbors.length)
        for (var i = 0; i < neighbors.length; i++) {
            // console.log("this runs")
            var neighbor = neighbors[i]
            if (closeSet.includes(neighbor)) 
            {
                continue
            }

            var tempG = current.g + 1
            if (openSet.includes(neighbor)) {
                if (tempG < neighbor.g) {
                    neighbor.g = tempG
                }
            } else {
                neighbor.g = tempG
                openSet.push(neighbor)
                x = []
                x.push(".node" + neighbor.i + "j" + neighbor.j)
                x.push(0)
                fills.push(x)
            }

            neighbor.h = heuristic(neighbor, end)
            neighbor.f = neighbor.g + neighbor.h
            neighbor.previous = current
        }
        // console.log(openSet.length)
    }
    console.log(path)
}
// ________________________________________________A* ends here_________________________________________________________________