let input = document.getElementById('input');
let write = document.getElementsByClassName('write');
let history = document.getElementsByClassName("operation");
let hex_line = document.getElementById('hex_line');
let converts = document.getElementsByClassName("convert");
let interactions = document.getElementsByClassName("interaction");
let button_len = document.getElementById('length');

let kilo = document.getElementById("kilo");
let gram = document.getElementById("gram");
let tonn = document.getElementById("tonn");
let pount = document.getElementById("pount");

let area_m = document.getElementById("area_m");
let area_k = document.getElementById("area_k");
let area_c = document.getElementById("area_c");
let area_f = document.getElementById("area_f");

let kilo_m = document.getElementById("kilo_m");
let metr = document.getElementById("metr");
let cent = document.getElementById("cent");
let feet = document.getElementById("feet");

let cel = document.getElementById("cel");
let fahr = document.getElementById("fahr");
let kel = document.getElementById("kel");

let memory_id = 0;
let memory = "";
let s_id = 1;
let systems = ["bin", "dec", "hex"];
let system_button = document.getElementById('system');

let max_input_len = 30;
let size_check_l = document.getElementById("size_check");

function updateSize() {
    size_check_l.textContent = input.textContent.length + "/30"; 
}
updateSize();

document.getElementById('clear_history').onclick = () => {
    console.log("Clear history");
    for (let i of history) {
       i.textContent = "";
    }
}
weight.onclick = () => {
    setButtonOnSystem();
    console.log("weight button");
    if (converts[0].getAttribute("active") === "no") {
        converts[0].setAttribute("active", "yes");
        converts[1].setAttribute("active", "no");
        converts[2].setAttribute("active", "no");
        converts[3].setAttribute("active", "no");
        interactions[0].style.display = "none";
        setButtonsDisable();
    } 
    else {
        setButtonsNotDisable();
        setButtonOnSystem();
        converts[0].setAttribute("active", "no");
        interactions[0].style.display = "block";
    }
}
area.onclick = () => {
    setButtonOnSystem();
    if (converts[3].getAttribute("active") === "no") {
        converts[0].setAttribute("active", "no");
        converts[1].setAttribute("active", "no");
        converts[2].setAttribute("active", "no");
        converts[3].setAttribute("active", "yes");
        interactions[0].style.display = "none";
        setButtonsDisable();
    }
    else {
        setButtonsNotDisable();
        setButtonOnSystem();
        interactions[0].style.display = "block";
        converts[3].setAttribute("active", "no");
    }
}
temperature.onclick = () => {
    setButtonOnSystem();
    console.log("temperature button");
    if (converts[1].getAttribute("active") === "no") {
        converts[0].setAttribute("active", "no");
        converts[1].setAttribute("active", "yes");
        converts[2].setAttribute("active", "no");
        converts[3].setAttribute("active", "no");
        interactions[0].style.display = "none";
        setButtonsDisable();
    }
    else {
        setButtonsNotDisable();
        setButtonOnSystem();
        converts[1].setAttribute("active", "no");
        interactions[0].style.display = "block";
    }
}
button_len.onclick = () => {
    console.log("length button");
    if (converts[2].getAttribute("active") === "no") {
        converts[0].setAttribute("active", "no");
        converts[1].setAttribute("active", "no");
        converts[2].setAttribute("active", "yes");
        converts[3].setAttribute("active", "no");
        interactions[0].style.display = "none";
        setButtonsDisable();
    }
    else {
        setButtonsNotDisable();
        setButtonOnSystem();
        interactions[0].style.display = "block";
        converts[2].setAttribute("active", "no");
    }
}
function kilo_oninput() {
    gram.value = kilo.value * 1000;
    tonn.value = kilo.value / 1000;
    pound.value = kilo.value * 2.205;
};
function kilo_onchange() {
    gram.value = kilo.value * 1000;
    tonn.value = kilo.value / 1000;
    pound.value = kilo.value * 2.205;
};
function gram_oninput() {
    kilo.value = gram.value / 1000;
    tonn.value = gram.value / (1000 * 1000);
    pound.value = gram.value * 2.205 / 1000;
};
function gram_onchange() {
    kilo.value = kilo.value / 1000;
    tonn.value = kilo.value / (1000 * 1000);
    pount.value = kilo.value * 2.205 / 1000;
};
function tonn_oninput() {
    gram.value = tonn.value * 1000 * 1000;
    kilo.value = tonn.value * 1000;
    pound.value = tonn.value * 2.205 * 1000;
};
function tonn_onchange() {
    gram.value = tonn.value * 1000 * 1000;
    kilo.value = tonn.value * 1000;
    pount.value = tonn.value * 2.205 * 1000;
};
function pount_oninput() {
    gram.value = pount.value * 1000;
    tonn.value = pount.value / 1000;
    kilo.value = pount.value * 2.205;
};
function pount_onchange() {
    gram.value = pount.value * 1000 / 2.205;
    tonn.value = pount.value / (1000 * 2.205);
    kilo.value = pount.value / 2.205;
};
function cel_oninput() {
    kel.value = parseInt(cel.value) + 273;
    fahr.value = (cel.value * 9 / 5) + 32;
};
function cel_onchange() {
    kel.value = parseInt(cel.value) + 273;
    fahr.value = (cel.value * 9 / 5) + 32;
};
function fahr_oninput() {
    cel.value = (fahr.value - 32) * 5 / 9;
    kel.value = parseInt(cel.value) + 273;
};
function fahr_onchange() {
    cel.value = (fahr.value - 32) * 5 / 9;
    kel.value = parseInt(cel.value) + 273;
};
function kel_oninput() {
    cel.value = kel.value - 273;
    fahr.value = (cel.value * 9 / 5) + 32;
};
function kel_onchange() {
    cel.value = kel.value - 273;
    fahr.value = (cel.value * 9 / 5) + 32;
};
function kilo_m_oninput() {
    metr.value = kilo_m.value * 1000;
    cent.value = kilo_m.value * (1000 * 100);
    feet.value = kilo_m.value * 3.281 * 1000;
};
function kilo_m_onchange() {
    metr.value = kilo_m.value * 1000;
    cent.value = kilo_m.value * (1000 * 100);
    feet.value = kilo_m.value * 3.281 * 1000;
};
function metr_oninput() {
    kilo_m.value = metr.value / 1000;
    cent.value = metr.value * 100;
    feet.value = metr.value * 3.281;
};
function metr_onchange() {
    kilo_m.value = metr.value / 1000;
    cent.value = metr.value * 100;
    feet.value = metr.value * 3.281;
};
function cent_oninput() {
    metr.value = cent.value / 1000;
    kilo_m.value = cent.value / (1000 * 100);
    feet.value = cent.value * 3.281 * 1000;
};
function cent_onchange() {
    metr.value = cent.value / 1000;
    kilo_m.value = cent.value / (1000 * 100);
    feet.value = cent.value * 3.281 * 1000;
};
function feet_oninput() {
    cent.value = feet.value / 3.281 * 100;
    metr.value = feet.value / 3.281;
    kilo_m.value = feet.value / (3.281 * 1000);
};
function feet_onchange() {
    cent.value = feet.value / 3.281 * 100;
    metr.value = feet.value / 3.281;
    kilo_m.value = feet.value / (3.281 * 1000);
};
function area_m_oninput() {
    area_c.value = area_m.value * 10000;
    area_k.value = area_m.value / 1e+6;
    area_f.value = area_m.value * 10.764;
};
function area_m_onchange() {
    area_c.value = area_m.value * 10000;
    area_k.value = area_m.value / 1e+6;
    area_f.value = area_m.value * 10.764;
};
function area_k_oninput() {
    area_m.value = area_k.value * 1e+6;
    area_c.value = area_k.value * 1e+10;
    area_f.value = area_m.value * 10.764;
};
function area_k_onchange() {
    area_m.value = area_k.value * 1e+6;
    area_c.value = area_k.value * 1e+10;
    area_f.value = area_m.value * 10.764;
};
function area_c_oninput() {
    area_m.value = area_c.value / 1e+4;
    area_k.value = area_c.value / 1e+10;
    area_f.value = area_m.value * 10.764;
};
function area_c_onchange() {
    area_m.value = area_c.value / 1e+4;
    area_k.value = area_c.value / 1e+10;
    area_f.value = area_m.value * 10.764;
};
function area_f_oninput() {
    area_m.value = area_f.value / 10.764;
    area_c.value = area_m.value * 1e+4;
    area_k.value = area_m.value / 1e+6;
};
function area_f_onchange() {
    area_m.value = area_f.value / 10.764;
    area_c.value = area_m.value * 1e+4;
    area_k.value = area_m.value / 1e+6;
};
system_button.onclick = () => {
    s_id++;
    if (s_id == 3) {
        s_id = 0;
    }
    system_button.setAttribute('system', systems[s_id]);
    system_button.textContent = systems[s_id];
    setButtonOnSystem();
}
for (let b of write) {
    b.onclick = () => {
        if (input.textContent.length >= max_input_len) {
            console.log("length is bigger than you can have");
            return;
        } 
        let inp = input.textContent;
        
        let t = b.textContent;
        switch (t) {
            case "x!":
                t = "!";
                break;
            case "x^n":
                t = "^";
                break;
            case "xn":
                t = "^";
                break;
            case ".":
                if (isPointExist(findLastNumber(inp))) {
                    t = "";
                }
                else if (isOperator(inp[inp.length - 1])) {
                    t = "0.";
                }
                break;
            case "√x":
                t = "√(";
                break;
        }
        if (t == "x!" || t == "x^n" || t == "*" || t == "/") {

        }
        else if (inp === "0" && t != ".") inp = "";

        if (isOperator(t) && isOperator(inp[inp.length - 1])) {
            inp = inp.slice(0, inp.length - 1);
        }
        inp += t;
        input.textContent = inp; 
        updateSize()
    }
}
C.onclick  = () => {
    input.textContent = "0";
    updateSize();
}
CE.onclick = () => {
    input.textContent = input.textContent.slice(0, 
                        input.textContent.length - 1);
    if (input.textContent.length === 0) input.textContent = "0";
    updateSize();
}
mr.onclick = () => {
    if (input.textContent.length >= max_input_len) {
        console.log("length is bigger than you can have");
        return;
    }
    if (checkB(input.textContent) != 0) return;
    if (input.textContent == "0") input.textContent = "";
    if (memory == "") memory = getResult(input.textContent);
    else input.textContent += memory;
    console.log("memory read/save: " + memory);
    updateSize();
}
mc.onclick = () => {
    if (checkB(input.textContent) != 0) return;
    memory = "";
    console.log("memory clear " + memory);
}
mp.onclick = () => {
    if (checkB(input.textContent) != 0) return;
    if (memory == "") getResult(input.textContent);
    else {
        memory = String(Number(memory) + Number(getResult(input.textContent)));
    }
    console.log("Memory after plus: " + memory);
}
mm.onclick = () => {
    if (checkB(input.textContent) != 0) return;
    if (memory == "") getResult(input.textContent);
    else {
        memory = String(Number(memory) - Number(getResult(input.textContent)));
    }
    console.log("Memory after minus: " + memory);
}
// root.onclick = () => {
//     let temp = input.textContent;
//     let last = findlastExpression(temp);
//     temp = temp.slice(0, temp.length - last.length);
//     last = "Math.sqrt(" + last + ")";
//     console.log(temp + last);
//     input.textContent = temp + getResult(last);
// }
exp.onclick = () => {
    let temp = input.textContent;
    let last = findlastExpression(temp);
    temp = temp.slice(0, temp.length - last.length);
    last = "Math.exp(" + last + ")";
    console.log(temp + last);
    input.textContent = temp + getResult(last);
}
sign_b.onclick = () => {
    let temp = input.textContent;
    let last = findLastNumber(temp);
    console.log(last);
    if (last == "0" || last == "(0)") {
        return;
    }
    else if (temp[temp.length - 1] == ")") {
        input.textContent = temp.slice(0, temp.length - last.length - 3) + (Number(last));
    }
    else {
        input.textContent = temp.slice(0, temp.length - last.length) + "(" + (-Number(last)) + ")";
    }
}
per.onclick = () => {
    let temp = input.textContent;
    //let last = findLastNumber(temp);
    let last = findlastExpression(temp);
    if (last == temp) {
        temp = temp + "/" + 100;
    }
    else {
        let sign = temp.slice(temp.length - last.length - 1, temp.length - last.length);
        temp = temp.slice(0, temp.length - last.length - 1);
        let num = '';
        console.log("temp: " + temp[temp.length - 1]);
        if (temp[temp.length - 1] !== ')') {
            //num = findLastNumber(temp);
            num = findlastExpression(temp);
        } else {
            let b = 1;
            let i = temp.length - 2;
            for (; b !== 0; i--) {
                if (temp[i] === "(") {
                    b--;
                }
                else if (temp[i] === ")") {
                    b++;
                }
            }
            let pars = temp.slice(i+ 2, temp.length - 1);
            console.log(pars);
            num = getResult(pars);
        }
        console.log("num: " + num);
        temp = getResult(temp) + sign + last;
        let first = temp.slice(0, temp.length - last.length - 1);
        if (sign === "*") {
            temp = num + sign + last + "/" + 100;
        }
        else {
            temp = first + sign + num + "*" + last + "/" + 100;
            console.log(temp);
        }
    }
    fillHistory(temp);
    input.textContent = getResult(temp);
    /*
    if (checkB(input.textContent) != 0) {
        input.textContent = "Error";
        return; 
    }
    let temp = input.textContent;
    let percent = findlastExpression(temp);
    if (temp == percent) {
        temp = eval(temp + "/100");
    }
    else {
        temp = temp.slice(0, temp.length - percent.length);
        let s = temp[temp.length - 1];
        temp = temp.slice(0, temp.length - 1);
        if (s == "-" || s == "+") {
            percent = "(" + temp + "*" + percent + "/" + 100 + ")";
            percent = eval(percent);
            temp = temp + s + percent;
        }
        else {
            percent = eval("(" + percent + "/100)");
            temp += s + percent;
        }
    }
    input.textContent = temp;*/
}
equal.onclick = () => {
    if (checkB(input.textContent) != 0) {
        input.textContent = "Error";
        return; 
    }
    let temp = input.textContent;
    console.log(findlastExpression(temp));
    console.log("dec calculations");
    fillHistory(temp);
    console.log("dec calculations");
    if (system_button.textContent == "hex") {
        input.textContent = getResult(temp).toString(16);
    }
    else if (system_button.textContent == "bin") {
        input.textContent = getResult(temp).toString(2);
    }
    else {
        console.log("dec calculations");
        input.textContent = getResult(temp);
    }
    updateSize();
}
function getResult(expression) {
    if (checkB(input.textContent) != 0) {
        input.textContent = "Error";
        return; 
    }
    if (system_button.textContent == "bin" || system_button.textContent == "hex") {
        expression = toDec(expression);
    }
    expression = makeCalculations(expression);
    console.log("Expression" + expression);
    let res =  eval(expression).toFixed(6);
    return Number(res);
}
function fillHistory(last_exp) {
    for (let i = history.length - 1; i > 0; i--) {
        history[i].textContent = history[i - 1].textContent;
    }
    if (system_button.textContent == "bin") {
        history[0].textContent = last_exp + "=" + eval(makeCalculations(toDec(last_exp))).toString(2);
    }
    else if (system_button.textContent == "hex") {
        history[0].textContent = last_exp + "=" + eval(makeCalculations(toDec(last_exp))).toString(16);
    }
    else {
        history[0].textContent = last_exp + "=" + eval(makeCalculations(last_exp));
    }
    
}
function isOperator(o) {
    if (o === "+" || 
        o === "-" || 
        o === "*" || 
        o === "/" || 
        o === "^") {
        return true;
    }
    return false;
}
function isPointExist(number) {
    for (let i = 0; i < number.length; i++) {
        if (number[i] === ".") 
            return true;
    }
    return false;
}
function findLastNumber(expression) {
    let i = expression.length - 1;
    let last = [];
    for (; expression[i] === ")"; i--) {}
    
    for (; i >= 0; i--) {
        if ((isOperator(expression[i]) && expression[i - 1] != "e") || expression[i] == ")" || expression[i] == "(") {
            break;
        }
        else {
            last.push(expression[i]);
        }
    }
    last = last.reverse();
    let res = "";
    for (let i = 0; i < last.length; i++) {res += last[i];}
    return res;
}
function makeCalculations(exp) {
    while(exp.indexOf('√') != -1)
        exp = exp.replace("√", "Math.sqrt");
    while(exp.indexOf('^') != -1)
        exp = exp.replace("^", "**");
    while (exp.indexOf("!") !== -1) {
        if (exp[exp.indexOf("!") - 1] === ")") {
            let b = 1;
            let i = exp.indexOf("!") - 2;
            for (; b !== 0; i--) {
                if (exp[i] === "(") {
                    b--;
                }
                else if (exp[i] === ")") {
                    b++;
                }
            }
            let r = getResult(exp.slice(i + 1, exp.indexOf("!")));
            exp = exp.replace(exp.slice(i + 1, exp.indexOf("!") + 1), "factorial(" + r + ")");
        }
        else {
            let last = exp.slice(0, exp.indexOf("!"));
            last = findlastExpression(last);
            exp = exp.replace(last + "!", "factorial(" + last + ")");
        }
    }
    updateSize();
    return exp;
}
function factorial(n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
function findExpBeforeLast(exp) {
    let last = findLastNumber(exp);
    exp = exp.slice(0, last.length - 1);
    last = findLastNumber(exp);
    console.log("exp before: " + last);
}
function findlastExpression(exp) {
    let result = [];
    let str = "";
    if (exp[exp.length - 1] == ")") {
        let i = exp.length - 2;
        let b = 1;
        for (; b !== 0; i--) {
            if (exp[i] === "(") {
                b--;
            }
            else if (exp[i] === ")") {
                b++;
            }
            result += exp[i];
        }
        str += "(";
        for (let i = result.length - 2; i >= 0; i--) {
            str += result[i];
        }
        str += ")";
    }
    else {
        str = findLastNumber(exp);
    }
    return str;
}
function checkB(str) {
    let b = 0;
    for (let i of str) {
        if (i == ")") {
            b++;
        }
        else if (i == "(") {
            b--;
        }
    }
    return b;
}
function toDec(num) {
    let res = "";
    let nums = "";
    let j = 0;
    for (let i = 0; i < num.length; i++) {
        if (isOperator(num[i]) || num[i] == ")" || num[i] == "(") {
            nums += " " + num[i] + " ";
        }
        else {
            nums += num[i];
        }
    }
    nums = nums.split(" ");
    for (let i of nums) {
        if (i != ")" && i != "(" && !isOperator(i) && i != "") {
            if (system_button.textContent == "bin")
                i = parseInt(i, 2);
            else if (system_button.textContent == "hex") {
                i = parseInt(i, 16);
            }
        }
            
        res += i;
    }
    res = res.replace(",", "");    
    return res;
}
function setButtonsDisable() {
    let buttons = document.getElementsByTagName('button');
    for (let i of buttons) {
        if (i.getAttribute('id') != "weight" &&
        i.getAttribute('id') != "temperature" &&
        i.getAttribute('id') != "area" &&
        i.getAttribute('id') != "length") {
            i.disabled = true;
        }
    }
}
function setButtonsNotDisable() {
    let buttons = document.getElementsByTagName('button');
    for (let i of buttons) {
        if (i.getAttribute('id') != "weight" &&
        i.getAttribute('id') != "temperature" &&
        i.getAttribute('id') != "area" &&
        i.getAttribute('id') != "length") {
            i.disabled = false;
        }
    }
}
function setButtonOnSystem() {
    console.log('set on system: ' + system_button.textContent);
    if (system_button.textContent == "bin") {
        input.textContent = parseInt(input.textContent, 16).toString(2);
        sign_b.disabled = true;
        per.disabled = true;
        fuct.disabled = true;
        root.disabled = true;
        exp.disabled = true;
        power.disabled = true;
        point.textContent = ".";
        point.disabled = true;
        Bb.disabled = true; 
        Cb.disabled = true; 
        Db.disabled = true; 
        Eb.disabled = true; 
        Fb.disabled = true;
        n2.disabled = true;
        n3.disabled = true;
        n4.disabled = true;
        n5.disabled = true;
        n6.disabled = true;
        n7.disabled = true;
        n8.disabled = true; 
        n9.disabled = true;
    }
    else if (system_button.textContent == "dec") {
        input.textContent = parseInt(input.textContent, 2).toString(10);
        sign_b.disabled = false;
        per.disabled = false;
        fuct.disabled = false;
        root.disabled = false;
        exp.disabled = false;
        power.disabled = false;
        point.textContent = ".";
        point.disabled = false;
        Bb.disabled = true; 
        Cb.disabled = true; 
        Db.disabled = true; 
        Eb.disabled = true; 
        Fb.disabled = true;
        n2.disabled = false;
        n3.disabled = false;
        n4.disabled = false;
        n5.disabled = false;
        n6.disabled = false;
        n7.disabled = false;
        n8.disabled = false; 
        n9.disabled = false;
    }
    else if(system_button.textContent == "hex") {
        input.textContent = parseInt(input.textContent, 10).toString(16);
        sign_b.disabled = true;
        per.disabled = true;
        fuct.disabled = true;
        root.disabled = true;
        exp.disabled = true;
        point.textContent = "A";
        point.disabled = false;
        Bb.disabled = false; 
        Cb.disabled = false; 
        Db.disabled = false; 
        Eb.disabled = false; 
        Fb.disabled = false;
        n2.disabled = false;
        n3.disabled = false;
        n4.disabled = false;
        n5.disabled = false;
        n6.disabled = false;
        n7.disabled = false;
        n8.disabled = false; 
        n9.disabled = false;
    }
    else {

    }
}
