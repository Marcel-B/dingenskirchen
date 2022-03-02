import React, { useState } from "react";

const StopWatch = () => {
    const [time, setTime] = useState<number>()
    const [startTime, setStartTime] = useState<number>(0);
    const [btnLabel, setBtnLabel] = useState<string>('Start');
    const [timer, setTimer] = useState(null);

    return (
        <div>
            <h1>
                Hello, I'm The Stop Watch
            </h1>
            <button onClick={() => {
                let zeit: number;
                if (btnLabel === 'Start') {
                    console.log('Labe ist', btnLabel);
                    zeit = new Date().getTime();
                    setStartTime(zeit);
                    setBtnLabel('Stop');
                } else {
                    setBtnLabel('Start');
                    clearInterval(timer);
                    return;
                }

                setTimer(setInterval(() => {
                    const date = new Date().getTime();
                    const diff = date - zeit;
                    setTime(diff / 1000);
                }, 1000));
            }}>{btnLabel}</button>
            <p>{time}</p>
        </div>
    )
}

export default StopWatch;