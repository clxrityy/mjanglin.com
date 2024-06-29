import { astrologySignHandler, astrologyHoroscopeHandler, birthdayCountdown, birthdaySet, birthdayView, birthdayWishList, birthdayWishSend, avatarHandler, helpHandler, astrologyCompatibilityHandler } from "./general";

import { adminRoleConfigHandler, changeableConfigHandler, viewConfigHandler, embedHandler } from "./admin";

const generalCommandHandlers = {
    astrologySignHandler, birthdayCountdown, birthdaySet,
    birthdayView, astrologyHoroscopeHandler,
    birthdayWishSend, birthdayWishList, avatarHandler, helpHandler, astrologyCompatibilityHandler
}

const adminCommandHandlers = {
    viewConfigHandler,
    changeableConfigHandler,
    adminRoleConfigHandler,
    embedHandler
}

export {
    adminCommandHandlers, generalCommandHandlers
};
