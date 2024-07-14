export function mapDataByWeekday(data: { date: Date, value: number }[]) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    type WeekdayData = {
        day: typeof weekdays[number],
        values: number[]
    }

    let weekdayData: WeekdayData[] = [];
    
    data.forEach(d => {
        let day = weekdays[d.date.getDay()];

        let existing = weekdayData.find(r => r.day === day);

        if (existing) {
            existing.values.push(d.value);
        } else {
            weekdayData.push({ day, values: [d.value]});
        }
    });

    let result: {
        day: string,
        value: number
    }[] = [];

    weekdayData.map(({ day, values }) => {
        const sum = values.reduce((a, b) => a + b, 0);
        result.push({ day, value: sum });
    });

    return result;
}

