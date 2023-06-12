/**
 * Creates a delay for the specified amount of time using a Promise.
 * @param {number} time - The duration of the delay in milliseconds.
 * @returns {Promise<number>} - A Promise that resolves after the specified delay time with a value of 1.
 */
export const delay = (time: number): Promise<number> =>
    new Promise((res) => {
        setTimeout(() => res(1), time)
    })
