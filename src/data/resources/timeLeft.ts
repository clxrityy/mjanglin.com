export function timeLeft(month: number, day: number): number {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;

    if (currentMonth === month) {
        if (currentDay < day) {
            return day - currentDay;
        } else if (currentDay > day) {
            let daysInCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
            let daysAfterToday = daysInCurrentMonth - currentDay;
            let daysUntilEndOfYear = 0;
            for (let i = currentMonth + 1; i <= 12; i++) {
                daysUntilEndOfYear += new Date(currentDate.getFullYear(), i, 0).getDate();
            }
            let daysInNextYearUntilBirthMonth = 0;
            for (let i = 1; i < month; i++) {
                daysInNextYearUntilBirthMonth += new Date(currentDate.getFullYear() + 1, i, 0).getDate();
            }

            return daysAfterToday + daysUntilEndOfYear + daysInNextYearUntilBirthMonth + day;
        } else {
            return 0; // Birthday is today
        }
    } else {
        let daysLeft = 0;

        if (currentMonth < month) {
            for (let i = currentMonth; i < month; i++) {
                daysLeft += new Date(currentDate.getFullYear(), i, 0).getDate();
            }
        } else {
            for (let i = currentMonth; i <= 12; i++) {
                daysLeft += new Date(currentDate.getFullYear(), i, 0).getDate();
            }
            for (let i = 1; i < month; i++) {
                daysLeft += new Date(currentDate.getFullYear() + 1, i, 0).getDate();
            }
        }

        return daysLeft - currentDay + day;
    }
}