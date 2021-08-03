export function DFS(grid, startNode, finishNode) {
  var visited = [];
  var notVisited = [];

  notVisited.push(startNode);

  while (notVisited != null) {
    let currentNode = notVisited.shift();

    if (currentNode === finishNode) return visited;

    if (currentNode.isWall) {
      continue;
    } else if (!currentNode.isWall) {
      currentNode.isVisited = true;
      visited.push(currentNode);
    }

    var checkAdjacent = notVisitedAdjacent(currentNode, grid);

    for (let adjacentNode of checkAdjacent) {
      adjacentNode.previousNode = currentNode;
      notVisited.unshift(adjacentNode);
    }
  }
  return visited;
}

function notVisitedAdjacent(node, grid) {
  var adjacentNodes = [];

  const { row, col } = node;

  if (col !== 0) {
    adjacentNodes.push(grid[row][col - 1]);
  }
  if (row !== 0) {
    adjacentNodes.push(grid[row - 1][col]);
  }
  if (col !== grid[0].length - 1) {
    adjacentNodes.push(grid[row][col + 1]);
  }
  if (row !== grid.length - 1) {
    adjacentNodes.push(grid[row + 1][col]);
  }

  return adjacentNodes.filter((neighbor) => !neighbor.isVisited);
}
