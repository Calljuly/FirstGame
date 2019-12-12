loadRules();

function loadRules () {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'rules.txt', true);
    xhttp.onload= function () {
        if(this.status == 200){
            document.getElementById("ruleBox").innerText = this.responseText;
        }
    }
    xhttp.send();
}