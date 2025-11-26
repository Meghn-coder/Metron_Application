// Regex rules for sensitive data detection
module.exports = {
  password: /(password|pwd|pass)[^\w]?[:=][^\w]?\w+/i,
  apiKey: /(api[_-]?key|secret)[^\w]?[:=][^\w]?\w+/i,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  phone: /\b[6-9]\d{9}\b/,
  creditCard: /\b(?:\d[ -]*?){13,16}\b/,
  pan: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
  aadhaar: /\b\d{4}\s\d{4}\s\d{4}\b/
};
