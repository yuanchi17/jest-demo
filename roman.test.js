/* eslint-env mocha */
const roman = require('./roman')

/**
 * 實作
 * - 羅馬 to 數字
 * - 數字 to 羅馬
 * - 減法（有 mock）
 * - 減法（沒有 mock）
 */

describe('羅馬數字減法運算', () => {
  test.each([
    ['I', 1],
    ['II', 2],
    ['III', 3],
    ['IV', 4],
    ['V', 5],
    ['VI', 6],
    ['VII', 7],
    ['VIII', 8],
    ['IX', 9],
    ['X', 10],
    ['XL', 40],
    ['L', 50],
    ['XC', 90],
    ['C', 100],
    ['CD', 400],
    ['D', 500],
    ['CM', 900],
    ['M', 1000],
  ])('羅馬數字 %s 應該要轉為數字 %i', (r, expected) => {
    // assert
    expect(roman.romanToNum(r)).toBe(expected)
  })

  test.each([
    [0, 'ZERO'],
    [1, 'I'],
    [2, 'II'],
    [3, 'III'],
    [4, 'IV'],
    [5, 'V'],
    [6, 'VI'],
    [7, 'VII'],
    [8, 'VIII'],
    [9, 'IX'],
    [10, 'X'],
    [40, 'XL'],
    [50, 'L'],
    [90, 'XC'],
    [100, 'C'],
    [400, 'CD'],
    [500, 'D'],
    [900, 'CM'],
    [1000, 'M'],
    [3999, 'MMMCMXCIX'],
  ])('數字 %i 應該要轉為羅馬數字 %s', (n, expected) => {
    // assert
    expect(roman.numToRoman(n)).toBe(expected)
  })

  test('getAbs 應該要執行減法（mock版）', () => {
    // arrange
    roman._romanToNum = roman.romanToNum
    roman.romanToNum = jest.fn().mockReturnValueOnce(2000).mockReturnValueOnce(2)
    Math._abs = Math.abs
    Math.abs = jest.fn()

    // act
    roman.getAbs('', '')

    // assert
    expect(roman.romanToNum.mock.calls).toHaveLength(2) // 確認 romanToNum 有執行 2 次減法
    expect(Math.abs.mock.calls).toHaveLength(1) // 確認 Math.abs 有執行 1 次
    expect(Math.abs).toHaveBeenCalledWith(1998)
    // expect(Math.abs.mock.calls[0][0]).toBe(1998)

    // 場復
    roman.romanToNum = roman._romanToNum
    Math.abs = Math._abs
  })
  test('getAns 應該要執行「數字轉羅馬數字」（mock版）', () => {
    // arrange
    roman._numToRoman = roman.numToRoman
    roman.numToRoman = jest.fn()
    roman._getAbs = roman.getAbs
    roman.getAbs = jest.fn().mockReturnValueOnce(1998)

    // act
    roman.getAns('', '')

    // assert
    expect(roman.getAbs.mock.calls).toHaveLength(1) // 確認有執行 1 次
    expect(roman.numToRoman.mock.calls).toHaveLength(1) // 確認 numToRoman 有執行 1 次
    expect(roman.numToRoman).toHaveBeenCalledWith(1998)

    // 場復
    roman.getAbs = roman._getAbs
    roman.numToRoman = roman._numToRoman
  })

  test.each([
    ['I', 'I', 0],
    ['I', 'X', 9],
    ['MM', 'II', 1998],
  ])('羅馬數字 %s, %s 相減取絕對值應該要等於數字 %i', (rA, rB, expected) => {
    // assert
    expect(roman.getAbs(rA, rB)).toBe(expected)
  })

  test.each([
    ['I', 'I', 'ZERO'],
    ['I', 'X', 'IX'],
    ['MM', 'II', 'MCMXCVIII'],
  ])('羅馬數字 %s, %s 相減取絕對值應該要等於羅馬數字 %s', (rA, rB, expected) => {
    // assert
    expect(roman.getAns(rA, rB)).toBe(expected)
  })
})
