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
    prettyPrint(node.rightSide, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftSide !== null) {
    prettyPrint(node.leftSide, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

//console.log(removeDuplicateValues(mergeSort(array)));
newTree = tree(array);
insert(newTree, 11);
insert(newTree, 12);
insert(newTree, 15);
insert(newTree, 30);
insert(newTree, 2);
insert(newTree, 8);

prettyPrint(newTree);

//tree.insert(10);
