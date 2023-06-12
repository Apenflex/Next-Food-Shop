interface FetcherParams {
    url: string
    method: string
    body?: object
    json?: boolean
}
interface SignUpParams {
    name: string
    email: string
    password: string
}
interface SignInParams {
    email: string
    password: string
}
interface ResetPasswordParams {
    email: string
    newPassword: string
    code: string
}
interface SendEmailParams {
    email: string
}
const fetcher = async ({ url, method, body, json = true }: FetcherParams) => {
    const res = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    // console.log(res)
    if (!res.ok) {
        throw new Error(await res.text())
    }

    const data = json ? await res.json() : null
    return data
}
/**
 * Sends a POST request to the '/api/signup' endpoint with the provided user data to sign up a new user.
 * @param {SignUpParams} user - The user data for sign up.
 * @returns {Promise<Response>} - The response from the API request.
 */
export const signup = (user: SignUpParams): Promise<Response> => {
    return fetcher({ url: '/api/signup', method: 'post', body: user })
}

/**
 * Sends a POST request to the '/api/signin' endpoint with the provided user data to sign in a user.
 * @param {SignInParams} user - The user data for sign in.
 * @returns {Promise<Response>} - The response from the API request.
 */
export const signin = (user: SignInParams): Promise<Response> => {
    return fetcher({ url: '/api/signin', method: 'post', body: user })
}

/**
 * Sends a POST request to the '/api/logout' endpoint to log out a user.
 * @returns {Promise<Response>} - The response from the API request.
 */
export const logout = (): Promise<Response> => {
    return fetcher({ url: '/api/logout', method: 'post' })
}

/**
 * Sends a GET request to the '/api/user' endpoint to get the current user.
 * @param {SendEmailParams} email - The email of the user to send the recovery code to.
 * @returns {Promise<Response>} - The response from the API request.
 */
export const sendRecoverCode = (email: SendEmailParams): Promise<Response> => {
    return fetcher({ url: '/api/sendrecovercode', method: 'post', body: email, json: false })
}

/**
 * Sends a PUT request to the '/api/resetpassword' endpoint to reset the user's password.
 * @param {ResetPasswordParams} user - The user data for resetting the password.
 * @returns {Promise<Response>} - The response from the API request.
 */
export const resetPassword = (user: ResetPasswordParams): Promise<Response> => {
    return fetcher({ url: '/api/resetpassword', method: 'put', body: user })
}
