document.addEventListener('DOMContentLoaded', function () {

    var bttons = document.querySelectorAll('button');
    console.log(bttons);
    
    var input_no = document.querySelector('input');
   
    
    bttons.forEach(function (btton) {
        btton.addEventListener('click', function () {
            strd = btton.className;
            var symbol = btton.value;
            if (strd=== "numbers" ) {
                if (input_no.value == '0') {
                    input_no.value = btton.value;
                }
                else {
                    input_no.value = input_no.value + btton.value;
                }
                document.querySelector('.result').innerHTML = eval(input_no.value);
            }
            else if (strd.match("two_no")) {
                if (input_no.value.length==1&&input_no.value==='0'){
                    input_no.value = '';
                }
                if (input_no.value[input_no.value.length - 1] === '.') {
                    input_no.value = input_no.value.slice(0, input_no.value.length - 1);
                }
                input_no.value = input_no.value + symbol;
                input_no.value = check_sign(input_no.value, input_no.value.length - 1, strd.match("pow"));
                console.log(btton, input_no.value)
            }
            else if (strd.match("one_no")) {
                input_no.value = one_no_expression(input_no.value, symbol);
                document.querySelector('.result').innerHTML = eval(input_no.value);
            }

            else if (strd === "ans") {
                input_no.value = eval(input_no.value);
                document.querySelector('.result').innerHTML = eval(input_no.value);
            }
            else if (strd === "clear") {
                input_no.value = 0;
                document.querySelector('.result').innerHTML = "";

            }
            else if (strd === "constant") {
                let ans='';
                if (input_no.value == '0') {
                    ans = eval(`Math.${ symbol }`)
                    input_no.value = ans;
                }
                else {
                    ans = eval(`Math.${symbol}`)
                    input_no.value = input_no.value+ans;
                }
            }
            else if (strd === "backspace") {
                input_no.value = input_no.value.slice(0, input_no.value.length - 1)
                console.log(input_no.value.length)
                document.querySelector('.result').innerHTML = "";
            }
            else if (strd === "bracket") {
                console.log(symbol)
                
                if(symbol==='('){
                    if (input_no.value.length == 1 && input_no.value === '0') {
                        input_no.value = '(';
                        return input_no;
                    }
                    if (input_no.value[input_no.value.length - 1].match(/\d/) || input_no.value[input_no.value.length - 1]===")"){
                        input_no.value=`${input_no.value}*(`;
                    }
                    else{
                        input_no.value = `${input_no.value}(`;
                    }
                }
                else if (symbol === ')'){
                    input_no.value = `${input_no.value})`;
                }
            }

        })
    })

});



function one_no_expression(first, str) {
    let c = separate_2nd_no(first);
    let feq = first.slice(0, first.length - c);
    let seq = first.slice(first.length - c);
    var ans='';
    //console.log(first.slice(first.length - c), first.slice(0,first.length - c), c);
    if (str === 'inv') {
        return (first = `${feq}1/${seq}`);
    }
    else if (str === '.') {
        return (first = `${first}.`);
    }
    else if (str === 'sq') {
        return (first = `${first}**2`);
    }
    else if (str === 'cb') {
        return (first = `${first}**3`);
    }
    else if (str === 'sqrt') {
        ans = eval(`Math.sqrt(${seq})`);
        return (first = feq + ans);
    }
    else if (str === 'cbrt') {
        ans = eval(`Math.pow(${seq},(1/3))`);
        return (first = feq + ans);
    }
    else if (str === 'ex') {
        ans = eval(`Math.pow(Math.E,${seq})`);
        return (first = feq + ans);
    }
    else if (str === 'log') {
        ans = eval(`Math.log10(${seq})`)
        return (first = feq +ans);
    }
    else if (str === 'ln') {
        ans = eval(`Math.log(${seq})`)
        return (first = feq +ans );
    }
    else if (str === '10_pow') {
        ans = eval( `Math.pow(10, ${seq})`)
        return (first = feq +ans);
    } 
    else if (str === '2_pow') {
        ans = eval(`Math.pow(2, ${seq})`)
        return (first = feq + ans);
    }
    else if (str === 'fact') {
        ans=factorial(seq)
        return (first = feq + ans);
    }
    else if (str === 'neg') {
        console.log(feq[feq.length - 1]);
        if (feq[feq.length - 1] === '-') {
            let x = feq.slice(0, length - 1)
            return (first = `${x}+${seq}`)
        }
        else if (feq[feq.length - 1] === '+') {
            let x = feq.slice(0, length - 1)
            return (first = `${x}-${seq}`)
        }
        return (first = `${feq}-${seq}`);
    }
    else if (str === 'modd') {
        console.log(feq[feq.length - 1], feq[feq.length - 2]);
        if (feq[feq.length - 1] === '-' && feq[feq.length - 2] === '-') {
            let x = feq.slice(0, length - 1)
            ans=eval(`Math.abs(-${seq})`)
            return (first = x + ans)
        }
        ans=eval(`Math.abs(${seq})`)
        return (first = feq +ans );
    }
}

function separate_2nd_no(str) {
    let check = /^\d*\.?\d*$/;
    var count = 0;
    if (str[str.length - 1] === ')') {
        for (let j = str.length - 1; j >= 0; j--) {
            count++;
            if (str[j] === '(') {
                break;
            }
        }
    }

    else{
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i].match(check)) {
                count++;
            }
            else {
                break;
            }
        }
    }
    
    console.log(str.slice(str.length - count),"#", str.slice(0, str.length - count), count);
    return (count);
}


function factorial(n) {
    var c = 1;
    for (let i = n; i > 0; i--) {
        c *= i;
    }
    return c;
}

function check_sign(str,i, bool) {
    let check1 = /[\%*]/;
    let check2 = /[+-]/;
   
    let j = i - 1;
    //console.log(!str[j - 1].match(/\d/))
    console.log(str[j], str[j].match(/\d/))
    if (!str[j].match(/\d/)){
        console.log(str[i], str[i].match(check2), str[j],str[j].match( check1))
        if(str[j]==="("||str[j]===')'){
            return str;
        }
        else{
            if (bool) {
                return check_sign(str, i - 1, bool);
            }
            else if (str[i].match(check2) && str[j].match(check1)) {
                return check_sign(str, i - 1, bool);
            }
            else if (str[i] === '-' && str[j] === '+') {
                return check_sign(str, i - 1, bool);
            }
            else {
                return check_sign(str.slice(0, j) + str[i], i - 1, bool);
            }
        }
    }
    
    else{
        return str;
    }
    
}