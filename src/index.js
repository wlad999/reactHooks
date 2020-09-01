import React, {useState, Component, useEffect} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(0)
    const [visible, setVisible] = useState(true)

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>
                    +
                </button>
                <button onClick={() => setVisible(false)}>hide</button>
                <PlanetInfo id={value}/>
            </div>
        )
    } else {
        return <button onClick={() => setVisible(true)}>show
        </button>
    }
}
const usePlanetInfo = (id) => {
    const [planet, setPlanet] = useState("noknown")
    useEffect(() => {
        let canceled = false
        fetch(`https://swapi.dev/api/planets/${id}/`).then(
            res => res.json()).then(data => !canceled && setPlanet(data.name))
        return () => {
            canceled = true
        }
    }, [id])
    return planet

}

const PlanetInfo = ({id}) => {
    const name = usePlanetInfo(id)

    return (
        <div>{id} - {name}</div>
    )
}
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    ,
    document.getElementById('root')
);
