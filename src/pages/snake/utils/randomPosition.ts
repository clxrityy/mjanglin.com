

interface randomPositionArgs {
    gridSize?: number;
    threshold: number;
}



const randomPosition = ({ gridSize = 5, threshold }: randomPositionArgs) => Math.floor(Math.random() * (threshold / gridSize)) * gridSize;

export default randomPosition;