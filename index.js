let p1Name = document.querySelector(".p1Name")
let p2Name = document.querySelector(".p2Name")
let Board = document.querySelector(".Board")
let _player1 = new WeakMap();
let _player2 = new WeakMap();
let _vals = new WeakMap();
let _name = new WeakMap();
let _counter = new WeakMap();
let _checks = new WeakMap();
let _currentPlaying = new WeakMap();
let innerText = new WeakMap();
class TicTacToe {
    constructor() {
        _counter.set(this, 0);
        _checks.set(this, false);
        _vals.set(this, () => {
            // let p3 = prompt("First Player Name ?")
            // let p2 = prompt("Second Player Name ? ")
            // p1Name.innerText = p3;
            // p2Name.innerText = p2;
            // _player1.set(this, p3);
            // _player2.set(this, p2);
        })
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
    }

    Names() {
        let counter = _counter.get(this)
        this.BoardEv();
        if (!counter) {
            _counter.set(this, 1)
            return _vals.get(this)();
        } else {
            throw new Error("Already Got Names")
        }
    }
    XorO() {
        let item = _currentPlaying.get(this)();
        return item;
    }
    BoardEv() {
        for (let i = 0; i < Board.children.length; i++) {
            Board.children[i].setAttribute("data-id", i);
            Board.children[i].addEventListener("click", function addVal() {
                if (Board.children[i].innerText === "x") {
                    Board.children[i].classList.add("p1Color");
                } else if (Board.children[i].innerText === "o") {
                    Board.children[i].classList.add("p2Color")
                };
                Board.children[i].removeEventListener("click", addVal)
            })
        }
    }

}

let c = new TicTacToe();
c.Names()
c.BoardEv();