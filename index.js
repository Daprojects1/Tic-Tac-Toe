let p1Name = document.querySelector(".p1Name")
let p2Name = document.querySelector(".p2Name")
let Board = document.querySelector(".Board")
let _player1 = new WeakMap();
let _player2 = new WeakMap();
let _vals = new WeakMap();
let _name = new WeakMap();
let _counter = new WeakMap();
let _checks = new WeakMap();
let innerText = new WeakMap();
let _currentPlaying = new WeakMap();
let _boardfunc = new WeakMap();
let _arrValsX = new WeakMap();
let _arrValsO = new WeakMap();
class TicTacToe {
    constructor() {
        _counter.set(this, 0);
        _checks.set(this, false);
        // function that grabs names;
        _vals.set(this, () => {
            let p3 = prompt("First Player Name ?")
            let p2 = prompt("Second Player Name ? ")
            p1Name.innerText = p3;
            p2Name.innerText = p2;
            _player1.set(this, p3);
            _player2.set(this, p2);
        })
        _arrValsX.set(this, []);
        _arrValsO.set(this, []);
        // function sets and changes the value of x and o 
        _currentPlaying.set(this, () => {
            if (_checks.get(this) === false) {
                innerText.set(this, "x")
                _checks.set(this, true)
            } else if (_checks.get(this) === true) {
                innerText.set(this, "o")
                _checks.set(this, false)
            }
            return innerText.get(this)
        })
        // function that adds X or O to board and ev listeners
        _boardfunc.set(this, () => {
            let arrX = _arrValsX.get(this);
            let arrO = _arrValsO.get(this);
            for (let i = 0; i < Board.children.length; i++) {
                Board.children[i].setAttribute("data-id", i);
                let changeColor = () => {
                    let XorO = _currentPlaying.get(this)();
                    Board.children[i].innerText = XorO;
                    if (Board.children[i].innerText === "x") {
                        let attrX = Board.children[i].getAttribute("data-id");
                        arrX.push(attrX);
                        console.log("arr1", arrX);
                        Board.children[i].classList.add("p1Color");
                    } else if (Board.children[i].innerText === "o") {
                        Board.children[i].classList.add("p2Color")
                        let attrX = Board.children[i].getAttribute("data-id");
                        arrO.push(attrX);
                        console.log("ar2", arrO);
                    };
                    Board.children[i].removeEventListener("click", changeColor)
                }
                Board.children[i].addEventListener("click", changeColor)
            }
        })
    }
    Names() {
        let counter = _counter.get(this)
        if (!counter) {
            _vals.get(this)();
        }
        this.BoardEv();
    }
    BoardEv() {
        let counter = _counter.get(this)
        if (!counter) {
            _counter.set(this, 1)
            _boardfunc.get(this)();
        }
    }
    static Run() {
        return new TicTacToe().Names();
    }
}

TicTacToe.Run();