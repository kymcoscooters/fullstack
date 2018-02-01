import React from 'react'

const Kurssi = ({kurssit}) => {
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

    const K = () => kurssit.map((kurssi) => <Kurssi key={kurssi.id} kurssi={kurssi} />)

    return (
        <div>
            <Otsikko />
            <K />
        </div>
    )
}

export default Kurssi