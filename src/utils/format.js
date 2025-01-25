export const formatNumberWithLocale = (number) => {
  const userLocale = navigator.language || 'en-US' // Default to 'en-US' if locale is not detected
  return new Intl.NumberFormat(userLocale).format(number)
}

export const formatMinutes = (minutes, withRemainder = true) => {
  if (Number.isNaN(minutes)) {
    return '0m'
  }
  minutes = Math.floor(minutes)
  if (minutes < 60) {
    return `${Math.floor(minutes)}m`
  } else if (minutes < 1440) {
    if (withRemainder) {
      return `${Math.floor(minutes / 60)}h` + (minutes % 60 !== 0 ? formatMinutes(minutes % 60) : '')
    } else {
      return `${Math.floor(minutes / 60)}h`
    }
  } else {
    if (withRemainder) {
      return `${Math.floor(minutes / 1440)}d` + (minutes % 1440 !== 0 ? formatMinutes(minutes % 1440) : '')
    } else {
      return `${Math.floor(minutes / 1440)}d`
    }
  }
}
