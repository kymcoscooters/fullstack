import React from 'react'
import ReactDOM from 'react-dom'

const Statistiikka = (props) => {
    if (props.state.yhteensä === 0) {
        return (
            <div>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    } else {
        return (
            <div>
                <h3>statistiikka</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>hyvä</td>
                            <td>{props.state.hyvä}</td>
                        </tr>
                        <tr>
                            <td>neutraali</td>
                            <td>{props.state.neutraali}</td>
                        </tr>
                        <tr>
                            <td>huono</td>
                            <td>{props.state.huono}</td>
                        </tr>
                        <tr>
                            <td>keskiarvo</td>
                            <td>{(props.state.summa/props.state.yhteensä).toFixed(1)}</td>
                        </tr>
                        <tr>
                            <td>positiivisia</td>
                            <td>{((props.state.hyvä/props.state.yhteensä)*100).toFixed(1)}%</td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        )
    }
    
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0,
            yhteensä: 0,
            summa: 0
        }
    }

    clickHyva = () => {
        this.setState({
            hyvä: this.state.hyvä +1,
            yhteensä: this.state.yhteensä +1,
            summa: this.state.summa +1
        })
    }
    
    clickNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali +1,
            yhteensä: this.state.yhteensä +1
        })
    }

    clickHuono = () => {
        this.setState({
            huono: this.state.huono +1,
            yhteensä: this.state.yhteensä +1,
            summa: this.state.summa -1
        })
    }

    klikkiKasittelija = (nimi, arvo) => {
        return () => {
            this.setState({
                yhteensä: this.state.yhteensä +1,
                summa: this.state.summa + arvo,
                
            })
        }
    }
    render() {
        return (
            <div>
                <h3>anna palautetta</h3>
                <button onClick={this.klikkiKasittelija('hyvä', 1)}>hyvä</button>
                <button onClick={this.klikkiKasittelija('neutraali', 0)}>neutraali</button>
                <button onClick={this.klikkiKasittelija('huono', -1)}>huono</button>
                <Statistiikka state={this.state}/>  
            </div>
        )
    }
    
}

ReactDOM.render(<App />, document.getElementById('root'))
