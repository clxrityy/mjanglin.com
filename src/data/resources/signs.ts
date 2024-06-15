type SignName = "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo" | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export type Sign = {
    name: SignName;
    symbol: string;
    startDate: string;
    endDate: string;
}

export const getZodiacSign = (month: number, day: number): Sign => {

    let sign: Sign = {
        symbol: "",
        name: "Taurus",
        startDate: "",
        endDate: ""
    }

    switch (month) {
        case 1:
            if (day >= 20) {
                sign = {
                    symbol: "♒",
                    name: "Aquarius",
                    startDate: "1/20",
                    endDate: "2/18"
                }
            } else {
                sign = {
                    symbol: "♑",
                    name: "Capricorn",
                    startDate: "12/22",
                    endDate: "1/19"
                }
            }
            break;
        case 2:
            if (day >= 19) {
                sign = {
                    symbol: "♓",
                    name: "Pisces",
                    startDate: "2/19",
                    endDate: "3/20"
                }
            } else {
                sign = {
                    symbol: "♒",
                    name: "Aquarius",
                    startDate: "1/20",
                    endDate: "2/18"
                }
            }
            break;
        case 3:
            if (day >= 20) {
                sign = {
                    symbol: "♈️",
                    name: "Aries",
                    startDate: "3/21",
                    endDate: "4/19"
                }
            } else {
                sign = {
                    symbol: "♓",
                    name: "Pisces",
                    startDate: "2/19",
                    endDate: "3/20"
                }
            }
            break;
        case 4:
            if (day >= 20) {
                sign = {
                    symbol: "♉️",
                    name: "Taurus",
                    startDate: "4/20",
                    endDate: "5/20"
                }
            } else {
                sign = {
                    symbol: "♈️",
                    name: "Aries",
                    startDate: "3/21",
                    endDate: "4/19"
                }
            }
            break;
        case 5:
            if (day >= 21) {
                sign = {
                    symbol: "♊️",
                    name: "Gemini",
                    startDate: "5/21",
                    endDate: "6/21"
                }
            } else {
                sign = {
                    symbol: "♉️",
                    name: "Taurus",
                    startDate: "4/20",
                    endDate: "5/20"
                }
            }
            break;
        case 6:
            if (day >= 22) {
                sign = {
                    symbol: "♋",
                    name: "Cancer",
                    startDate: "6/22",
                    endDate: "7/22"
                }
            } else {
                sign = {
                    symbol: "♊️",
                    name: "Gemini",
                    startDate: "5/21",
                    endDate: "6/21"
                }
            }
            break;
        case 7:
            if (day >= 23) {
                sign = {
                    symbol: "♌",
                    name: "Leo",
                    startDate: "7/23",
                    endDate: "8/22"
                }
            } else {
                sign = {
                    symbol: "♋",
                    name: "Cancer",
                    startDate: "6/22",
                    endDate: "7/22"
                }
            }
            break;
        case 8:
            if (day >= 23) {
                sign = {
                    symbol: "♍",
                    name: "Virgo",
                    startDate: "8/23",
                    endDate: "9/22"
                }
            } else {
                sign = {
                    symbol: "♌",
                    name: "Leo",
                    startDate: "7/23",
                    endDate: "8/22"
                }
            }
            break;
        case 9:
            if (day >= 23) {
                sign = {
                    symbol: "♎",
                    name: "Libra",
                    startDate: "9/23",
                    endDate: "10/23"
                }
            } else {
                sign = {
                    symbol: "♍",
                    name: "Virgo",
                    startDate: "8/23",
                    endDate: "9/22"
                }
            }
            break;
        case 10:
            if (day >= 24) {
                sign = {
                    symbol: "♏",
                    name: "Scorpio",
                    startDate: "10/24",
                    endDate: "11/21"
                }
            } else {
                sign = {
                    symbol: "♎",
                    name: "Libra",
                    startDate: "9/23",
                    endDate: "10/23"
                }
            }
            break;
        case 11:
            if (day >= 22) {
                sign = {
                    symbol: "♐",
                    name: "Sagittarius",
                    startDate: "11/22",
                    endDate: "12/21"
                }
            } else {
                sign = {
                    symbol: "♏",
                    name: "Scorpio",
                    startDate: "10/24",
                    endDate: "11/21"
                }
            }
            break;
        case 12:
            if (day >= 22) {
                sign = {
                    symbol: "♑",
                    name: "Capricorn",
                    startDate: "12/22",
                    endDate: "1/19"
                }
            } else {
                sign = {
                    symbol: "♐",
                    name: "Sagittarius",
                    startDate: "11/22",
                    endDate: "12/21"
                }
            }
            break;
    }

    return sign;
}