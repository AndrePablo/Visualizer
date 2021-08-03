export function A_Star(grid, startNode, finishNode) {
    
    var unvisitedNodes = [];
    var visitedNodesInOrder = []; 
    startNode.distance = 0;
    unvisitedNodes.push(startNode);
  
    while (unvisitedNodes.length !== 0) {
      unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
      
      var closestNode = unvisitedNodes.shift();
      
      if (closestNode === finishNode) 
        return visitedNodesInOrder;
  

      if (!closestNode.isWall){ 
        visitedNodesInOrder.push(closestNode);
        closestNode.isVisited = true;
      }
  
      var neighbours = getNeighbours(closestNode, grid);
      for (let neighbour of neighbours) {
        let distance = closestNode.distance + 1;
        
        //f(n) = g(n) + h(n)
        if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)) {
          unvisitedNodes.unshift(neighbour);
          neighbour.distance = distance;
          neighbour.totalDistance = distance + calculateManhattenDistance(neighbour, finishNode);
          neighbour.previousNode = closestNode;
        } 
        
        else if (distance < neighbour.distance) {
          neighbour.distance = distance;
          neighbour.totalDistance = distance + calculateManhattenDistance(neighbour, finishNode);
          neighbour.previousNode = closestNode;
        }
      }
    }
    return visitedNodesInOrder;
  }
  
  function getNeighbours(node, grid) {
    let neighbours = [];
    let { row, col } = node;
    if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col !== 0) neighbours.push(grid[row][col - 1]);
    if (row !== 0) neighbours.push(grid[row - 1][col]);
    return neighbours.filter((neighbour) => !neighbour.isWall && !neighbour.isVisited);
  }
  
  function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
    for (let node of unvisitedNodes) {
      if (node.row === neighbour.row && node.col === neighbour.col) {
        return false;
      }
    }
    return true;
  }
  
  function calculateManhattenDistance(node, finishNode) {
    let x = Math.abs(node.row - finishNode.row);
    let y = Math.abs(node.col - finishNode.col);
    return x + y;
  }
