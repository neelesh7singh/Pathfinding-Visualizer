// ...........................................Just the code for DFS......................................................


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
        //adding event listner to ever node ...............
        // ......TODO......
        // create a function for calling the algos.

        document.querySelector(".node" + i + "j" + j).addEventListener("mousemove", () => addWall(i,j))

        // ...... hard coding the start and end point...............................to be deleted later on
        if (i == 7 && j == 10) {
            document.querySelector(".node" + i + "j" + j).classList.add("start")
        }

        if (i == 27 && j == 70) {
            document.querySelector(".node" + i + "j" + j).classList.add("end")
        }
        //.........................................................................................till here
    }
}

// universal variable for path
pathFound = false
var visited = []
var path = []
a = 0
b = 0
isDown = false
document.addEventListener("mousedown",function (){isDown = true})
document.addEventListener("mouseup",function (){isDown = false})


// algo for DFS.........................................................................................................
//.........TODO........
// insted of adding class inside the function create a list and add them outside the class so that you can use await ans async
function dfs(i, j, fi, fj) {
    if (isValid(i, j)) {
        if (!pathFound) {
            if (i == fi && j == fj) {
                pathFound = true
                return
            }
            // document.querySelector(".node" + i + "" + j).classList.add("visited")
            if(!document.querySelector(".node" + i + "j" + j).classList.contains("start")) visited.push(".node" + i + "j" + j)
            dfs(i - 1, j, fi, fj) //up
            if (pathFound) {
                // document.querySelector(".node" + i + "" + j).classList.add("path")
                if(!document.querySelector(".node" + i + "j" + j).classList.contains("start")) path.push(".node" + i + "j" + j)
                return
            }

            dfs(i, j + 1, fi, fj) //right
            if (pathFound) {
                // document.querySelector(".node" + i + "" + j).classList.add("path")
                if(!document.querySelector(".node" + i + "j" + j).classList.contains("start")) path.push(".node" + i + "j" + j)
                return
            }

            dfs(i + 1, j, fi, fj) //down
            if (pathFound) {
                // document.querySelector(".node" + i + "" + j).classList.add("path")
                if(!document.querySelector(".node" + i + "j" + j).classList.contains("start")) path.push(".node" + i + "j" + j)
                return
            }

            dfs(i, j - 1, fi, fj) //left  
            if (pathFound) {
                // document.querySelector(".node" + i + "" + j).classList.add("path")
                if(!document.querySelector(".node" + i + "j" + j).classList.contains("start")) path.push(".node" + i + "j" + j)
                return
            }
        } else return
    } else return
}
//............................................................................................................................

// function to check wether i,j are inside the grid and are not visited before..............................
function isValid(i, j) {
    if (i >= 0 && i < 32 && j >= 0 && j < 76) {
        if (visited.indexOf(".node" + i + "j" + j) == -1 && !document.querySelector(".node" + i + "j" + j).classList.contains("wall")) {
            return true
        } else return false
    } else return false
}
// ...........................................................................................................

// dfs(7,10,27,70)  first two arguments are the starting indices and the next two are the final indices

// function to call be called after the button is pressed ..................
function callAll(s) {
    if(s == "dfs")
    {
        dfs(7, 10, 27, 70)
        setInterval(fillPath, 10);
    }
    if(s == "bfs")
    {
        bfs(7,10,27,70)
        setInterval(fillPath, 10);
    }
    
}
// .........................................................................

// dfs(7, 10, 27, 70)

// ..................function to fill path with animation insted of filling in one instance
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
// ..........................................................................................

// ...............................................function to add wall
function addWall(i,j){
    if(isDown)
    {
        document.querySelector(".node" + i + "j" + j).classList.add("wall")
    }
    
}
// ...................................................................


// ........................................BFS starts here on....................................................................

// .............................................. Queue class..............................
class Queue 
{
    constructor()
    {
        this.items = [] 
    }

    // enqueue function 
    enqueue(element) 
    {     
        // adding element to the queue 
        this.items.push(element); 
    } 

    dequeue() 
    { 
        // removing element from the queue 
        // returns underflow when called  
        // on empty queue 
        var toReturn = this.items[0]
        this.items.shift()
        return toReturn
    }

    // how to use this class
    // var queue = new Queue(); 
    // queue.enqueue(10); 
    // queue.dequeue();
}
// ..........................................................................................

function bfs(i,j,fi,fj)
{
    var queue = new Queue()
    var moves = ["U","R","D","L"]
    queue.enqueue("")
    p = ""
    while(!foundEnd(i,j,fi,fj,p))
    {
        p = queue.dequeue()
        // console.log(p)
        for(var a=0; a < moves.length; a++)
        {
            check = p + moves[a]
            // console.log(check)
            if(isValid_bfs(i,j,check))
            {
                queue.enqueue(check)
            }
        }
    }
    if(foundEnd) fillPathArr(i,j,p)
}

function fillPathArr(i,j,p)
{
    path.push(".node" + i + "j" + j)
    for(var a = 0; a < p.length; a++)
    {
        if(p[a] == "U") i = i-1
        if(p[a] == "D") i = i+1
        if(p[a] == "R") j = j+1
        if(p[a] == "L") j = j-1
        path.push(".node" + i + "j" + j)
    }
}

function foundEnd(i,j,fi,fj,p)
{
    for(var a = 0; a < p.length; a++)
    {
        // console.log(p.length)
        // console.log(p[a])
        if(p[a] == "U") i = i-1
        if(p[a] == "D") i = i+1
        if(p[a] == "R") j = j+1
        if(p[a] == "L") j = j-1
    }
    if(i==fi && j==fj) 
    {
        return true
    }
    else return false
}

function isValid_bfs(i,j,check)
{
    for(var a = 0; a < check.length; a++)
    {
        if(check[a] == "U") i = i-1 
        if(check[a] == "D") i = i+1
        if(check[a] == "R") j = j+1
        if(check[a] == "L") j = j-1
    }
    if (i >= 0 && i < 32 && j >= 0 && j < 76)
    {
        if (visited.indexOf(".node" + i + "j" + j) == -1 && !document.querySelector(".node" + i + "j" + j).classList.contains("wall")) 
        {
            visited.push(".node" + i + "j" + j)
            return true
        }
        // return true
    }
    else return false
}