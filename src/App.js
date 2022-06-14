import React from "react"
import Die from "./Die"



export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSame = dice.every(die => die.value === firstValue)

        if (allHeld && allSame) {
            setTenzies(true)
            console.log(tenzies)
        }
    }, [dice, tenzies])
    
    function allNewDice() {
        const newDice = []
        
        for (var i = 0; i < 10; i++) {
            const randomDie = Math.ceil(Math.random() * 6)
            newDice.push({
                value: randomDie,
                isHeld: false
            })
        }
        
        return newDice
    }
    
    const diceElements = dice.map((die, index) => 
        <Die key={index} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(index)} />)
    
    function rollDice() {
        if (tenzies) {
            setDice(allNewDice)
            setTenzies(false)
        } else {
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ? die : {value: Math.ceil(Math.random() * 6), isHeld: false};
            }))
        }
    }

    function holdDice(key) {
        setDice(prevDice => prevDice.map(die => {
            return die === prevDice[key] ? {...die, isHeld: !die.isHeld} : die
        }))
    }
    
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll dice until all are the same. Click on a die face to hold it from rolling</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main>
    )
}