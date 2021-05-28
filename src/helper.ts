import { ColumnProps } from './store'

export function generateFitUrl(
  column: ColumnProps,
  width: number,
  height: number
): void {
  if (column.avatar) {
    column.avatar.fitUrl =
      column.avatar.url +
      `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`
  } else {
    column.avatar = {
      fitUrl: require('@/assets/column.jpg')
    }
  }
}

interface CheckCondition {
  format?: string[]
  size?: number
}

type ErrorType = 'size' | 'format' | null

// eslint-disable-next-line
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? file.size / 1024 / 1024 < size : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

// eslint-disable-next-line
export const arrToObj = <T extends { _id?: string }>(arr: T[]) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}

export const objToArr = <T>(obj: { [key: string]: T }): T[] => {
  return Object.values(obj)
}
