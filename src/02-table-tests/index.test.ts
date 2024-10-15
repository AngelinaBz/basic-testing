// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 4, b: 1, action: Action.Subtract, expected: 3 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'invalid', expected: null },
  { a: 'two', b: 3, action: Action.Add, expected: null },
  { a: 7, b: 0, action: Action.Divide, expected: Infinity },
  { a: -2, b: 3, action: Action.Multiply, expected: -6 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly calculate $action of $a and $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
