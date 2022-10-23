const OtpGenerator = require('otp-generator')

const OTP = OtpGenerator.generate(6,{
                digits: true,
                lowerCaseAlphabets: true,
                upperCaseAlphabets: true,
                specialChars: true,
})

module.exports= OTP