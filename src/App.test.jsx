import { calculateBurnRate } from './App';
import { expect, test } from 'vitest'

test('30d-slow', () => {
  const result = calculateBurnRate(30, 0.10, 1440);
  expect(result).toBe(3);
});

test('30d-mid', () => {
  const result = calculateBurnRate(30, 0.05, 360);
  expect(result).toEqual(6);
});

test('30d-fast', () => {
  const result = calculateBurnRate(30, 0.02, 60);
  expect(result).toEqual(14.4);
});

test('7d-slow', () => {
  const result = calculateBurnRate(7, 0.40, 1440);
  expect(result).toBeCloseTo(2.8, 4);
});

test('7d-mid', () => {
  const result = calculateBurnRate(7, 0.20, 360);
  expect(result).toBeCloseTo(5.6, 4);
});

test('7d-fast', () => {
  const result = calculateBurnRate(7, 0.10, 60);
  expect(result).toBeCloseTo(16.8, 4);
});
