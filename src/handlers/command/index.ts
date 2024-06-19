import { astrologySignHandler, astrologyHoroscopeHandler, birthdayCountdown, birthdaySet, birthdayView } from "./general";

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
