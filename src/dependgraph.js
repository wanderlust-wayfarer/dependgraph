const fs = require("fs-extra");
const path = require("path");

class DependGraph {
  constructor(root) {
    this.nodes = new Map();
    this.breadthFirstTraversal(root);
  }

  // nodes represent files
  addNode(path) {
    this.nodes.set(path, {
      imports: [],
      exports: [],
    });
  }

  // edges represent dependencies
  addEdge(parent, child) {
    this.nodes.get(child).imports.push(parent);
    this.nodes.get(parent).exports.push(child);
  }

  analyzeAndAddDependencies(node) {
    this.addNode(node);
    fs.readFile(node, "utf8")
      .then((fileContent) => {
        // read all imports and requires
        // for each, add edges
      })
      .catch((err) =>
        console.error(
          `DependGraph.analyzeAndAddDependencies: Unable to read file contents.\n  ${err}`
        )
      );
  }

  breadthFirstTraversal(startNode) {
    const queue = [startNode];
    const visited = new Set();

    while (queue.length > 0) {
      const currentNode = queue.shift();
      const contents = fs.readdirSync(currentNode);

      if (fs.statSync(currentNode).isDirectory()) {
        for (const file of contents) {
          const filepath = path.join(currentNode, file);
          queue.push(filepath);
        }
      } else {
        this.analyzeAndAddDependencies(currentNode);
      }

      visited.add(currentNode);
    }
  }
}
