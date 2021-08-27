/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    // Thinking breadth / queue to process a level. We know a 'level' has
    //  2 times the nodes as the previous level. level 1 has 1 node; level 2 has
    //  2 nodes; level 3 has 4 nodes. We found the minimum depth when we no 
    //  longer see 2x the nodes for the next level.  

    // used to flip between left and right
    const nodeChildren = ["left", "right"];

    let level = 0;

    if (this.root) {

      let nbrNodes = 0;
      let nbrNodesNext = 0;
      level++;

      let toVisitQueue = [this.root, "##"];

      while (toVisitQueue.length > 0) {

        let current = toVisitQueue.shift();

        if (current === "##") {
          // finished handling the other level.
          if (nbrNodes > 0) {

            // We finished a level. Binary tree says every parent node
            //  will have at most 2 children nodes. 
            // If nbrNodes * 2 != nbrNodesNext then we have a node in the 
            //  level we just finished that does not have 2 children
            if ((nbrNodes * 2) === nbrNodesNext) {
              // We have the expected number of nodes.
              level++;
              nbrNodes = nbrNodesNext;
              nbrNodesNext = 0;
              // current is ##, the node level break
              toVisitQueue.push(current);
            } else {
              return level;
            }

          } else {
            return level;
          }

        } else {
          nbrNodes++;
          nodeChildren.forEach(child => {
            if (current[child]) {
              toVisitQueue.push(current[child]);
              nbrNodesNext++;
            }
          });
        }

      }

    }

    return level;

  }


  /**
   * Methods touches every node in a binary tree via a depth first. 
   *  fxEvaluator is the function to perform at each node in the tree.
   *  
   */
  touchAll(fxEvaluator, addlValue = 0) {

    // set up storage
    // evalData = {accum, val, maxCurr}
    let maxAll = 0;

    // const evalData = fxEvaluator({});

    if (this.root) {
      const nodeChildren = ["left", "right"]
      // The current depth for the node must be retained when it the 
      //  node is pushed onto the stack.
      const toVisitStack = [{ current: this.root, hold: fxEvaluator({}) }];

      while (toVisitStack.length) {
        let { current, hold } = toVisitStack.pop();

        hold.val = current.val;
        // maxCurr in hold could have changed if the totalling of other
        //  branches completed. Use maxAll when maxAll is greater than
        //  hold.
        hold.maxCurr = hold.maxCurr < maxAll ? maxAll : hold.maxCurr;
        hold = fxEvaluator(hold)

        if ((current.left) || (current.right)) {
          nodeChildren.forEach(child => {
            if (current[child]) toVisitStack.push({
              current: current[child],
              hold: hold
            });
          });
        } else {
          // Both left and right nodes are null. current is a leaf.
          // Look at the max for the branch in the hold vs the max
          //  encountered (maxAll) and keep the larger one.
          //  
          if (hold.maxCurr > maxAll) maxAll = hold.maxCurr;

        }

      }

    }

    return maxAll;

  }


  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {

    let depthMax = 0;
    let depthCurr = 0;
    if (this.root) {
      const nodeChildren = ["left", "right"]
      // The current depth for the node must be retained when it the 
      //  node is pushed onto the stack.
      const toVisitStack = [{ current: this.root, depthNode: depthCurr }];

      while (toVisitStack.length) {
        let { current, depthNode } = toVisitStack.pop();
        depthCurr = depthNode + 1;
        if ((current.left) || (current.right)) {
          nodeChildren.forEach(child => {
            if (current[child]) toVisitStack.push({
              current: current[child],
              depthNode: depthCurr
            });
          });
        } else {
          // both left and right nodes are null. current is a leaf.
          if (depthCurr > depthMax) depthMax = depthCurr;
          depthCurr = 0;
        }

      }

    }

    return depthMax;

  }


  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {

    const maxSumEvaluator = ({ accum = 0, val = 0, maxCurr = 0 }) => {

      if (accum + val > maxCurr) {
        return {
          accum: accum + val,
          val,
          maxCurr: accum + val
        }
      } else {
        return {
          accum: accum + val,
          val,
          maxCurr,
        }
      }

    }

    return this.touchAll(maxSumEvaluator)

  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {

    // const nextGreatest = ({ val = 0, minGtAddlValue = 0, maxCurr = 0 }, addlValue) => {
      
    //   // minGtAddlValue is the minimum value that is greater than addlValue.
    //   // addlValue is the lowerBound
    //   // maxCurr is not used but is referenced in touchAll.

    //   if (val > addlValue) {
    //     if (minGtAddlValue === 0) {
    //       minGtAddlValue = val;
    //     }
        
    //     if (val < minGtAddlValue) minGtAddlValue = val;

    //   }
      
    //   return {
    //     val,
    //     minGtAddlValue,
    //   }

    // }

    // return this.touchAll(nextGreatest, lowerBound)




    // let minGtLowerBound = null;

    // if (this.root) {
    //   const nodeChildren = ["left", "right"]
    //   // The current depth for the node must be retained when it the 
    //   //  node is pushed onto the stack.
    //   const toVisitStack = [{ current: this.root, hold: minGtLowerBound }];

    //   while (toVisitStack.length) {
    //     let { current, hold } = toVisitStack.pop();

    //     // handle the smallest number that is greater than the lowerBound
    //     if (current.val > lowerBound) {
    //       // Check whether minGtLowerBound, the minimum that is greater 
    //       //  than lowerBound, is set. Set it to the current.val when 
    //       //  minGtLowerBound is null. We need a value in minGtLowerBound
    //       //  in order to find the lowest. 
    //       if (minGtLowerBound === null) {
    //         minGtLowerBound = current.val;
    //       }
          
    //       if (current.val < minGtLowerBound) minGtLowerBound = current.val;

    //     }

    //     // push the left and right nodes onto the stack when they are not
    //     //  null. 
    //     nodeChildren.forEach(child => {
    //       if (current[child]) toVisitStack.push({
    //         current: current[child],
    //         hold: minGtLowerBound
    //       });
    //     });

    //   }

    // }

    // return minGtLowerBound;


    let minGtLowerBound = null;

    if (this.root) {
      const nodeChildren = ["left", "right"]
      // The current depth for the node must be retained when it the 
      //  node is pushed onto the stack.
      const toVisitStack = [this.root];

      while (toVisitStack.length) {
        let current = toVisitStack.pop();

        // handle the smallest number that is greater than the lowerBound
        if (current.val > lowerBound) {
          // Check whether minGtLowerBound, the minimum that is greater 
          //  than lowerBound, is set. Set it to the current.val when 
          //  minGtLowerBound is null. We need a value in minGtLowerBound
          //  in order to find the lowest. 
          if (minGtLowerBound === null) {
            minGtLowerBound = current.val;
          }
          
          if (current.val < minGtLowerBound) minGtLowerBound = current.val;

        }

        // push the left and right nodes onto the stack when they are not
        //  null. 
        nodeChildren.forEach(child => {
          if (current[child]) toVisitStack.push(current[child]);
        });

      }

    }

    return minGtLowerBound;



  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

let smallTree;
let largeTree;
let emptyTree;

emptyTree = new BinaryTree();

// build small tree;
let smallLeft = new BinaryTreeNode(5);
let smallRight = new BinaryTreeNode(5);
let smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
smallTree = new BinaryTree(smallRoot);

// build large tree
let node6 = new BinaryTreeNode(1);
let node5 = new BinaryTreeNode(1);
let node4 = new BinaryTreeNode(2);
let node3 = new BinaryTreeNode(3, node4, node6);
let node2 = new BinaryTreeNode(5, node3, node5);
let node1 = new BinaryTreeNode(5);
let root = new BinaryTreeNode(6, node1, node2);
largeTree = new BinaryTree(root);



module.exports = { BinaryTree, BinaryTreeNode };
