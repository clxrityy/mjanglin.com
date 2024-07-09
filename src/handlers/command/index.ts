import { astrologySignHandler, astrologyHoroscopeHandler, birthdayCountdown, birthdaySet, birthdayView, birthdayWishList, birthdayWishSend, avatarHandler, helpHandler, astrologyCompatibilityHandler, holidays } from "./general";

import { adminRoleConfigHandler, changeableConfigHandler, viewConfigHandler, embedHandler, birthdayRoleConfigHandler, birthdayMessageConfigHandler, hbdHandler } from "./admin";

const generalCommandHandlers = {
    astrologySignHandler, birthdayCountdown, birthdaySet,
    birthdayView, astrologyHoroscopeHandler,
    birthdayWishSend, birthdayWishList, avatarHandler, helpHandler, astrologyCompatibilityHandler, holidays
}

const adminCommandHandlers = {
    viewConfigHandler,
    changeableConfigHandler,
    adminRoleConfigHandler,
    embedHandler, birthdayRoleConfigHandler, birthdayMessageConfigHandler, hbdHandler
}

export {
    adminCommandHandlers, generalCommandHandlers
};
