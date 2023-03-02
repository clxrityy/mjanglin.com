import React, { useState } from 'react';
import styles from './Board.module.css';

const BOARD_SIZE = 10;

const Board = () => {

    class LinkedListNode {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }

    class SinglyLinkedList {
        constructor(value) {
            const node = new LinkedListNode(value);
            this.head = node;
            this.tail = node;
        }
    }

    const [board, setBoard] = useState(createBoard(BOARD_SIZE));
    const [snakeCells, setSnakeCells] = useState(new Set([44]));
    const [snake, setSnake] = useState(new SinglyLinkedList(44));

    return (
        <div className={styles.board}>
            {board.map((row, rowIdx) => (
                <div key={rowIdx} className={styles.row}>
                    {row.map((cellValue, cellIdx) => (
                        <div key={cellIdx} className={`${styles.cell} ${snakeCells.has(cellValue) ? styles.snake_cell : ''}`}>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const createBoard = BOARD_SIZE => {
    let counter = 1;
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        const currentRow = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            currentRow.push(counter++);
        }
        board.push(currentRow);
    }
    return board;
}

export default Board;