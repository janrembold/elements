const escapeRegex = input => input.replace(/[-|\\{}()[\]^$+*?.]/g, '\\$&')

export default escapeRegex
