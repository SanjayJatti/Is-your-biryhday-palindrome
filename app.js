function reverseString(str){
    var listOfChars=str.split('');
    var reverseListOfChars=listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}
function isPalindrome(str){
    var reverse= reverseString(str);
    return str===reverse;
}
function convertDateToStr(date){
    var dateStr={day:'',month:'',year:''};

    if(date.day<10){
        dateStr.day= '0'+ date.day;
    }else{
        dateStr.day= date.day.toString();
    }
    if(date.month<10){
        dateStr.month='0'+ date.month;
    }else{
        dateStr.month= date.month.toString();
    }
    dateStr.year= date.year.toString();
    return dateStr;
};

function getAllDateFormats(date){
    var dateStr= convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day +  dateStr.year.slice(-2); 
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd,ddmmyy, mmddyy, yymmdd]   
};

function checkPalindromeForAllDateFormats(date){
    var listOfPalindrome = getAllDateFormats(date);
    var flag = false;

    for(var i=0; i<listOfPalindrome.length; i++){
        if(isPalindrome(listOfPalindrome[i])){
            flag = true;
            break;
        }
    }
    return flag;
};

function isLeapYear(year){
    if(year % 400===0){
        return true;
    }
    if(year % 4===0){
        return true;
    }
    if(year % 100===0){
        return false;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    
    var daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];

    if(month===2){
        if(isLeapYear(year)){
            if(date.day > 29){
                day=1;
                month++
            }
        }
        else
        {if(Date.day > 28){
            day = 1;
            month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        day = 1;
        year++;
    }
    return{
        day : day,
        month: month,
        year : year
    };

}
function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    
    var daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];

    
    if (day === 0) {
        month--;
    
        if (month === 0) {
          month = 12;
          day = 31;
          year--;
        }
        else if (month === 2) {
          if (isLeapYear(year)) {
            day = 29;
          }
          else {
            day = 28;
          }
        }
        else {
          day = daysInMonth[month - 1];
        }
      }
    
    return{
        day : day,
        month: month,
        year : year
    }
}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}
function getPreviousPalindromeDate(date){
    var count = 0;
    var previousDate = getPreviousDate(date);
    while(1){
        count++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if(isPalindrome){
            break;
        }
         previousDate = getPreviousDate(previousDate);
    }
    return [count, previousDate];

}

var bdayInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var result = document.querySelector("#output");

function clickHandler(e){
    if(bdayInput.value===""){
        result.innerText="Please select your birthdate.";
    }
    var bdayStr = bdayInput.value;
    if(bdayStr !==''){
        var listOfDate = bdayStr.split('-');

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0]) 
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            result.innerText= "Yay!!! Your birthday is a palindrome🥳";
        }
        else if(!isPalindrome){    
            const [count, previousDate] = getPreviousPalindromeDate(date);
            const [ctr, nextDate] = getNextPalindromeDate(date);
            if(ctr < count){
            result.innerText = `Oops! Your birthday is NOT a palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} and you missed it by ${ctr} days!🙁`;
            }else{
            result.innerText=`Oops! Your birthday is NOT a palindrome. The nearest palindrome is ${previousDate.day}-${previousDate.month}-${previousDate.year} and you missed it by ${count} days!🙁`
            }
        }
    }
}
showBtn.addEventListener("click",clickHandler);
