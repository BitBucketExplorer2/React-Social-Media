// function Check_PrimeNum(xnum) {

//     var num;
//     // num = 567; // any number
//     num = xnum;

//     if (num === 1) {
//         return false;
//     }

//     var i;
//     i = 2
//     while (i <= num) {
//         if (i === num) {
//             return true;
//         } else {
//             if (num % i == 0) {
//                 return false;
//             }

//         }
//         i = i + 1
//     }

// }

function dummy_game(xnum, xpar1, xpar2) {
    var i;
    i = 0;
    while (i < xnum) {

        if (i % 3 == 0 && i % 5 !== 0) {
            console.log("fizz")
        }
        if (i % 5 == 0 && i % 3 !== 0) {
            console.log("buzz")
        }
        if (i % 3 == 0 && i % 5 == 0) {
            console.log("fizzbuzz")
        }
        if (i % 3 != 0 && i % 5 != 0) {
            console.log(i)
        }





        i++;
    }


}