import { SignJWT, jwtVerify } from 'jose'
import Cookies from 'js-cookie'
import { axiosInstance } from './axios'
import { AUTH_PATH } from '../utils/constants/paths'
import { changeLoginModalType } from '../store/action/login-modal'

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY
// if (!secretKey) {
//   throw new Error('NEXT_PUBLIC_JWT_SECRET_KEY is not set')
// }

const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // Set to your preferred expiration time
    .sign(key)
}

export async function decrypt(token: string) {
  const { payload } = await jwtVerify(token, key)
  return payload
}

export async function createSession(token: string) {
  Cookies.set('session', token, {
    expires: 1 / 24, // 1 hour
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
}

export async function getSession() {
  const token = Cookies.get('session')
  if (!token) return null
  try {
    return token
  } catch (error) {
    return null
  }
}

export function removeSession() {
  Cookies.remove('session')
}
// ----------------------------------------------------------------------

interface JwtPayload {
  exp: number
  [key: string]: any
}

// ----------------------------------------------------------------------

function decodeToken(token: string): JwtPayload {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )

  return JSON.parse(jsonPayload)
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string | null): boolean => {
  if (!accessToken) {
    return false
  }

  const decoded: JwtPayload = decodeToken(accessToken)
  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number): void => {
  let expiredTimer: NodeJS.Timeout | string | number | undefined

  const currentTime = Date.now()
  const timeLeft = exp * 1000 - currentTime

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    alert('Token expired')

    localStorage.removeItem('auth-data')
    changeLoginModalType("MOBILE_INPUT")
    window.location.href = AUTH_PATH.LOGIN_PATH
  }, timeLeft)
}

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    const { exp } = decodeToken(accessToken) // ~3 days by minimal server
    tokenExpired(exp)
  } else {
    localStorage.removeItem('accessToken')

    delete axiosInstance.defaults.headers.common.Authorization
  }
}
