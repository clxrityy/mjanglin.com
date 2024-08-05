import birthdayCountdown from './countdown';
import birthdaySet from './set';
import birthdayView from './view';
import { birthdayWishList, birthdayWishSend } from './wish';

export const birthdayHandlers = {
    countdown: birthdayCountdown,
    set: birthdaySet,
    view: birthdayView,
    wish: {
        list: birthdayWishList,
        send: birthdayWishSend
    }
}