// ------------------------------------------------- // sync function // -------------------------------------------------------------------------------

// console.log("task one");
// for(let i=1; i<=1000000; i++){
//     console.log(i);
// }

// console.log("task two");
// console.log("task three");
// console.log("task four");

// -------------------------------------------------- // async function // ---------------------------------------------------------------------------------------------

console.log("task one");
setTimeout(() => {
    console.log("task two");
}, 5000);

console.log("task three");
console.log("task four");