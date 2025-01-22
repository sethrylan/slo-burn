export const formatNumberWithLocale = (number) => {
  const userLocale = navigator.language || 'en-US' // Default to 'en-US' if locale is not detected
  return new Intl.NumberFormat(userLocale).format(number)
}

export const formatMinutes = (minutes, withRemainder = true) => {
  if (minutes < 60) {
    return `${Math.floor(minutes)}m`
  } else {
    if (withRemainder) {
      return (
        `${Math.floor(minutes / 60)}h` +
        (minutes % 60 !== 0 ? `${Math.floor(minutes % 60)}m` : '')
      )
    } else {
      return `${Math.floor(minutes / 60)}h`
    }
  }
}
