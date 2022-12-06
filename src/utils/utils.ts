import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/constants'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
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
