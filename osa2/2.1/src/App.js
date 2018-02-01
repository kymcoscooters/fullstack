import React from 'react'
import Kurssi from './components/kurssi'

const App = ({kurssit}) => {
	return (
        <div>
            <Kurssi kurssit={kurssit} />
        </div>
    )
}

export default App