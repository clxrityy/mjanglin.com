import { astrologyHandlers, birthdayHandlers, avatarHandler, helpHandler, holidays, friendHandlers } from "./general";

import { configHandlers, embedHandler,  hbdHandler } from "./admin";

const generalCommandHandlers = {
    astrologyHandlers, birthdayHandlers, avatarHandler, helpHandler, holidays, friendHandlers
}

const adminCommandHandlers = {
    configHandlers,
    embedHandler, hbdHandler
}

export {
    adminCommandHandlers, generalCommandHandlers
};
