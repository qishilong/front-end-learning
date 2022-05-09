// //1. 对称数组
// //var a = [];
//
// function test2(arr) {
//     if (arr == null){
//         return false;
//     }
//     for (var i = 0 ; i < arr.length ; i ++){
//         if (arr[i] != arr[arr.length - 1 - i]){
//             return false;
//         }
//     }
//     return true;
// }
//
// function test(arr){
//     if (arr == null){
//         return false;
//     }
//     var p = 0 ;
//     var q = arr.length - 1;
//     while(true) {
//         if (p >= q){
//             break;
//         }
//         if (arr[p] != arr[q]){
//             return false;
//         }
//         p ++;
//         q --;
//     }
//     return true;
// }
//
// console.log(test2([1,2,3,2,1]));
// console.log(test2([1,2,3,3,2,1]));
// console.log(test2([1,2,3,5,2,1]));
// console.log(test2([]));
// console.log(test2([1]));
// console.log(test2(null));

//2. 查询子串首位置
// indexOf 原理
// function test(origin, sub) {
//     //严谨判断
//     if (!origin || !sub || origin.length == 0 || sub.length == 0) {
//         return -1;
//     }
//     for (var i = 0 ; i < origin.length - sub.length + 1 ; i ++){
//         for (var j = 0 ; j < sub.length ; j ++){
//             if (origin[i + j] != sub[j]){
//                 break;
//             }
//             if (j == sub.length - 1){
//                 return i;
//             }
//         }
//     }
//     return -1;
// }
//
// console.log(test([1,2,3,2,3,4,5], [2,3,4,5]));
// console.log(test(null, [2,3,4,5]));

//3. 最大递增子序列
//
// function test(arr) {
//     if (!arr || arr.length == 0){
//         return 0;
//     }
//     var max = 0 ;
//     var nowMax = 1;
//     for (var i = 1 ; i < arr.length ; i ++){
//         if (arr[i] - arr[i - 1] > 0){
//             nowMax ++;
//         } else {
//             max = nowMax > max ? nowMax : max;
//             nowMax = 1;
//         }
//     }
//     max = nowMax > max ? nowMax : max;//递增出来之后，需要再重新比较一下。
//     return max;
// }
//
// console.log(test([1,2,5,1,2,3,4,8,1,2,6,9]));
// console.log(test([]));
// console.log(test(null));


// 在线编程 不加严谨判断 通过不了牛客网