const blocks = [
    { type: 'Empty', color: '#111317', class: 'block' },
    { type: 'T', color: '#A29BFE', class: 'block_T' },
    { type: 'L', color: '#F4A261', class: 'block_L' },
    { type: 'J', color: '#457B9D', class: 'block_J' },
    { type: 'Z', color: '#E76F51', class: 'block_Z' },
    { type: 'S', color: '#2A9D8F', class: 'block_S' },
    { type: 'I', color: '#81ECEC', class: 'block_I' },
    { type: 'O', color: '#E9C46A', class: 'block_O' }
];
const T_Form = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
]
const L_Form = [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
]
const J_Form = [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
]
const Z_Form = [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0]
]
const S_Form = [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
]
const I_Form = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [6, 6, 6, 6],
    [0, 0, 0, 0]
]
const O_Form = [
    [7, 7],
    [7, 7]
]
class Block {
    type;
    form;
    x;
    y;

    constructor(type) {
        this.type = type;
        this.form = this.getForm();
        if (this.type === 'O') {
            this.x = 4;
        } else {
            this.x = 3;
        }
        this.y = 0;
    }

    getForm() {
        switch (this.type) {
            case 'T':
                return T_Form;
            case 'L':
                return L_Form;
            case 'J':
                return J_Form;
            case 'Z':
                return Z_Form;
            case 'S':
                return S_Form;
            case 'I':
                return I_Form;
            case 'O':
                return O_Form;
            default:
                return [];
        }
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }
}
const blockSize = 25;
let board = Array.from({ length: 20 }, () => Array(10).fill(0));
const canvas = document.getElementById('game_board');
const nextBlockCanvas = document.getElementById('next_block');
const ctx = canvas.getContext('2d');
const nextBlockCtx = nextBlockCanvas.getContext('2d');
const scoreElement = document.getElementById('score');

let currentBlock;
let nextBlock;
let gameIntervalId;
let gameOver = false;
let score = 0;
let isPaused = false;

const startButton = document.getElementById('start_button');
const pauseButton = document.getElementById('pause_button');

function GetRandomBlockType() {
    const types = ['T', 'L', 'J', 'Z', 'S', 'I', 'O'];
    return types[Math.floor(Math.random() * types.length)];
}

function drawBlock(ctx, block) {
    if (!block) return;
    const blockData = blocks.find(b => b.type === block.type);
    for (let row = 0; row < block.form.length; row++) {
        for (let col = 0; col < block.form[row].length; col++) {
            if (block.form[row][col] != 0) {
                ctx.fillStyle = blockData.color;
                ctx.fillRect((block.x + col) * blockSize, (block.y + row) * blockSize, blockSize, blockSize);
                ctx.strokeStyle = '#7eca9c';
                ctx.lineWidth = 2;
                ctx.strokeRect((block.x + col) * blockSize, (block.y + row) * blockSize, blockSize, blockSize);
            }
        }
    }
}

function drawNextBlock(ctx, block) {
    if (!block) return;
    const blockData = blocks.find(b => b.type === block.type);

    const offsetX = (nextBlockCanvas.width - block.form[0].length * blockSize) / 2;
    const offsetY = (nextBlockCanvas.height - block.form.length * blockSize) / 2;

    for (let row = 0; row < block.form.length; row++) {
        for (let col = 0; col < block.form[row].length; col++) {
            if (block.form[row][col] != 0) {
                ctx.fillStyle = blockData.color;
                ctx.fillRect(offsetX + col * blockSize, offsetY + row * blockSize, blockSize, blockSize);
                ctx.strokeStyle = '#7eca9c';
                ctx.lineWidth = 2;
                ctx.strokeRect(offsetX + col * blockSize, offsetY + row * blockSize, blockSize, blockSize);
            }
        }
    }
}

function drawBoard(ctx, board) {
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            ctx.fillStyle = blocks[cell].color;
            ctx.fillRect(colIndex * blockSize, rowIndex * blockSize, blockSize, blockSize);
            if (cell != 0) {
                ctx.strokeStyle = '#7eca9c';
            } else {
                ctx.strokeStyle = 'rgba(126, 202, 156, 0.08)';
            }
            ctx.lineWidth = 2;
            ctx.strokeRect(colIndex * blockSize, rowIndex * blockSize, blockSize, blockSize);
        });
    });
    ctx.strokeStyle = '#7eca9c';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, blockSize * 10, blockSize * 20)
}

function updateNextBlockWindow() {
    nextBlockCtx.clearRect(0, 0, nextBlockCanvas.width, nextBlockCanvas.height);
    nextBlockCtx.fillStyle = '#111317';
    nextBlockCtx.fillRect(0, 0, nextBlockCanvas.width, nextBlockCanvas.height);
    drawNextBlock(nextBlockCtx, nextBlock);
}

function moveForm(block, directionX) {
    block.x = block.x + directionX;
    if (checkCollision(block, board)) {
        if (directionX < 0) {
            block.x++;
        } else if (directionX > 0) {
            block.x--;
        }
    }
}

function checkCollision(block, board) {
    for (let row = 0; row < block.form.length; row++) {
        for (let col = 0; col < block.form[row].length; col++) {
            if (block.form[row][col] != 0) {
                const newX = block.x + col;
                const newY = block.y + row;
                if (newX < 0 || newX >= board[0].length || newY >= board.length) {
                    return true;
                }
                if (newY >= 0 && board[newY][newX] != 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

function rotateForm(block) {
    if (gameOver || isPaused) return;
    if (block.type === 'O') return; // O block doesn't rotate

    const oldForm = block.form.map(row => [...row]);
    const oldX = block.x;

    let newForm = [];
    block.form[0].forEach((_, colIndex) => {
        newForm.push([]);
        block.form.forEach((row, rowIndex) => {
            newForm[colIndex].unshift(row[colIndex]);
        });
    });
    block.form = newForm;

    if (checkCollision(block, board)) {
        // Спершу пробуємо посунути фігуру ВПРАВО на 1 клітинку (якщо вона врізалась у ліву стіну)
        block.x++;
        if (checkCollision(block, board)) {
            // Якщо не допомогло, пробуємо посунути ВЛІВО від початкової позиції (якщо врізалась у праву стіну чи блок)
            block.x = oldX - 1;
            if (checkCollision(block, board)) {
                // Для довгих фігур (наприклад, 'I') може знадобитися зсув на 2 клітинки вліво
                block.x = oldX - 2;
                if (checkCollision(block, board)) {
                    // Якщо жоден зсув не допоміг і фігура все одно перетинає інші блоки —
                    // ПОВНІСТЮ СКАСОВУЄМО ПОВОРОТ (повертаємо все як було до виклику функції)
                    block.form = oldForm;
                    block.x = oldX;
                }
            }
        }
    }
}

function clearFullRows(board, score) {
    let deletedRows = 0;
    board.forEach((row, rowIndex) => {
        if (row.every(cell => cell != 0)) {
            board.splice(rowIndex, 1);
            board.unshift(Array(10).fill(0));
            deletedRows++;
        }
    });
    if (deletedRows > 0) {
        score += (deletedRows * 10) * deletedRows;
    }
    return score;
}

function gameTick() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard(ctx, board);
    drawBlock(ctx, currentBlock);

    // Move the current block down
    currentBlock.y++;
    if (checkCollision(currentBlock, board)) {
        currentBlock.y--;
        currentBlock.form.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell != 0) {
                    board[currentBlock.y + rowIndex][currentBlock.x + colIndex] = blocks.findIndex(b => b.type === currentBlock.type);
                }
            });
        });

        currentBlock = nextBlock;
        nextBlock = new Block(GetRandomBlockType());
        updateNextBlockWindow();
        if (checkCollision(currentBlock, board)) {
            gameOver = true;
            startButton.innerText = 'Restart Game';
            startButton.disabled = false;
            alert('Game Over!');
        }
    }

    score = clearFullRows(board, score);
    scoreElement.innerText = `Score: ${score}`;
}

function startLoop() {
    gameIntervalId = setInterval(() => {
        gameTick();
    }, 250);
}

function Startgame() {
    if (gameIntervalId) clearInterval(gameIntervalId);

    gameOver = false;
    isPaused = false;
    score = 0;
    scoreElement.innerText = `Score: 0`;
    pauseButton.innerText = 'Pause Game';

    board = Array.from({ length: 20 }, () => Array(10).fill(0));

    currentBlock = new Block(GetRandomBlockType());
    nextBlock = new Block(GetRandomBlockType());

    updateNextBlockWindow();
    startLoop();
}


startButton.addEventListener('click', () => {
    Startgame();
    startButton.disabled = true;
});

pauseButton.addEventListener('click', () => {
    if (gameIntervalId && !isPaused) {
        clearInterval(gameIntervalId);
        isPaused = true;
        pauseButton.innerText = 'Resume';
    } else if (gameIntervalId && isPaused) {
        startLoop();
        isPaused = false;
        pauseButton.innerText = 'Pause Game';
    }
});

document.addEventListener('keydown', (event) => {
    if (gameOver || isPaused) return;

    if (event.key === 'ArrowLeft' || event.key === 'a') {
        moveForm(currentBlock, -1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard(ctx, board);
        drawBlock(ctx, currentBlock, currentBlock.x, currentBlock.y);
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard(ctx, board);
        drawBlock(ctx, currentBlock, currentBlock.x, currentBlock.y);
        moveForm(currentBlock, 1);
    } else if (event.key === 'ArrowUp' || event.key === 'w' || event.key === ' ') {
        // Rotate the block
        rotateForm(currentBlock);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard(ctx, board);
        drawBlock(ctx, currentBlock, currentBlock.x, currentBlock.y);
    } else if (event.key === 'ArrowDown' || event.key === 's') {
        while (!checkCollision(currentBlock, board)) {
            currentBlock.y++;
        }
        currentBlock.y--;
    }
});

drawBoard(ctx, board);
