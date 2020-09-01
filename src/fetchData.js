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

const PlanetInfo = ({id}) => {
    const [planet, setPlanet] = useState("noknown")
    // const getPlanet = async (id) => {
    //     const result = await fetch(`https://swapi.dev/api/planets/${id}/`).then(
    //         res => res.json()).then(data => setPlanet(data.name))
    // };
    useEffect(() => {
        let canceled = false
        fetch(`https://swapi.dev/api/planets/${id}/`).then(
            res => res.json()).then(data => !canceled && setPlanet(data.name))
        return () => {
            canceled = true
        }
        // getPlanet(id)
        //---------------CORS POLICE!!!!!!!!!!!!!!!!!
        // fetch('https://swapi.co/api/planets/3')
        //     .then(res => res.json())
        //     .then(data => console.log("NAME", data.name))
        //----------------------------------------

    }, [id])
    return (
        <div>{id} - {planet ? planet : "not found"}</div>
    )
}
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    ,
    document.getElementById('root')
);
