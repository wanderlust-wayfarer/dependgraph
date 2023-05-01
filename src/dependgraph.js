const fs = require('fs');

class DependGraph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(value) {
    this.nodes.set(value, []);
  }

  addEdge(node1, node2) {
    this.nodes.get(node1).push(node2);
    this.nodes.get(node2).push(node1);
  }

  breadthFirstTraversal(startNode) {
    const visited = new Set();
    const queue = [startNode];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (!visited.has(currentNode)) {
        visited.add(currentNode);
        console.log(currentNode);

        for (const neighbor of this.nodes.get(currentNode)) {
          queue.push(neighbor);
        }
      }
    }
  }
};
