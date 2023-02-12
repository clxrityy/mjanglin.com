import { Position } from "./useGameLogic";

const createSnakeMovement = (gridSize = 5) => ({
    moveRight: (snakeBody: Position[]) => {
        const bodyCopy = [...snakeBody];
        const headPos = bodyCopy[bodyCopy.length - 1];
        bodyCopy.shift();
        return [...bodyCopy, { ...headPos, x: headPos.x + gridSize }];
    },
    moveLeft: (snakeBody: Position[]) => {
        const bodyCopy = [...snakeBody];
        const headPos = bodyCopy[bodyCopy.length - 1];
        bodyCopy.shift();
        return [...bodyCopy, { ...headPos, x: headPos.x - gridSize }];
    },
    moveDown: (snakeBody: Position[]) => {
        const bodyCopy = [...snakeBody];
        const headPos = bodyCopy[bodyCopy.length - 1];
        bodyCopy.shift();
        return [...bodyCopy, { ...headPos, y: headPos.y + gridSize }];
    },
    moveUp: (snakeBody: Position[]) => {
        const bodyCopy = [...snakeBody];
        const headPos = bodyCopy[bodyCopy.length - 1];
        bodyCopy.shift();
        return [...bodyCopy, { ...headPos, y: headPos.y - gridSize }];
    }
});

export default createSnakeMovement;