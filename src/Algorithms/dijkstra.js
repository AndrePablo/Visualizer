export function dijkstra(grid, startNode, finishNode) {
  var visitedNodes = [];
  startNode.distance = 0;
  var unvisitedNodes = getGraphNodes(grid);

  while (unvisitedNodes.length) {
    getNearestNode(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (!closestNode.isWall) {
      if (closestNode.distance === Infinity) return visitedNodes;
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode === finishNode) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
}

function getNearestNode(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getGraphNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
