function sum(a, b){
    return a + b;
}

function sumWithMsg(clbk, msg){
    const result = clbk(20, 30);
    const finalResult = "Hi " + msg + "your score is " + result;
    console.log(finalResult);
}

sumWithMsg(sum, "Mr.Deepak ");