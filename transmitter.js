let stable = false
let now = 0
let run = false
let mail = 0
let firsttime = 0
let now1 = 0
bluetooth.onBluetoothConnected(() => {

})
bluetooth.onBluetoothDisconnected(() => {

})
basic.forever(() => {
    if (mail == 1 && stable == true && firsttime == 0) {
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            //basic.showString("D")
        }
        firsttime = 1
    }
    if (mail == 0 && stable == true && firsttime == 0) {
        if (pins.digitalReadPin(DigitalPin.P0) == 0) {
            //basic.showString("E")
        }
    }
    if (stable == false) {
        now = input.runningTime()
        if (now > now1 + 3 * 1000 * 60) {
            stable = true
            //basic.showString("S")
        }
    }
    if (firsttime == 1 && run == false) {
        //basic.showString("V")
        bluetooth.advertiseUrl(
            "http://www.google.com",
            7,
            false
        )
        run = true
    }
})
basic.forever(() => {
    if (firsttime == 0) {
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            mail = 1
        }
        if (pins.digitalReadPin(DigitalPin.P0) == 0) {
            mail = 0
        }
    }
    if (input.buttonIsPressed(Button.B)) {
        control.reset()
    }
})
now1 = input.runningTime()
//basic.showString("I")
firsttime = 0
run = false
bluetooth.stopAdvertising()
firsttime = 0
