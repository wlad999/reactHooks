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
                {/*<ClassCounter value={value}/>*/}
                {/*<HookCounter value={value}/>*/}
                <Notification/>

            </div>
        )
    } else {
        return <button onClick={() => setVisible(true)}>show
        </button>
    }
}

class ClassCounter extends Component {
    componentDidMount() {
        console.log("class: mount")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("class: update")
    }

    componentWillUnmount() {
        console.log("class: unmount")
    }

    render() {
        return <p>{this.props.value}</p>
    }

}

const HookCounter = ({value}) => {

    useEffect(() => {
        console.log("Update useEffect")
    })
    useEffect(() => {
        console.log("mount useEffect")
        return () => console.log("clear useEffect")
    }, [])
    return <p>{value}</p>

}
const Notification = () => {
    const [value, setValue] = useState("HELLO!!!")

    useEffect(() => {
        const timeout = setTimeout(() => {
            setValue("UPS((((")
        }, 1500)
        return () => {
            clearInterval(timeout)
        }
    }, [])

    return <div><p>{value}</p></div>
}


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
    ,
    document.getElementById('root')
);
