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

exports.getAns = (rA, rB) => {
  try {
    const ERR_TEXT = '請輸入正確並小於 4000 的羅馬數字'
    if (/[^MCXIDLV]/.test(rA) || rA === 'MMMM') throw ERR_TEXT
    if (/[^MCXIDLV]/.test(rB) || rB === 'MMMM') throw ERR_TEXT
    return exports.numToRoman(exports.getAbs(rA, rB))
  } catch (err) {
    return err
  }
}

exports.getAbs = (rA, rB) => {
  return Math.abs(exports.romanToNum(rA) - exports.romanToNum(rB))
}

exports.romanToNum = roman => {
  const sumTmp = []
  const nArray = _.map(roman, r => ROMAN_NUM[r]) // 將羅馬數字轉為數字陣列
  for (let i = 0; i < nArray.length; i++) {
    // 判斷加減
    if (nArray[i] < nArray[i + 1]) {
      sumTmp.push(Math.abs(nArray[i] - nArray[i + 1]))
      i++
      continue
    }
    sumTmp.push(nArray[i])
  }
  return _.sum(sumTmp)
}

exports.numToRoman = num => { // 解法 1
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

  let ansRoman = ''
  _.each(ans, r => { ansRoman += r })
  return ansRoman
}
