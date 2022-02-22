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
let _bgIndex1 = new WeakMap();
let _bgIndex2 = new WeakMap();
class TicTacToe {
    constructor() {
        _counter.set(this, 0);
        _checks.set(this, false);
        // function that grabs names;
        _vals.set(this, () => {
            // let p3 = prompt("First Player Name ?")
            // let p2 = prompt("Second Player Name ? ")
            // p1Name.innerText = p3;
            // p2Name.innerText = p2;
            // _player1.set(this, p3);
            // _player2.set(this, p2);
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
            let checkforDone = 0;
            for (let i = 0; i < Board.children.length; i++) {
                Board.children[i].setAttribute("data-id", i);
                let changeColor = () => {
                    checkforDone++;
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
                    if (checkforDone === 9) {
                        this.drawCheck();
                    }
                    this.winCheck();
                    Board.children[i].removeEventListener("click", changeColor)
                }
                Board.children[i].addEventListener("click", changeColor)
            }
        })
    }
    // allows us to get the names and store it 
    Names() {
        let counter = _counter.get(this)
        if (!counter) {
            _vals.get(this)();
        }
        this.BoardEv();
    }
    // the main board function.
    BoardEv() {
        let counter = _counter.get(this)
        if (!counter) {
            _counter.set(this, 1)
            _boardfunc.get(this)();
        }
    }
    // still working on this function.
    winCheck() {
        let winningVals = [
            ["210", "012", "120", "102", "201", "021"],
            ["345", "354", "435", "453", "543", "534"],
            ["678", "687", "768", "786", "867", "876"],
            ["036", "063", "306", "360", "603", "630"],
            ["147", "174", "417", "471", "741", "714"],
            ["258", "285", "528", "582", "825", "852"],
            ["048", "084", "480", "408", "840", "804"],
            ["264", "246", "426", "462", "624", "642"]
        ];
        let arrX = _arrValsX.get(this).join("");
        let arrO = _arrValsO.get(this).join("");
        let player1Check = winningVals.flatMap((item) => {
            let bool;
            item.map((vals) => {
                if (arrX.includes(vals)) {
                    _bgIndex1.set(this, vals)
                    bool = true;
                }
            })
            return bool;
        })
        let player2Check = winningVals.flatMap((item) => {
            let bool;
            item.map((vals) => {
                if (arrO.includes(vals)) {
                    _bgIndex2.set(this, vals)
                    bool = true;
                }
            })
            return bool
        })

        if (player1Check.includes(true)) {
            let cBgColor = _bgIndex1.get(this);
            Board.children[cBgColor[0]].classList.add("bg1")
            Board.children[cBgColor[1]].classList.add("bg1")
            Board.children[cBgColor[2]].classList.add("bg1")
            alert(`${_player1.get(this)} has won !`);
        } else if (player2Check.includes(true)) {
            let cBgColor2 = _bgIndex2.get(this);
            alert(`${_player2.get(this)} has won!`);
        }
    }
    drawCheck() {
        if (!_bgIndex1.get(this) && !_bgIndex2.get(this)) {
            alert("This is a draw, play again!")
            location.reload();
        }
    }
    Reset() {
        let btn = document.querySelector(".mainbtn")
        btn.addEventListener("click", () => {
            location.reload();
        })
    }
    static Run() {
        new TicTacToe().Names();
        return new TicTacToe().Reset();
    }
}

TicTacToe.Run();