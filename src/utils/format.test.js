import { formatMinutes } from './format'
import { expect, test } from 'vitest'

test('should format minutes into days and hours without remainder', () => {
  expect(formatMinutes(120, false)).toBe('2h')
  expect(formatMinutes(1440, false)).toBe('1d')
})

test('should format minutes into days and hours', () => {
  expect(formatMinutes(0)).toBe('0m')
  expect(formatMinutes(5)).toBe('5m')
  expect(formatMinutes(30)).toBe('30m')
  expect(formatMinutes(45)).toBe('45m')
  expect(formatMinutes(60)).toBe('1h')
  expect(formatMinutes(120)).toBe('2h')
  expect(formatMinutes(125)).toBe('2h5m')
  expect(formatMinutes(360)).toBe('6h')
  expect(formatMinutes(1500)).toBe('1d1h')
  expect(formatMinutes(1440)).toBe('1d')
  expect(formatMinutes(1440*3+1)).toBe('3d1m')
  expect(formatMinutes(1440*3+61)).toBe('3d1h1m')
})

