import { format, isToday, isYesterday } from 'date-fns';

type TDateFormat = {
    timezone: 'Moscow',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: "short",
}

export const dateOfOrder = (date: Date) => {
    if (isToday(date)) {
        return 'Сегодня'
    } else if (isYesterday(date)) {
        return 'Вчера'
    } else {
        return format((date), 'MM.dd.yyyy');
    }
}

export const dateFormat = (date: string) => {
    const settings: TDateFormat = {
        timezone: 'Moscow',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: "short",
    }

    return new Date(Date.parse(date)).toLocaleString("ru", settings)
}


export const formatOrderDate = (date: string): string => {
    const CurrentDate = dateOfOrder(new Date(date));

    return `${CurrentDate}, ${dateFormat(date)}`;
};