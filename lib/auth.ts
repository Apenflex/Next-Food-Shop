import bcrypt from 'bcrypt'
import { jwtVerify, SignJWT } from 'jose'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import prisma from '@/prisma/client'

interface User {
    id: any
    createdAt?: Date
    updatedAt?: Date
    email: any
    password?: string
    name?: string | null
    recoverCode?: string | null
}

export const hashPassword = async (password: string | Buffer) => await bcrypt.hash(password, 10)
export const comparePasswords = async (plainTextPassword, hashPassword) => await bcrypt.compare(plainTextPassword, hashPassword)

export const hashRecoverCode = async (code: string | Buffer) => await bcrypt.hash(code, 10)
export const compareRecoverCodes = async (plainTextCode, hashRecoverCode) => await bcrypt.compare(plainTextCode, hashRecoverCode)

export const createJWT = (user: User) => {
    try {
        const iat = Math.floor(Date.now() / 1000)
        const exp = iat + 60 * 60 * 24 * 7

        const payload = { id: user.id, email: user.email }
        const protectedHeader = { alg: 'HS256', typ: 'JWT' }
        const privateKey = new TextEncoder().encode(process.env.JWT_SECRET)
        const jwt = new SignJWT({ payload }).setProtectedHeader(protectedHeader).setExpirationTime(exp).setIssuedAt(iat).setNotBefore(iat).sign(privateKey)

        return jwt
    } catch (error) {
        throw new Error(`Error creating JWT: ${error.message}`)
    }
}

export const validateJWT = async (jwt: string | Uint8Array) => {
    try {
        const privateKey = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(jwt, privateKey)

        return payload.payload as any
    } catch (error) {
        throw new Error(`Error validating JWT: ${error.message}`)
    }
}
/**
 * Retrieves a user object from a cookie.
 * @param cookies - The cookies object.
 * @returns
 */
export const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
    const jwt = cookies.get(process.env.COOKIE_NAME || 'jwt')

    if (!jwt) {
        return null
    }

    const { id } = await validateJWT(jwt.value)

    const user = await prisma.user.findUnique({
        where: {
            id: id as string,
        },
    })
    return user
}
