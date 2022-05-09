"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var StopWatch = function () {
    var _a = (0, react_1.useState)(), time = _a[0], setTime = _a[1];
    var _b = (0, react_1.useState)(0), startTime = _b[0], setStartTime = _b[1];
    var _c = (0, react_1.useState)('Start'), btnLabel = _c[0], setBtnLabel = _c[1];
    var _d = (0, react_1.useState)(null), timer = _d[0], setTimer = _d[1];
    return (<div>
            <h1>
                Hello, I'm The Stop Watch
            </h1>
            <button onClick={function () {
            var zeit;
            if (btnLabel === 'Start') {
                console.log('Labe ist', btnLabel);
                zeit = new Date().getTime();
                setStartTime(zeit);
                setBtnLabel('Stop');
            }
            else {
                setBtnLabel('Start');
                clearInterval(timer);
                return;
            }
            setTimer(setInterval(function () {
                var date = new Date().getTime();
                var diff = date - zeit;
                setTime(diff / 1000);
            }, 1000));
        }}>{btnLabel}</button>
            <p>{time}</p>
        </div>);
};
exports.default = StopWatch;
