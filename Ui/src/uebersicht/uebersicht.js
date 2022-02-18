import {useNavigate} from 'react-router-dom';

export function Uebersicht() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>
                Hier ist die Übersicht
            </h1>
            <button onClick={() => navigate("/neue-buchung")}>Neu</button>
        </div>
    )
}