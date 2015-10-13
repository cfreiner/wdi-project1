//Functions for checking valid moves
var checkAdd = function(a, b, c) {
  return a + b === c;
};

var checkSubtract = function(a, b, c) {
  return a - b === c || b - a === c;
};

var checkMultiply = function(a, b, c) {
  return a * b === c;
};

var checkDivide = function(a, b, c) {
  return a / b === c || b / a === c;
};

var checkAll = function(a, b, c) {
  return checkAdd(a, b, c) || checkSubtract(a, b, c) || checkMultiply(a, b, c) || checkDivide(a, b, c);
}

//Find an array in an array using Lodash deep equals
var findArrayInArray = function(arr1, arr2) {
  for(var i = 0; i < arr1.length; i++) {
    if(_.isEqual(arr1[i], arr2)) {
      return true;
    }
  }
  return false;
}

//Returns an array of indexes of numbers in the input array
//For use with the 14x14 game board array
var locateNumbersInArray = function(arr) {
  var numIndexArray = [];
  for(var i = 0; i < 14; i++) {
    for(var j = 0; j < 14; j++) {
      if(arr[i][j] !== '3x' && arr[i][j] !== '2x' && parseInt(arr[i][j])) {
        numIndexArray.push([i,j]);
      }
    }
  }
  return numIndexArray;
}

//Check if a square is open to place a tile
var checkOpenSquare = function(value) {
  if(value === null ||
    value === '2x' ||
    value === '3x' ||
    value === '+' ||
    value === '-' ||
    value === '&divide' ||
    value === 'x') {
    return true;
  } else {
    return false;
  }
}

//Find empty squares with adjacent numbered squares
var getAdjacentEmptySquares = function(arr) {
  var numbers = locateNumbersInArray(arr);
  var emptySquares = [];
  numbers.forEach(function(item) {
    var x = item[0];
    var y = item[1];
    if(checkOpenSquare(arr[x+1][y]) && !findArrayInArray(emptySquares, [x+1, y])) {
      emptySquares.push([x+1, y]);
    }
    if(checkOpenSquare(arr[x-1][y]) && !findArrayInArray(emptySquares, [x-1, y])) {
      emptySquares.push([x-1, y]);
    }
    if(checkOpenSquare(arr[x][y+1]) && !findArrayInArray(emptySquares, [x, y+1])) {
      emptySquares.push([x, y+1]);
    }
    if(checkOpenSquare(arr[x][y-1]) && !findArrayInArray(emptySquares, [x, y-1])) {
      emptySquares.push([x, y-1]);
    }
  });
  return emptySquares;
}
