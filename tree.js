/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /**
   * touchAll(fx) touches all nodes in a tree via depth first (traversing a 
   *  node all the way down). fx is a function that should get performed.
   */
  touchAll(fxCounter, addlParams = 0) {

    let ctr = 0

    if (this.root) {

      const toVisitStack = [this.root];

      while (toVisitStack.length > 0) {

        let current = toVisitStack.pop();

        ctr = fxCounter(ctr, current.val, addlParams)

        for (let child of current.children)
          toVisitStack.push(child)

      }

    }

    return ctr;

  }


  /** sumValues(): add up all of the values in the tree. */

  sumValues() {

    function sumValues(accum = 0, val) {

      return accum + val;

    }

    return this.touchAll(sumValues);

  }


  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {

    const fxCountEvens = (accum = 0, val = 0) => {

      if ((val % 2) === 0) {
        accum = accum + 1;
      }

      return accum;

    }
    return this.touchAll(fxCountEvens);

  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {

    const countGreaterThan = (accum = 0, val = 0, lowerBound = 0) => {

      if (val > lowerBound) {
        accum = accum + 1;
      }

      return accum;

    }
    return this.touchAll(countGreaterThan, lowerBound);


  }
}

module.exports = { Tree, TreeNode };
