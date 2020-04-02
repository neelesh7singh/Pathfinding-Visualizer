// ...........................................Just the code for DFS......................................................


// center is the div containing all the nodes which are given unique class 
// -> "node01,node02,...nodeij",here i,j are row and index
var container = document.querySelector(".center")
for (let i = 0; i < 32; i++) // 32 = vh/20
{
    for (let j = 0; j < 76; j++) //76 = vw/20
    {
        container.innerHTML += "<div class='unit node" + i + "" + j + "' ></div>" //giving the unique class to each node
    }
}
for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 76; j++) {
        //adding event listner to ever node ...............
        // ......TODO......
        // create a function for calling the algos.

        document.querySelector(".node" + i + "" + j).addEventListener("click", () => callAll())

        // ...... hard coding the start and end point...............................to be deleted later on
        if (i == 7 && j == 10) {
            document.querySelector(".node" + i + "" + j).classList.add("start")
        }

        if (i == 27 && j == 70) {
            document.querySelector(".node" + i + "" + j).classList.add("end")
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
            visited.push(".node" + i + "" + j)
            dfs(i - 1, j, fi, fj) //up
            if (pathFound) {
                // document.querySelector(".node" + i + "" + j).classList.add("path")
                 path.push(".node" + i + "" + j)
                return
            }

            dfs(i, j + 1, fi, fj) //right
            if (pathFound) {
                // document.querySelector(".node" + i + "" + j).classList.add("path")
                path.push(".node" + i + "" + j)
                return
            }

            dfs(i + 1, j, fi, fj) //down
            if (pathFound) {
                // document.querySelector(".node" + i + "" + j).classList.add("path")
                path.push(".node" + i + "" + j)
                return
            }

            dfs(i, j - 1, fi, fj) //left  
            if (pathFound) {
                // document.querySelector(".node" + i + "" + j).classList.add("path")
                path.push(".node" + i + "" + j)
                return
            }
        } else return
    } else return
}
//............................................................................................................................

// function to check wether i,j are inside the grid and are not visited before..............................
function isValid(i, j) {
    if (i >= 0 && i < 32 && j >= 0 && j < 76) {
        if (visited.indexOf(".node" + i + "" + j) == -1 ) {
            return true
        } else return false
    } else return false
}
// ...........................................................................................................

// dfs(7,10,27,70)  first two arguments are the starting indices and the next two are the final indices

function callAll()
{
    dfs(7, 10, 27, 70)
    setInterval(fillPath, 10);
}

// dfs(7, 10, 27, 70)

function fillPath()
{

    if(a<visited.length)
    {
        document.querySelector(visited[a]).classList.add("visited")
        a++
        return   
    }
    

    if(b >= path.length)
    {
        clearInterval()
    }
    document.querySelector(path[b]).classList.add("path")
    b++
}