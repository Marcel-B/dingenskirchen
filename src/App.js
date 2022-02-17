import logo from './logo.svg';
import './App.css';
import {Navigation} from "./navigation/navigation";
import {Uebersicht} from "./uebersicht/uebersicht";
import {Route, Routes} from "react-router-dom";
import {NeueBuchung} from "./neue-buchung/neue-buchung";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <Routes>
                <Route path="/" element={<Uebersicht/>}/>
                <Route path="/uebersicht" element={<Uebersicht/>}/>
                <Route path="/neue-buchung" element={<NeueBuchung/>}/>
            </Routes>
        </div>
    );
}

export default App;
