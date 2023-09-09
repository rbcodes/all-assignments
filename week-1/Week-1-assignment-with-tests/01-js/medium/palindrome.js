/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  var verificationstr = str.toLowerCase().replace(/\W/g, '');
  // console.log(verificationstr);

  var frontIndex = 0;
  var endIndex = verificationstr.length - 1;

  while(frontIndex != endIndex && endIndex > -1){
    if(verificationstr.charAt(frontIndex) != verificationstr.charAt(endIndex)){
      return false;
    }
    frontIndex += 1;
    endIndex -= 1; 
  }
  return true;
}

module.exports = isPalindrome;
