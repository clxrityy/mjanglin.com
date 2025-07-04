import viewConfigHandler from "./view";
import adminRoleConfigHandler from "./set/admin_role";
import changeableConfigHandler from "./set/changeable";
import birthdayMessageConfigHandler from "./set/birthday_message";
import birthdayRoleConfigHandler from "./set/birthday_role";
import birthdayChannelConfigHandler from "./set/birthday_channel";


export const configHandlers = {
    view: viewConfigHandler,
    set: {
        adminRole: adminRoleConfigHandler,
        changeable: changeableConfigHandler,
        birthdayMessage: birthdayMessageConfigHandler,
        birthdayRole: birthdayRoleConfigHandler,
        birthdayChannelId: birthdayChannelConfigHandler
    }
}