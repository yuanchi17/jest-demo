const _ = require('lodash')

const ROMAN_NUM = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
}

exports.getSub = (rA, rB) => {
  return exports.numToRoman(Math.abs(exports.romanToNum(rA) - exports.romanToNum(rB)))
}

exports.romanToNum = roman => {
  let sum = 0
  const nArray = _.map(roman, r => ROMAN_NUM[r]) // 將羅馬數字轉為數字陣列
  for (let i = 0; i < nArray.length; i++) {
    // 判斷加減
    if ((i < nArray.length - 1) && (nArray[i] < nArray[i + 1])) {
      sum += (nArray[i + 1] - nArray[i])
      i++
      continue
    }
    sum += nArray[i]
  }
  return sum
}

exports.numToRoman = num => {
  const ans = []
  const romanUnit = ['M', 'C', 'X', 'I'] // 千百十個
  const romanNight = ['CM', 'XC', 'IX'] // 900, 90, 9
  const romanFive = ['D', 'L', 'V'] // 500, 50, 5
  const romanFour = ['CD', 'XL', 'IV'] // 400, 40, 4
  const strNum = _.padStart(_.toString(num), 4, '0')

  if (num === 0) return 'ZERO'
  for (const i in strNum) {
    const rNum = _.toInteger(strNum[i])
    if (strNum[i] === '0') continue
    if (rNum === 4) {
      ans.push(romanFour[i - 1])
      continue
    } else if (rNum === 9) {
      ans.push(romanNight[i - 1])
      continue
    } else if (rNum >= 5) {
      const remainder = strNum[i] % 5
      const pad = remainder ? _.padStart(romanUnit[i], remainder, romanUnit[i]) : ''
      ans.push(romanFive[i - 1] + pad)
      continue
    }

    ans.push(_.padStart(romanUnit[i], strNum[i], romanUnit[i]))
  }

  return ans.join('')
}
