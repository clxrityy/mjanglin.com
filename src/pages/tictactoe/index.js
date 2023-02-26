import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './components/Style.module.css';

const Tictactoe = () => {

    const WINNING_COMBO = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const [xTurn, setXTurn] = useState(true);
    const [won, setWon] = useState(false);
    const [wonCombo, setWonCombo] = useState([]);
    const [boardData, setBoardData] = useState({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: ''
    });


    const [isDraw, setIsDraw] = useState(false);

    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        checkWinner();
        checkDraw();
    }, [boardData])

    const updateBoardData = (idx) => {
        if (!boardData[idx] && !won) {
            // check whether specify idx is empty or not
            let value = xTurn === true ? "X" : 'O';
            setBoardData({ ...boardData, [idx]: value })
            setXTurn(!xTurn);
        }
    };

    const checkDraw = () => {
        let check = Object.keys(boardData).every((v) => boardData[v]);
        setIsDraw(check);
        if (check) {
            setModalTitle("It's a draw!")
        }
    }

    const checkWinner = () => {
        
        WINNING_COMBO.map((bd) => {
            const [a, b, c] = bd
            if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
                setWon(true);
                setWonCombo([a, b, c]);
                setModalTitle(`Player ${!xTurn ? 'X' : 'O'} Won!`)
                return
            }
        });
    };

    const reset = () => {
        setBoardData({
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: '',
            8: ''
        })
        setXTurn(true)
        setWon(false)
        setWonCombo([])
        setIsDraw(false)
        setModalTitle("")
    }

    return (
        <div className={styles.game}>
            <Head>
                <title>
                    MJ Anglin | TicTacToe
                </title>
            </Head>
            <h1 className='text-center'>
                Tic Tac Toe
            </h1>
            <div className='flex flex-col items-center'>
                <div className='text-center font-bold'>
                    <p className='p-3 text-[#4b9084] text-2xl'>
                        {
                            xTurn === true ? 'X Turn' : 'O Turn'
                        }
                    </p>
                </div>
                <div className={styles.game__board}>
                    {[...Array(9)].map((v, idx) => {
                        return (
                            <div

                                key={idx}
                                className={`${styles.square} ${wonCombo.includes(idx) ? styles.highlight : ''}`}
                                onClick={() => {
                                    updateBoardData(idx);
                                }}>
                                {boardData[idx]}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={`${styles.modal} ${modalTitle ? styles.show : ''}`}>
                <div className={styles.modal__title}>
                    {modalTitle}
                </div>
                <button onClick={reset} className={styles.button}>
                    New Game
                </button>
            </div>
        </div>
    );
};

export default Tictactoe;