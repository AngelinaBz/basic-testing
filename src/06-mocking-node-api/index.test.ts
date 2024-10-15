// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import promises from 'fs/promises';
import path from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockPath = 'file.txt';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const mockJoin = path.join as jest.MockedFunction<typeof path.join>;
    mockJoin.mockReturnValue('/path');
    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockReturnValue(false);
    await readFileAsynchronously(mockPath);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    const mockJoin = path.join as jest.MockedFunction<typeof path.join>;
    mockJoin.mockReturnValue('/path');
    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockReturnValue(false);
    const result = await readFileAsynchronously(mockPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockJoin = path.join as jest.MockedFunction<typeof path.join>;
    mockJoin.mockReturnValue('/path');
    const fileContent = 'Text';
    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockReturnValue(true);
    (promises.readFile as jest.MockedFunction<typeof promises.readFile>).mockResolvedValue(Buffer.from(fileContent));
    const result = await readFileAsynchronously(mockPath);
    expect(result).toBe(fileContent);
  });
});
