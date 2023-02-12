import React, { forwardRef, useEffect } from 'react';
import * as S from './Canvas.styles';

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  draw: (context: CanvasRenderingContext2D) => void;
};

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ draw, ...props }, canvasRef) => {
    useEffect(() => {
      if (!canvasRef) {
        return;
      }
      const canvas = (canvasRef as React.RefObject<HTMLCanvasElement>).current;
      if (!canvas) {
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      draw(context);
      return () => context.clearRect(0, 0, window.innerWidth, 400);
    }, [draw, canvasRef]);

    if (!canvasRef) {
      return null;
    }

    return (
      <S.Canvas width={300} height={150} ref={canvasRef as any} {...props} />
    );
  }
);

Canvas.displayName = 'Canvas';

export default Canvas;