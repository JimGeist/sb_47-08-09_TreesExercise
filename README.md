# sb_47-08-09_TreesExercise
 
## Technology Stack
- **Front-end**: n/a
- **Back-end**: NodeJS script

## Assignment Details

Create and test 3 methods for an **[n-ary] Tree**:

`sumValues()` - return the sum of all integers in the tree,

`countEvens()` - return the number of even integers in the tree, and

`numGreater(x)` - return the number of nodes that have a value greater than *x*.

Create and test 4 methods for a **Binary Tree**:

`minDepth()` - return the minimum depth for the binary tree where the minimum depth is the path from root to leaf with the fewest nodes,

`maxDepth()` - return the maximum depth for the binary tree where the maximum depth is the path from root to leaf with the greatest number of nodes,

`maxSum(str)` - "Given a binary tree, find the maximum path sum. The path may start and end at any node in the tree, but no node can be visited more than once", and  

`nextLarger(x)` - returns the value from a node which is the smallest value that is larger than *x*. `null` is returned when a node with a value larger than x was not found.


## Additional Details

**Enhancements**
- The **n-ary tree** in the first part of the exercise used a generic method, `touchAll(fxCounter, addlParams)` to traverse tree depth-wise. A function is passed to perform the specific task -- sum values, count the number of nodes with an even value, and the number of nodes greater than x. 


**Difficulties**
- Correctly setting up `touchAll()` method in the `Tree` class. The video examples had the breadth and depth search methods in the `TreeNode`.
- No idea how `maxSum()` for the binary tree should work. The `maxSum` I created returns the largest path sum encountered when the binary tree is traversed from **root** to **leaf**. A diagram of the binary tree and the path used would have helped. 
- Tried a similar approach of a creating generic method to touch each node of the binary tree and pass to the generic method the function that performs deterimination of `maxDepth`, `maxSum`, and `nextLarger`. It was aborted because some logic that had to get added to the generic method made it a bit cumbersome. 

