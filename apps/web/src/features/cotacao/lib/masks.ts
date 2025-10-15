export function applyMask(value: string, maskPattern?: string): string {
  if (!maskPattern) return value

  let maskedValue = ''
  let valueIndex = 0

  const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '')

  for (
    let i = 0;
    i < maskPattern.length && valueIndex < cleanValue.length;
    i++
  ) {
    const maskChar = maskPattern[i]
    const inputChar = cleanValue[valueIndex]

    if (maskChar === '9') {
      if (/\d/.test(inputChar)) {
        maskedValue += inputChar
        valueIndex++
      } else {
        break
      }
    } else if (maskChar === 'A' || maskChar === 'a') {
      if (/[a-zA-Z]/.test(inputChar)) {
        maskedValue +=
          maskChar === 'A' ? inputChar.toUpperCase() : inputChar.toLowerCase()
        valueIndex++
      } else {
        break
      }
    } else if (maskChar === '#') {
      maskedValue += inputChar
      valueIndex++
    } else {
      maskedValue += maskChar
    }
  }

  return maskedValue
}
