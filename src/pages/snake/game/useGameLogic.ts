import React, { useState, useEffect } from 'react';
import useInterval from '../utils/useInterval';
import createSnakeMovement from './movement';
import { SEGMENT_SIZE } from '../draw/draw';
import randomPosition from '../utils/randomPosition';


export interface Position {
    x: number;
    y: number;
}


export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

const MOVEMENT_SPEED = 100;


interface useGameLogicArgs {
    canvasWidth?: number;
    canvasHeight?: number;
}



const useGameLogic = ({ canvasWidth, canvasHeight }: useGameLogicArgs) => {

    const [direction, setDirection] = useState<Direction | undefined>();


    const [snakeBody, setSnakeBody] = useState<Position[]>([{
        x: 0,
        y: 0
    }]);


    const [foodPosition, setFoodPosition] = useState<Position | undefined>();

    const snakeHeadPosition = snakeBody[snakeBody.length - 1];

    const { moveDown, moveUp, moveLeft, moveRight } = createSnakeMovement();


    useEffect(() => {


        if (!canvasHeight || !canvasWidth) {
            return;
        }
        setFoodPosition({
            x: randomPosition({
                gridSize: SEGMENT_SIZE,
                threshold: canvasWidth,
            }),
            y: randomPosition({
                gridSize: SEGMENT_SIZE,
                threshold: canvasHeight,
            }),
        });

        setSnakeBody([
            {
                x: randomPosition({
                    gridSize: SEGMENT_SIZE,
                    threshold: canvasWidth,
                }),
                y: randomPosition({
                    gridSize: SEGMENT_SIZE,
                    threshold: canvasHeight,
                }),
            }
        ])

    }, [canvasHeight, canvasWidth])
    


    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case 'KeyS':
                if (direction !== Direction.UP) {
                    setDirection(Direction.DOWN)
                }
                break;
            case 'KeyW':
                if (direction !== Direction.DOWN) {
                    setDirection(Direction.UP)
                }
                break;
            case 'KeyD':
                if (direction !== Direction.LEFT) {
                    setDirection(Direction.RIGHT)
                }
                break;
            case 'KeyA':
                if (direction !== Direction.RIGHT) {
                    setDirection(Direction.LEFT)
                }
                break;
        }
    }


    const moveSnake = () => {

        let snakeBodyAfterMovement: Position[] | undefined;

        switch (direction) {
            case Direction.UP:
                if (snakeHeadPosition.y > 0) {
                    snakeBodyAfterMovement = moveUp(snakeBody);
                } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
                    setDirection(Direction.LEFT);
                } else {
                    setDirection(Direction.RIGHT);
                }
                break;
            case Direction.DOWN:
                if (canvasHeight && snakeHeadPosition.y < canvasHeight - SEGMENT_SIZE) {
                    snakeBodyAfterMovement = moveDown(snakeBody);
                } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
                    setDirection(Direction.LEFT);
                }
                else {
                    setDirection(Direction.RIGHT);
                }
                break;
            case Direction.LEFT:
                if (snakeHeadPosition.x > 0) {
                    snakeBodyAfterMovement = moveLeft(snakeBody);
                } else if (canvasHeight && snakeHeadPosition.y < canvasHeight / 2) {
                    setDirection(Direction.DOWN);
                } else {
                    setDirection(Direction.UP);
                }
                break;
            case Direction.RIGHT:
                if (canvasWidth && snakeHeadPosition.x < canvasWidth - SEGMENT_SIZE) {
                    snakeBodyAfterMovement = moveRight(snakeBody);
                } else if (canvasHeight && snakeHeadPosition.y < canvasHeight / 2) {
                    setDirection(Direction.DOWN);
                } else {
                    setDirection(Direction.UP);
                }
                break;
        }

        if (snakeBodyAfterMovement) {
            setSnakeBody(snakeBodyAfterMovement)
        }
    }

    useInterval(moveSnake, MOVEMENT_SPEED);

    return {
        snakeBody,
        onKeyDownHandler,
        foodPosition,
    };

};

export default useGameLogic;