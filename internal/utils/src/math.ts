/**
 * 求序列的乘积。
 */
export function product(arr: bigint[]): bigint {
    return arr.reduce((prev, curr) => prev * curr, BigInt(1));
}

export function abs(n: bigint) {
    return n >= 0n ? n : -n;
}
