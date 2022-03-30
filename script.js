document.addEventListener('DOMContentLoaded', function () {

    var bttons= document.querySelectorAll('button');
    console.log(bttons);
    var first_no=0;
    var symbol = '';
    var input_no = document.querySelector('input');
    bttons.forEach(function(btton) {
        btton.addEventListener('click', function(){
            
            if (btton.className ==="numbers"){
                if(input_no.value=='0'){
                    input_no.value =btton.value;
                    first_no = parseInt(input_no.value);
                }
                else {
                    input_no.value = input_no.value+btton.value;
                }
                first_no= parseFloat(input_no.value);
                document.querySelector('.result').innerHTML = eval(input_no.value);
                console.log(btton, first_no)
            }
            else if (btton.className === "symbols two_no_needed") {
                symbol=btton.value;
                input_no.value = input_no.value + symbol;
                console.log(btton, input_no.value)
            }
            else if (btton.className === "symbols one_no_needed") {
                symbol = btton.value;
                first_no = one_no_expression(input_no.value, symbol)
                console.log(first_no)
                input_no.value = first_no;
                document.querySelector('.result').innerHTML = eval(input_no.value);
            }

            else if (btton.className === "ans"){
                input_no.value =eval(input_no.value);
                first_no=input_no.value;
                document.querySelector('.result').innerHTML = eval(input_no.value);
            }
            else if (btton.className === "clear") {
                input_no.value = 0;
                first_no = input_no.value;
                document.querySelector('.result').innerHTML ="";
            }
            else if (btton.className === "backspace") {
                input_no.value=input_no.value.slice(0,input_no.value.length-1)
                first_no = input_no.value;
                console.log(input_no.value.length)
                document.querySelector('.result').innerHTML = "";
            }
            
            //console.log(btton,input_no);
        })
    })
    
});



function one_no_expression(first, str) {
    let c= separate_2nd_no(first);
    let feq = first.slice(0,first.length - c);
    let seq = first.slice(first.length - c);
    //console.log(first.slice(first.length - c), first.slice(0,first.length - c), c);
    if (str === 'inv') {
        return (first=feq+"1/"+seq);
    }
    else if (str === '.') {
        return (first = first + ".");
    }
    else if (str === 'sq') {
        return (first =  first+ "**2");
    }
    else if (str === 'sqrt') {
        return (first=feq+"Math.sqrt("+seq+")");
    }
    else if (str === 'neg') {
        console.log(feq[feq.length-1]);
        const i = feq.length - 1;
        if (feq[i] === '-') {
            let x = feq.slice(0, length - 1)
            return (first = x + "+" + seq)
        }
        else if (feq[i] === '+') {
            let x = feq.slice(0, length - 1)
            return (first = x + "-" + seq)
        }
        return (first = feq + "-" + seq);
    }
}

function separate_2nd_no(str){
    let check = /^\d*\.?\d*$/;
    var count=0;
    
    for(let i=str.length-1;i>=0;i--){
        if(str[i].match(check)){
            count++;
        }
        else{
            break;
        }
    }
    console.log(str.slice(str.length - count), str.slice(0,str.length - count) ,count);
    return (count);
}