export function BFS(grid, startNode, finishNode) {
  var visited = [];
  var notVisited = [];

  startNode.distance = 0;

  notVisited.push(startNode);

  while (notVisited != null) {
    var currentNode = notVisited.shift();

    if (currentNode === finishNode) {
      return visited;
    } else if (currentNode.isWall) {
      continue;
    } else if (!currentNode.isWall) {
      visited.push(currentNode);
      currentNode.isVisited = true;
    }

    var nodeAdjacent = notVisitedAdjacent(currentNode, grid);

    for (let node of nodeAdjacent) {
      node.previousNode = currentNode;

      if (notVisitedNodes(node, notVisited)) {
        notVisited.push(node);
      }
    }
  }
  return visited;
}

function notVisitedAdjacent(node, grid) {
  var adjacentNodes = [];
  const { col, row } = node;
  if (row > 0) adjacentNodes.push(grid[row - 1][col]);
  if (row < grid.length - 1) adjacentNodes.push(grid[row + 1][col]);
  if (col > 0) adjacentNodes.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) adjacentNodes.push(grid[row][col + 1]);
  return adjacentNodes.filter((neighbor) => !neighbor.isVisited);
}

function notVisitedNodes(neighbour, notVisited) {
  for (let node of notVisited) {
    if (node.row === neighbour.row && node.col === neighbour.col) {
      return false;
    }
  }
  return true;
}
