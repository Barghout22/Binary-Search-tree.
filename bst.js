const nodeFactory = (value) => {
  return {
    value: null || value,
    leftSide: null,
    rightSide: null,
  };
};

const tree = (arr) => {
  const buildTree = (arr, start, end) => {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let node = nodeFactory(arr[mid]);
    node.leftSide = buildTree(arr, start, mid - 1);
    node.rightSide = buildTree(arr, mid + 1, end);
    return node;
  };
  const sortedArray = removeDuplicateValues(mergeSort(arr));
  let root = buildTree(sortedArray, 0, sortedArray.length - 1);
  return root;
};

const insert = (root, input) => {
  const newNode = nodeFactory(input);
  let temp = root;
  while (temp.rightSide !== null || temp.leftSide !== null) {
    if (temp.value === input) return;
    if (input > temp.value) {
      if (temp.rightSide !== null) {
        temp = temp.rightSide;
      } else {
        temp.rightSide = newNode;
        return;
      }
    } else {
      if (temp.leftSide !== null) {
        temp = temp.leftSide;
      } else {
        temp.leftSide = newNode;
        return;
      }
    }
  }
  if (input > temp.value) {
    temp.rightSide = newNode;
  } else {
    temp.leftSide = newNode;
  }
};

const Delete = (input, root) => {
  if (root === null) return null;

  if (input > root.value) {
    root.rightSide = Delete(input, root.rightSide);
  } else if (input < root.value) {
    root.leftSide = Delete(input, root.leftSide);
  } else {
    if (root.rightSide === null && root.leftSide === null) {
      return null;
    } else if (root.rightSide !== null && root.leftSide === null) {
      return root.rightSide;
    } else if (root.rightSide === null && root.leftSide !== null) {
      return root.leftSide;
    } else {
      let temp = root.rightSide;
      while (temp.leftSide !== null) {
        temp = temp.leftSide;
      }
      root.value = temp.value;
      root.rightSide = Delete(root.value, root.rightSide);
    }
  }
  return root;
};

const find = (input, root) => {
  if (root.value === input) return root;
  let temp = root;
  if (temp.value > input) {
    temp = temp.leftSide;
    if (temp === null) return "value not found";
    return find(input, temp);
  } else {
    temp = temp.rightSide;
    if (temp === null) return "value not found";
    return find(input, temp);
  }
};

const levelOrderTraversal = (fncn, root) => {
  if (root == null) return root;
  let queueArray = [root];
  let resultArray = [];
  let temp;
  while (queueArray[0]) {
    temp = queueArray.shift();
    if (fncn !== null) fncn(temp);
    if (temp.leftSide !== null) queueArray.push(temp.leftSide);
    if (temp.rightSide !== null) queueArray.push(temp.rightSide);
    resultArray.push(temp.value);
  }
  if (fncn === null) return resultArray;
};

const inOrderTraversal = (func, root) => {
  if (root === null) return null;
  let returnArr = [];
  if (root.leftSide !== null) {
    let left = inOrderTraversal(func, root.leftSide);
    returnArr = [...left];
  }
  returnArr.push(root.value);
  if (func) {
    func(root);
  }
  if (root.rightSide !== null) {
    let right = inOrderTraversal(func, root.rightSide);
    returnArr = [...returnArr, ...right];
  }

  if (!func) return returnArr;
  return;
};

const preOrderTraversal = (func, root) => {
  if (root === null) return null;
  let returnArr = [];
  returnArr.push(root.value);
  if (func) {
    func(root);
  }
  if (root.leftSide !== null) {
    let left = preOrderTraversal(func, root.leftSide);
    returnArr = [...returnArr, ...left];
  }
  if (root.rightSide !== null) {
    let right = preOrderTraversal(func, root.rightSide);
    returnArr = [...returnArr, ...right];
  }

  if (!func) return returnArr;
  return;
};

const postOrderTraversal = (func, root) => {
  if (root === null) return null;
  let returnArr = [];
  if (root.leftSide !== null) {
    let left = postOrderTraversal(func, root.leftSide);
    returnArr = [...left];
  }
  if (root.rightSide !== null) {
    let right = postOrderTraversal(func, root.rightSide);
    returnArr = [...returnArr, ...right];
  }
  returnArr.push(root.value);

  if (func) {
    func(root);
    return;
  }
  return returnArr;
};

const height = (root) => {
  if (root === null) return -1;

  const left = height(root.leftSide);
  const right = height(root.rightSide);

  return Math.max(left, right) + 1;
};

const depth = (input, root, edgeCounter = 0) => {
  if (root === null) return;
  if (input === root.value) return edgeCounter;

  if (input > root.value) {
    return depth(input, root.rightSide, ++edgeCounter);
  } else {
    return depth(input, root.leftSide, ++edgeCounter);
  }
};

const isBalancedprocess = (root) => {
  if (root === null) return 0;

  const left = isBalancedprocess(root.leftSide);
  const right = isBalancedprocess(root.rightSide);
  difference = Math.abs(left - right);

  if (left === false || right === false || difference > 1) {
    return false;
  }
  return Math.max(left, right) + 1;
};

const rebalance = (root) => {
  const Arr = inOrderTraversal(null, root);
  return tree(Arr);
};

const isBalanced = (root) => {
  return Boolean(isBalancedprocess(root));
};

function removeDuplicateValues(arr) {
  let uniqueArray = [];

  for (i = 0; i < arr.length; i++) {
    if (uniqueArray.indexOf(arr[i]) === -1) {
      uniqueArray.push(arr[i]);
    }
  }
  return uniqueArray;
}

function mergeSort(arr) {
  if (arr.length < 1) return "error :invalid entry";
  if (arr.length == 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const leftHalfarr = mergeSort(arr.slice(0, mid));
  const rightHalfarr = mergeSort(arr.slice(mid, arr.length));

  let fillInarray = [];
  let rightCounter = 0;
  let leftCounter = 0;

  while (
    leftCounter < leftHalfarr.length &&
    rightCounter < rightHalfarr.length
  ) {
    if (leftHalfarr[leftCounter] < rightHalfarr[rightCounter])
      fillInarray.push(leftHalfarr[leftCounter++]);
    else fillInarray.push(rightHalfarr[rightCounter++]);
  }

  if (leftCounter < leftHalfarr.length) {
    while (leftCounter < leftHalfarr.length)
      fillInarray.push(leftHalfarr[leftCounter++]);
  } else if (rightCounter < rightHalfarr.length) {
    while (rightCounter < rightHalfarr.length)
      fillInarray.push(rightHalfarr[rightCounter++]);
  }

  return fillInarray;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.rightSide !== null) {
    prettyPrint(node.rightSide, `${prefix}${isLeft ? "???   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "????????? " : "????????? "}${node.value}`);
  if (node.leftSide !== null) {
    prettyPrint(node.leftSide, `${prefix}${isLeft ? "    " : "???   "}`, true);
  }
};

// console.log(find(67, newTree));
// console.log(isBalanced(newTree));
//prettyPrint(rebalance(newTree));
// console.log(isBalanced(rebalance(newTree)));

//console.log(depth(23, newTree));

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let newTree = tree(array);
console.log(`is this tree balanced:${isBalanced(newTree)}`);
console.log(`levelOrderTraversal:${levelOrderTraversal(null, newTree)}`);
console.log(`in order :${inOrderTraversal(null, newTree)}`);
console.log(`pre order :${preOrderTraversal(null, newTree)}`);
console.log(`post order:${postOrderTraversal(null, newTree)}`);

insert(newTree, 11);
insert(newTree, 12);
insert(newTree, 15);
insert(newTree, 30);
insert(newTree, 2);

console.log(
  `with the new elements ,is this tree balanced:${isBalanced(newTree)}`
);
newTree = rebalance(newTree);
console.log(`is this tree rebalanced:${isBalanced(newTree)}`);
console.log(`levelOrderTraversal:${levelOrderTraversal(null, newTree)}`);
console.log(`in order :${inOrderTraversal(null, newTree)}`);
console.log(`pre order :${preOrderTraversal(null, newTree)}`);
console.log(`post order:${postOrderTraversal(null, newTree)}`);
