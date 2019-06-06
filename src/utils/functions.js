export const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);

export const getPercent = (total, value) => {
    return Math.round(((value/total) * 100));
}

export const moneyFormate = (value) => {
    return Math.abs(Number(value)) >= 1.0e+9

    ? Math.abs(Number(value)) / 1.0e+9 + "B"

    : Math.abs(Number(value)) >= 1.0e+6

    ? Math.abs(Number(value)) / 1.0e+6 + "M"

    : Math.abs(Number(value)) >= 1.0e+3

    ? Math.abs(Number(value)) / 1.0e+3 + "K"

    : Math.abs(Number(value));
}