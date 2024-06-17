import { Colors } from "@/types/constants";

type SignName = "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo" | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

type SignColor = Colors.RED | Colors.DARK_GREEN | Colors.YELLOW | Colors.LIGHT_GREY | Colors.GOLD | Colors.DARK_GOLD | Colors.LUMINOUS_VIVID_PINK | Colors.NOT_QUITE_BLACK | Colors.PURPLE | Colors.DARKER_GREY | Colors.BLUE | Colors.GREEN;

export type Sign = {
    name: SignName;
    symbol: string;
    startDate: string;
    endDate: string;
    color: SignColor;
}

export const getZodiacSign = (month: number, day: number): Sign => {

    let sign: Sign = {
        symbol: "",
        name: "Taurus",
        startDate: "",
        endDate: "",
        color: Colors.DARK_GREEN
    }

    switch (month) {
        case 1:
            if (day >= 20) {
                sign = {
                    symbol: "♒",
                    name: "Aquarius",
                    startDate: "1/20",
                    endDate: "2/18",
                    color: Colors.BLUE
                }
            } else {
                sign = {
                    symbol: "♑",
                    name: "Capricorn",
                    startDate: "12/22",
                    endDate: "1/19",
                    color: Colors.DARKER_GREY
                }
            }
            break;
        case 2:
            if (day >= 19) {
                sign = {
                    symbol: "♓",
                    name: "Pisces",
                    startDate: "2/19",
                    endDate: "3/20",
                    color: Colors.GREEN
                }
            } else {
                sign = {
                    symbol: "♒",
                    name: "Aquarius",
                    startDate: "1/20",
                    endDate: "2/18",
                    color: Colors.BLUE
                }
            }
            break;
        case 3:
            if (day >= 20) {
                sign = {
                    symbol: "♈️",
                    name: "Aries",
                    startDate: "3/21",
                    endDate: "4/19",
                    color: Colors.RED
                }
            } else {
                sign = {
                    symbol: "♓",
                    name: "Pisces",
                    startDate: "2/19",
                    endDate: "3/20",
                    color: Colors.GREEN
                }
            }
            break;
        case 4:
            if (day >= 20) {
                sign = {
                    symbol: "♉️",
                    name: "Taurus",
                    startDate: "4/20",
                    endDate: "5/20",
                    color: Colors.DARK_GREEN
                }
            } else {
                sign = {
                    symbol: "♈️",
                    name: "Aries",
                    startDate: "3/21",
                    endDate: "4/19",
                    color: Colors.RED
                }
            }
            break;
        case 5:
            if (day >= 21) {
                sign = {
                    symbol: "♊️",
                    name: "Gemini",
                    startDate: "5/21",
                    endDate: "6/21",
                    color: Colors.YELLOW
                }
            } else {
                sign = {
                    symbol: "♉️",
                    name: "Taurus",
                    startDate: "4/20",
                    endDate: "5/20",
                    color: Colors.DARK_GREEN
                }
            }
            break;
        case 6:
            if (day >= 22) {
                sign = {
                    symbol: "♋",
                    name: "Cancer",
                    startDate: "6/22",
                    endDate: "7/22",
                    color: Colors.LIGHT_GREY
                }
            } else {
                sign = {
                    symbol: "♊️",
                    name: "Gemini",
                    startDate: "5/21",
                    endDate: "6/21",
                    color: Colors.YELLOW
                }
            }
            break;
        case 7:
            if (day >= 23) {
                sign = {
                    symbol: "♌",
                    name: "Leo",
                    startDate: "7/23",
                    endDate: "8/22",
                    color: Colors.GOLD
                }
            } else {
                sign = {
                    symbol: "♋",
                    name: "Cancer",
                    startDate: "6/22",
                    endDate: "7/22",
                    color: Colors.LIGHT_GREY
                }
            }
            break;
        case 8:
            if (day >= 23) {
                sign = {
                    symbol: "♍",
                    name: "Virgo",
                    startDate: "8/23",
                    endDate: "9/22",
                    color: Colors.DARK_GOLD
                }
            } else {
                sign = {
                    symbol: "♌",
                    name: "Leo",
                    startDate: "7/23",
                    endDate: "8/22",
                    color: Colors.GOLD
                }
            }
            break;
        case 9:
            if (day >= 23) {
                sign = {
                    symbol: "♎",
                    name: "Libra",
                    startDate: "9/23",
                    endDate: "10/23",
                    color: Colors.LUMINOUS_VIVID_PINK
                }
            } else {
                sign = {
                    symbol: "♍",
                    name: "Virgo",
                    startDate: "8/23",
                    endDate: "9/22",
                    color: Colors.DARK_GOLD
                }
            }
            break;
        case 10:
            if (day >= 24) {
                sign = {
                    symbol: "♏",
                    name: "Scorpio",
                    startDate: "10/24",
                    endDate: "11/21",
                    color: Colors.NOT_QUITE_BLACK
                }
            } else {
                sign = {
                    symbol: "♎",
                    name: "Libra",
                    startDate: "9/23",
                    endDate: "10/23",
                    color: Colors.LUMINOUS_VIVID_PINK
                }
            }
            break;
        case 11:
            if (day >= 22) {
                sign = {
                    symbol: "♐",
                    name: "Sagittarius",
                    startDate: "11/22",
                    endDate: "12/21",
                    color: Colors.PURPLE
                }
            } else {
                sign = {
                    symbol: "♏",
                    name: "Scorpio",
                    startDate: "10/24",
                    endDate: "11/21",
                    color: Colors.NOT_QUITE_BLACK
                }
            }
            break;
        case 12:
            if (day >= 22) {
                sign = {
                    symbol: "♑",
                    name: "Capricorn",
                    startDate: "12/22",
                    endDate: "1/19",
                    color: Colors.DARKER_GREY
                }
            } else {
                sign = {
                    symbol: "♐",
                    name: "Sagittarius",
                    startDate: "11/22",
                    endDate: "12/21",
                    color: Colors.PURPLE
                }
            }
            break;
    }

    return sign;
}