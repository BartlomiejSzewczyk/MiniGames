import * as appActions from "./appActions";

var foundSquares = 1;

export const makeWarning = (position, event) => (dispatch, getState) => {
  var squaresCopy = [...getState().minesweeperReducer.minesweeperSquares];
  var newValue = !squaresCopy[position.x][position.y].warning;
  event.preventDefault();
  if (getState().minesweeperReducer.bombsLeft) {
    squaresCopy[position.x][position.y].warning = newValue;
    dispatch(appActions.changeState("CHANGE_MINESWEEPER_SQUARES", squaresCopy));
    if (newValue) {
      dispatch(
        appActions.changeState(
          "CHANGE_BOMBS_LEFT",
          getState().minesweeperReducer.bombsLeft - 1
        )
      );
    } else {
      dispatch(
        appActions.changeState(
          "CHANGE_BOMBS_LEFT",
          getState().minesweeperReducer.bombsLeft + 1
        )
      );
    }
  } else {
    if (!newValue) {
      squaresCopy[position.x][position.y].warning = newValue;
      dispatch(
        appActions.changeState("CHANGE_MINESWEEPER_SQUARES", squaresCopy)
      );
      dispatch(
        appActions.changeState(
          "CHANGE_BOMBS_LEFT",
          getState().minesweeperReducer.bombsLeft + 1
        )
      );
    }
  }
  return false;
};

export const checkSquare = (position) => (dispatch, getState) => {
  if (
    getState().minesweeperReducer.minesweeperSquares[position.x][position.y]
      .hasBomb
  ) {
    dispatch(appActions.changeState("CHANGE_GAME_STATUS", "lose"));
  } else {
    var squaresCopy = [...getState().minesweeperReducer.minesweeperSquares];
    squaresCopy[position.x][position.y].clicked = true;
    foundSquares = getState().minesweeperReducer.squaresLeft;
    --foundSquares;
    if (!squaresCopy[position.x][position.y].number) {
      dispatch(findEmptyNeighbors(squaresCopy, position));
    }
    dispatch(appActions.changeState("CHANGE_SQUARES_LEFT", foundSquares));
    dispatch(appActions.changeState("CHANGE_MINESWEEPER_SQUARES", squaresCopy));
    dispatch(checkGameStatus());
  }
};

const checkGameStatus = () => (dispatch, getState) => {
  console.log(foundSquares);
  if (
    getState().minesweeperReducer.squaresLeft ===
    getState().minesweeperReducer.bombsNumber
  ) {
    dispatch(appActions.changeState("CHANGE_GAME_STATUS", "win"));
  }
};

const findEmptyNeighbors = (squaresCopy, position) => (dispatch, getState) => {
  {
    const size = getState().minesweeperReducer.fieldSize;
    for (
      var neighborX = position.x - 1;
      neighborX <= position.x + 1;
      ++neighborX
    ) {
      for (
        var neighborY = position.y - 1;
        neighborY <= position.y + 1;
        ++neighborY
      ) {
        if (
          neighborX >= 0 &&
          neighborX < size &&
          neighborY >= 0 &&
          neighborY < size
        ) {
          if (
            !squaresCopy[neighborX][neighborY].number &&
            !squaresCopy[neighborX][neighborY].clicked
          ) {
            squaresCopy[neighborX][neighborY].clicked = true;
            --foundSquares;
            dispatch(
              findEmptyNeighbors(squaresCopy, { x: neighborX, y: neighborY })
            );
          }
          if (!squaresCopy[neighborX][neighborY].clicked) {
            squaresCopy[neighborX][neighborY].clicked = true;
            --foundSquares;
          }
        }
      }
    }
  }
};

export const createSquares = () => (dispatch, getState) => {
  dispatch(appActions.changeState("CHANGE_GAME_STATUS", ""));
  const size = getState().minesweeperReducer.fieldSize;
  var newField = [];
  for (var x = 0; x < size; ++x) {
    var rowSquares = [];
    for (var y = 0; y < size; ++y) {
      rowSquares.push({
        hasBomb: false,
        number: 0,
        clicked: false,
        warning: false,
      });
    }
    newField.push(rowSquares);
  }
  dispatch(appActions.changeState("CHANGE_MINESWEEPER_SQUARES", newField));
};

export const assignBombs = (firstClickPosition) => (dispatch, getState) => {
  var bombs = getState().minesweeperReducer.bombsNumber;
  const size = getState().minesweeperReducer.fieldSize;
  var positions = [];
  for (var xIndex = 0; xIndex < size; ++xIndex) {
    for (var yIndex = 0; yIndex < size; ++yIndex) {
      positions.push({ x: xIndex, y: yIndex });
    }
  }
  while (bombs) {
    var randomIndex = getRandomInt(0, positions.length - 1);
    var x = positions[randomIndex].x;
    var y = positions[randomIndex].y;
    if (!(firstClickPosition.x === x && firstClickPosition.y === y)) {
      for (var neighborX = x - 1; neighborX <= x + 1; ++neighborX) {
        for (var neighborY = y - 1; neighborY <= y + 1; ++neighborY) {
          if (neighborX === x && neighborY === y) {
            getState().minesweeperReducer.minesweeperSquares[x][
              y
            ].hasBomb = true;
            --bombs;
          } else {
            if (
              neighborX >= 0 &&
              neighborX < size &&
              neighborY >= 0 &&
              neighborY < size
            ) {
              getState().minesweeperReducer.minesweeperSquares[neighborX][
                neighborY
              ].number =
                getState().minesweeperReducer.minesweeperSquares[neighborX][
                  neighborY
                ].number + 1;
            }
          }
        }
      }
    }
    positions.splice(randomIndex, 1);
  }
  dispatch(checkSquare(firstClickPosition));
  dispatch(appActions.changeState("CHANGE_FIRST_CLICK_STATE", true));
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
