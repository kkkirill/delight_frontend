export const storage = {
    get: item => JSON.parse(localStorage.getItem(item)),
    set: (item, value) => localStorage.setItem(item, JSON.stringify(value)),
    has: item => !!localStorage.getItem(item),
};

export const transformTime = (length) => {
    const minutesLength = Math.floor(length / 60)
    const secondsLeftOfLength = length - minutesLength * 60;

    return minutesLength + ":" + secondsLeftOfLength.toString().padStart(2, '0');
}