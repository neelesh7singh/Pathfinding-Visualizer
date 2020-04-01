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
        document.querySelector(".node" + i + "" + j).addEventListener("click", () => dfs(7, 10, 27, 70))

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
            document.querySelector(".node" + i + "" + j).classList.add("visited")

            dfs(i - 1, j, fi, fj) //up
            if (pathFound) {
                document.querySelector(".node" + i + "" + j).classList.add("path")
                return
            }

            dfs(i, j + 1, fi, fj) //right
            if (pathFound) {
                document.querySelector(".node" + i + "" + j).classList.add("path")
                return
            }

            dfs(i + 1, j, fi, fj) //down
            if (pathFound) {
                document.querySelector(".node" + i + "" + j).classList.add("path")
                return
            }

            dfs(i, j - 1, fi, fj) //left  
            if (pathFound) {
                document.querySelector(".node" + i + "" + j).classList.add("path")
                return
            }
        } else return
    } else return
}
//............................................................................................................................

// function to check wether i,j are inside the grid and are not visited before..............................
function isValid(i, j) {
    if (i >= 0 && i < 32 && j >= 0 && j < 76) {
        if (!document.querySelector(".node" + i + "" + j).classList.contains("visited")) {
            return true
        } else return false
    } else return false
}
// ...........................................................................................................

// dfs(7,10,27,70)  first two arguments are the starting indices and the next two are the final indices