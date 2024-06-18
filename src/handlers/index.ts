import astrologySignHandler from "./general/astrology/sign";
import birthdayCountdown from "./general/birthday/countdown";
import birthdaySet from "./general/birthday/set";
import birthdayView from "./general/birthday/view";

import { viewConfigHandler, changeableConfigHandler } from "./admin";

const generalHandlers = {
    astrologySignHandler, birthdayCountdown, birthdaySet,
    birthdayView
}

const adminHandlers = {
    viewConfigHandler,
    changeableConfigHandler
}

export {
    generalHandlers,
    adminHandlers
}