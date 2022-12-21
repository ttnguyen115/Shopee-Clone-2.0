import axios, { AxiosError } from 'axios'

import userCircleSvg from 'src/assets/user-circle.svg'

import { HttpStatusCode } from 'src/constants'
import type { ErrorResponse } from 'src/types/utils'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
}

export function currencyFormatter(value: number): string {
  return new Intl.NumberFormat('de-DE').format(value)
}

export function formatNumberToSocialStyle(value: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function saleRate(originalPrice: number, salePrice: number): string {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100).toString() + '%'
}

const removeSpecialCharacter = (str: string): string =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, _id }: { name: string; _id: string }): string => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${_id}`
}

export const getIdFromNameId = (nameId: string): string => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string): string =>
  avatarName ? `${import.meta.env.VITE_BASE_URL}images/${avatarName}` : userCircleSvg
