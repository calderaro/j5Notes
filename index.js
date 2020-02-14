var { Board, Leds, Sensor } = require("johnny-five"),
    board = new Board({ port: "COM3" });

board.on("ready", () => {
    const leds = new Leds([2, 3, 4, 5, 6]);
    const pot = new Sensor("A0");

    pot.on("change", () => {
        const lastIndex = Math.round(pot.scaleTo([-1, 4]));
        if (lastIndex === -1) {
            leds.off();
        } else {
            leds.each((led, index) => {
                if (index <= lastIndex) {
                    led.on();
                } else {
                    led.off();
                }
            });
        }
    });
});
