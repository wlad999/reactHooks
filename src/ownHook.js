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
const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}/`).then(
        res => res.json()).then(data => data)
}
const useRequest = (request) => {
    const [dataState, setDataState] = useState("noknown")
    useEffect(() => {
        let canceled = false
        request().then(data => !canceled
            &&
            setDataState(data)
        )
        return () => {
            canceled = true
        }
    },)
    return dataState

}

const usePlanetInfo = (id) => {
    const request = () => getPlanet(id)
    return useRequest(request)

}

const PlanetInfo = ({id}) => {
    const data = usePlanetInfo(id)

    return (
        <div>{id} - {data && data.name}</div>
    )
}
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    ,
    document.getElementById('root')
);
