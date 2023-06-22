function isValidId(str) {
    // Check if the string is a 12-byte hex string
    const is12BytesHex = /^[0-9a-fA-F]{24}$/.test(str);
  
    // Check if the string is a 24-character hex string
    const is24HexChars = /^[0-9a-fA-F]{24}$/.test(str);
  
    // Check if the string is an integer
    const isInteger = Number.isInteger(Number(str));
  
    // Return true if any of the conditions are met
    return is12BytesHex || is24HexChars || isInteger;
  }

  module.exports = isValidId;