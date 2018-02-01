import React from 'react'
import ReactDOM from 'react-dom'

const Kurssit = (props) => {

    const Otsikko = () => <h1>Opetusohjelma</h1>

    const Kurssi = (props) => {
        const Kurssinimi = () => <h1>{props.kurssi.nimi}</h1>

        const Sisalto = () => props.kurssi.osat.map((osa) => <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>)

        const Yhteensa = () => <p>Yhteensä {props.kurssi.osat.reduce((tot, curr) => {return(tot + curr.tehtavia)},0)} tehtävää</p>

        return (
            <div>
                <Kurssinimi />
                <Sisalto />
                <Yhteensa />
            </div>
        )
    }

    const K = () => props.kurssit.map((kurssi) => <Kurssi key={kurssi.id} kurssi={kurssi} />)

    return(
        <div>
            <Otsikko />
            <K />
        </div>
    )
}

const App = () => {
    const kurssit = [
        {
          nimi: 'Half Stack -sovelluskehitys',
          id: 1,
          osat: [
            {
              nimi: 'Reactin perusteet',
              tehtavia: 10,
              id: 1
            },
            {
              nimi: 'Tiedonvälitys propseilla',
              tehtavia: 7,
              id: 2
            },
            {
              nimi: 'Komponenttien tila',
              tehtavia: 14,
              id: 3
            }
          ]
        },
        {
          nimi: 'Node.js',
          id: 2,
          osat: [
            {
              nimi: 'Routing',
              tehtavia: 3,
              id: 1
            },
            {
              nimi: 'Middlewaret',
              tehtavia: 7,
              id: 2
            }
          ]
        }
      ]

    return (
        <div>
            <Kurssit kurssit={kurssit} />
        </div>
    )
}

ReactDOM.render(
    <App />,  
    document.getElementById('root')
)
