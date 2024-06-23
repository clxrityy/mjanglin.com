import { astrologySignHandler, astrologyHoroscopeHandler, birthdayCountdown, birthdaySet, birthdayView, birthdayWishList, birthdayWishSend } from "./general";

import { adminRoleConfigHandler, changeableConfigHandler, viewConfigHandler } from "./admin";

const generalCommandHandlers = {
    astrologySignHandler, birthdayCountdown, birthdaySet,
    birthdayView, astrologyHoroscopeHandler,
    birthdayWishSend, birthdayWishList
}

const adminCommandHandlers = {
    viewConfigHandler,
    changeableConfigHandler,
    adminRoleConfigHandler
}

export {
    adminCommandHandlers, generalCommandHandlers
};
