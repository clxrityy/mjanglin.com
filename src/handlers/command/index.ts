import astrologySignHandler from "./general/astrology/sign";
import astrologyHoroscopeHandler from "./general/astrology/horoscope";
import birthdayCountdown from "./general/birthday/countdown";
import birthdaySet from "./general/birthday/set";
import birthdayView from "./general/birthday/view";

import { adminRoleConfigHandler, changeableConfigHandler, viewConfigHandler } from "./admin";

const generalCommandHandlers = {
    astrologySignHandler, birthdayCountdown, birthdaySet,
    birthdayView, astrologyHoroscopeHandler
}

const adminCommandHandlers = {
    viewConfigHandler,
    changeableConfigHandler,
    adminRoleConfigHandler
}

export {
    adminCommandHandlers, generalCommandHandlers
};
