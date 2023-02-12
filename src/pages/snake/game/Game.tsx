import React, { useRef } from 'react';
import Canvas from "../canvas/Canvas";
import { GameWrapper } from './Game.styles';
import draw from '../draw/draw';
import useGameLogic from './useGameLogic';


interface GameProps { }

const Game: React.FC<GameProps> = ({ }) => {


    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { snakeBody, onKeyDownHandler, foodPosition } = useGameLogic({
        canvasHeight: canvasRef.current?.height,
        canvasWidth: canvasRef.current?.width
    });

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        draw({ ctx, snakeBody, foodPosition });
    }


    return (
        <div id='game-body'>
            <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
                <Canvas ref={canvasRef}
                 draw={drawGame} />
            </GameWrapper>
        </div>
    );
};

export default Game;