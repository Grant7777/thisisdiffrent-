let controllerIndex = null;

//Left JoyStick
let leftRightAxis1 = 0;
let upDownAxis1 = 0;

//Right JoyStick
let leftRightAxis2 = 0;
let upDownAxis2 = 0;

//in-game controller
let jump = false;
let crouch = false;

window.addEventListener("gamepadconnected", (event) => {
    const gamepad = event.gamepad;
    controllerIndex = gamepad.index;
});

window.addEventListener("gamepaddisconnected",(event) => {
    controllerIndex = null;
});

function handleSticks(axes) {
    updateStick1(axes[0], axes[1]);
    updateStick2(axes[2], axes[3]);
}

function updateStick1(leftRighAxis, upDownAxis) {
    const multiplier = 25;
    const stickLeftRight = leftRighAxis * multiplier;
    const stickUpDown = upDownAxis * multiplier;
    leftRightAxis1 = stickLeftRight;
    upDownAxis1 = stickUpDown;
}

function updateStick2(leftRightAxis, upDownAxis) {
    const multiplier = 25;
    const stickLeftRight = leftRightAxis * multiplier;
    const stickUpDown = upDownAxis * multiplier;
    leftRightAxis2 = stickLeftRight;
    upDownAxis2 = stickUpDown;
}

function controllerConnected() {
    if(controllerIndex != null) {
        return true;
    }
    return false;
}

function handleButtons(buttons) {
    for(let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        if(button.value > 0) {
            if(i == 0) {
                jump = true;
            }

            if(i == 1) {
                crouch = true;
            }
        }
    }
}

function getCameraX() {
    return leftRightAxis2; 
}

function getCameraY() {
    return upDownAxis2;
}

function isWalkingForward() {
    if(upDownAxis1 < 0) {
        return true;
    }
    return false;
}

function isWalkingBackward() {
    if(upDownAxis1 > 0) {
        return true;
    }
    return false;
}

function isWalkingLeft() {
    if(leftRightAxis1 < 0) {
        return true;
    }
    return false;
}

function isWalkingRight() {
    if(leftRightAxis1 > 0) {
        return true;
    }
    return false;
}

function isKeyDown(buttonID) {
    const gamepad = navigator.getGamepads()[controllerIndex];
    const buttons = gamepad.buttons;
    const button = buttons[buttonID];
    if (gamepad) {
        const buttons = gamepad.buttons;
        const button = buttons[buttonID];
        return button.value > 0;
    }
    return false;
}

function updateController() {
    if(controllerConnected()) {
        if(controllerIndex != null) {
            const gamepad = navigator.getGamepads()[controllerIndex];
            handleSticks(gamepad.axes);
            handleButtons(gamepad.buttons);
        }
    }
}