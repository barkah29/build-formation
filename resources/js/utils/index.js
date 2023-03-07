export function strBeforeNumber(string, num) {
    const array = Array.from(String(num));
    return array.map((item, i) => (i ? `${string}${item}` : item));
}
