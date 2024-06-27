import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from "./setup";

class GameBoard {
    // DOMGrid is DOM element here
    constructor(DOMGrid) {
        this.DOMGrid = DOMGrid;
        this.grid = [];
        this.dotCount = 0;
    }

    showGameStatus(gameWin) {
        const div = document.createElement('div');
        div.classList.add('game-status');
        div.innerHTML = `${gameWin ? 'Win!' : 'Game Over'}`;
        this.DOMGrid.appendChild(div)
    }

    createGrid(level) {
        this.DOMGrid.innerHTML = '';
        this.grid = [];
        this.dotCount = 0;

        // this.DOMGrid.style.cssText = `grid-template-column: repeat(${GRID_SIZE},${CELL_SIZE}px)`
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE},${CELL_SIZE}px);`;

        level.forEach((square) => {
            const div = document.createElement('div')
            div.classList.add('square', CLASS_LIST[square]);
            div.style.cssText = `width: ${CELL_SIZE}px; height:${CELL_SIZE}px;`;
            this.DOMGrid.appendChild(div)
            this.grid.push(div)

            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++
        })
    }
    addObject(pos, obj) {
        this.grid[pos].classList.add(...obj)
    }

    removeObject(pos, obj) {
        this.grid[pos].classList.remove(...obj)
    }
    objectExists(pos, obj) {
        return this.grid[pos].classList.contains(obj)
    }
    rotateDiv(pos, deg) {
        this.grid[pos].style.transform = `rotate(${deg}deg)`
    }


    moveCharacter(character) {
        if (character.shouldMove()) {
            const { nextMovePos, direction } = character.getNextMove(
                this.objectExists.bind(this)
            );
            const { classesToRemove, classesToAdd } = character.makeMove();

            if (character.rotation && nextMovePos !== character.pos) {
                // Rotate
                this.rotateDiv(nextMovePos, character.dir.rotation);
                // Rotate the previous div back
                this.rotateDiv(character.pos, 0);
            }

            this.removeObject(character.pos, classesToRemove);
            this.addObject(nextMovePos, classesToAdd);

            character.setNewPos(nextMovePos, direction);
        }
    }


    static createGameBoard(DOMGrid, level) {
        const board = new this(DOMGrid);
        board.createGrid(level);
        return board;
    }
}

export default GameBoard;