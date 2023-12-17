var p1InputArray = [];
var p2InputArray = [];

var p1Rule1Breaks = [];
var p2Rule1Breaks = [];
var p1Rule2Breaks = [];
var p2Rule2Breaks = [];
var p1Rule3Breaks = [];
var p2Rule3Breaks = [];

var p1Rule2MaxCull = [];
var p2Rule2MaxCull = [];
var p1Rule3MaxCull = [];
var p2Rule3MaxCull = [];

var p1Rule2MinCull = [];
var p2Rule2MinCull = [];
var p1Rule3MinCull = [];
var p2Rule3MinCull = [];

var framerate;
var macroName = '<not provided>';

document.getElementById('textbox').value = '';
document.getElementById('outbox1').value = '';
document.getElementById('outbox2').value = '';

document.getElementById('checkButton').addEventListener('click', async () =>{
    const macroTxt = document.getElementById('textbox').value;
    if(macroTxt === ''){
       return alert('Please provide a macro');
    }

    if(!validMacro(macroTxt)){
        document.getElementById('invalid-text').style.display = 'block';
        return;
    }
    document.getElementById('invalid-text').style.display = 'none';

    parseInputsToP1P2Array(macroTxt);

    document.getElementById('fps-text').textContent = 'FPS: ' + framerate;
    document.getElementById('fps-text').style.display = 'block';
    document.getElementById('fps-text').style.fontWeight = 'bold';
    document.getElementById('cull').style.display = 'block';

    checkP1CpsBreaks();
    checkP2CpsBreaks();

    reportP1Results();
    reportP2Results();

    disable();

    document.getElementById('downloadButton').style.pointerEvents = 'fill';
});

document.getElementById('downloadButton').addEventListener('click', async () =>{
    var resultString = 'Macro name:\n' + macroName +'\n';
    resultString += '\nFPS:\n' + framerate +'\n';
    resultString += '\nCulling:\n' + document.getElementById('culling').value +'\n\n';

    resultString += '** Player 1 CPS Violations: **\n';
    const content1 = document.getElementById('outbox1').value;
    resultString += content1;

    resultString += '\n\n** Player 2 CPS Violations: **\n';
    const content2 = document.getElementById('outbox2').value;
    resultString += content2;
    
    const link = document.createElement("a");
    const file = new Blob([resultString], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "cpsbreaks.txt";
    link.click();
    URL.revokeObjectURL(link.href);
});

document.getElementById('refreshButton').addEventListener('click', async () =>{
    location.reload();
});

function reportP1Results(){
    document.getElementById('outbox1').value = '';
    if(p1Rule1Breaks.length == 0 && p1Rule2Breaks.length == 0
        && p1Rule3Breaks.length == 0){
        document.getElementById('check1').style.visibility = 'visible';
        document.getElementById('outbox1').value = "Rule 1 violations:\n[none]\n\n";
        document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n[none]\n\n";
        document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n[none]";
    }
    else{
        if(p1Rule1Breaks.length == 0){
            document.getElementById('outbox1').value = "Rule 1 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 1 violations:\n";
            for(var i = 0; i < p1Rule1Breaks.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule1Breaks[i];
            }
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "\n";
        }
        if(p1Rule2Breaks.length == 0){
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n";
            for(var i = 0; i < p1Rule2Breaks.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule2Breaks[i];
            }
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "\n";
        }
        if(p1Rule3Breaks.length == 0){
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n[none]";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n";
            for(var i = 0; i < p1Rule3Breaks.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule3Breaks[i];
            }
        }
        document.getElementById('cross1').style.visibility = 'visible';
    }
}

function reportP2Results(){
    document.getElementById('outbox2').value = '';
    if(p2Rule1Breaks.length == 0 && p2Rule2Breaks.length == 0
        && p2Rule3Breaks.length == 0){
        document.getElementById('check2').style.visibility = 'visible';
        document.getElementById('outbox2').value = "Rule 1 violations:\n[none]\n\n";
        document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n[none]\n\n";
        document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 3 violations:\n[none]";
    }
    else{
        if(p2Rule1Breaks.length == 0){
            document.getElementById('outbox2').value = "Rule 1 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 1 violations:\n";
            for(var i = 0; i < p2Rule1Breaks.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule1Breaks[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        if(p2Rule2Breaks.length == 0){
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n";
            for(var i = 0; i < p2Rule2Breaks.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule2Breaks[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        if(p2Rule3Breaks.length == 0){
            document.getElementById('outbox2').value = document.getElementById('outbox2').value +"Rule 3 violations:\n[none]";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 3 violations:\n";
            for(var i = 0; i < p2Rule3Breaks.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule3Breaks[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        document.getElementById('cross2').style.visibility = 'visible';
    }
}

function disable(){
   document.getElementById('upload').style.pointerEvents = 'none';
   document.getElementById('checkButton').style.pointerEvents = 'none';
   document.getElementById('textbox').setAttribute('readonly', 'readonly');
}

function checkP1CpsBreaks(){
    derive(p1InputArray, p1Rule1Breaks);
    Derive(p1InputArray, p1Rule2Breaks, p1Rule3Breaks, p1Rule2MaxCull, 
        p1Rule3MaxCull, p1Rule2MinCull, p1Rule3MinCull);
}

function checkP2CpsBreaks(){ 
    derive(p2InputArray, p2Rule1Breaks);
    Derive(p2InputArray, p2Rule2Breaks, p2Rule3Breaks, p2Rule2MaxCull, 
        p2Rule3MaxCull, p2Rule2MinCull, p2Rule3MinCull);
}

function derive(inputFrames, breakArray){
    for(var i = 0; i < inputFrames.length; i++){
        var firstClickFrame = inputFrames[i];
        var frameOneSecondLater = firstClickFrame + framerate;
        var numClicks = 0;
        var lastClickWithinTime = firstClickFrame;
        for(var j = 0; j < inputFrames.length; j++){
            if(inputFrames[i + j] < frameOneSecondLater){
                lastClickWithinTime = inputFrames[i + j];
                numClicks ++;
            }
            else if(inputFrames[i + j] > frameOneSecondLater){
                break;
            }
            else if(inputFrames[i + j] == frameOneSecondLater){
                lastClickWithinTime = inputFrames[i + j];
                numClicks++;
                break;
            }
        }
        var timeBetween = parseFloat((lastClickWithinTime-firstClickFrame))/framerate;
        if(numClicks > 15){
            breakArray.push("- " + numClicks + " clicks in 1s: [frame " + firstClickFrame+" to "+ frameOneSecondLater+
            "]: (" + timeBetween.toFixed(3) + "s between first and last)\n");
        }
    }
} 

 function Derive(inputFrames, breakArrayRule2, breakArrayRule3, rule2Max, rule3Max, rule2Min, rule3Min){
    for(var i = 0; i < inputFrames.length; i++){
        var min = true;
        var max = false;
        var _2break = false, _3break = false;
        inputFramesWithinASecond = [];
        var firstClickFrame = inputFrames[i];
        var frameOneSecondLater = firstClickFrame + framerate;
        var latestClick = firstClickFrame;
        for(var j = 0; j < inputFrames.length; j++){
            if(inputFrames[i + j] < frameOneSecondLater){
                latestClick = inputFrames[i + j];
                inputFramesWithinASecond.push(inputFrames[i + j]);
            }
            else{
                break;
            }
        }
        if(inputFramesWithinASecond.length < 4){ continue; }
        for(var j = 1; j < inputFramesWithinASecond.length; j++){
            var numClicks = j+1;
            if(j < 3){ continue; }
            var framesBetweenClicks = inputFramesWithinASecond[j] - firstClickFrame;
            var timeBetweenClicks = parseFloat(framesBetweenClicks)/framerate;
            var cps = j/timeBetweenClicks;
            
            if(cps > 45){ //Candidate break
                if(cps > 45 && timeBetweenClicks < parseFloat(1)/3){
                    if(min == true){
                        rule3Min.push('- ' + cps.toFixed(3) + " cps rate for the " + numClicks + " click stint from " 
                        + firstClickFrame + " to " + inputFramesWithinASecond[j] + " (" +timeBetweenClicks.toFixed(3)+"s)\n");
                    }
                    breakArrayRule3.push('- ' + cps.toFixed(3) + " cps rate for the " + numClicks + " click stint from " 
                    + firstClickFrame + " to " + inputFramesWithinASecond[j] + " (" +timeBetweenClicks.toFixed(3)+"s)\n");

                    maxString = '- ' + cps.toFixed(3) + " cps rate for the " + numClicks + " click stint from " 
                    + firstClickFrame + " to " + inputFramesWithinASecond[j] + " (" +timeBetweenClicks.toFixed(3)+"s)\n";
                    _3break = true;
                    _2break = false;
                    max = true;
                    min = false;
                }
                else if(cps > 45 && numClicks >= 5){
                    if(min == true){
                        rule2Min.push('- ' + cps.toFixed(3) + " cps rate for the " + numClicks + " click stint from " 
                        + firstClickFrame + " to " + inputFramesWithinASecond[j] + " (" +timeBetweenClicks.toFixed(3)+"s)\n");
                    }
                    breakArrayRule2.push('- ' + cps.toFixed(3) + " cps rate for the " + numClicks + " click stint from " 
                    + firstClickFrame + " to " + inputFramesWithinASecond[j] + " (" +timeBetweenClicks.toFixed(3)+"s)\n");

                    maxString = '- ' + cps.toFixed(3) + " cps rate for the " + numClicks + " click stint from " 
                    + firstClickFrame + " to " + inputFramesWithinASecond[j] + " (" +timeBetweenClicks.toFixed(3)+"s)\n";
                    _3break = false;
                    _2break = true;
                    max = true;
                    min = false;
                }
                else if(cps <= 20 && timeBetweenClicks < parseFloat(1)/3){
                    continue;
                }
            }
        }
        if(max == true){
            if(_2break == true){
                rule2Max.push(maxString);
            }
            else if(_3break == true){
                rule3Max.push(maxString);
            }
        }
    }
} 

function validMacro(macro){
    const arrayOfLines = macro.trim().split('\n');
    if(arrayOfLines.length < 2){ return false; }
    for(var i = 0; i < arrayOfLines.length; i++){
        var lineChoppedUp1 = arrayOfLines[i].trim().split(/(\s+)/);
        var lineChoppedUp = lineChoppedUp1.filter(n => isANumber(n));
        if(i == 0){
           if(lineChoppedUp.length != 1 || !isANumber(lineChoppedUp[0])){
            return false;
           }
        }
        else{
            if(lineChoppedUp.length != 3 || !isANumber(lineChoppedUp[0])
            || !isANumber(lineChoppedUp[1]) || !isANumber(lineChoppedUp[2])){
                return false;
            }
        }
    }
    return true;
}

function isANumber(str){
    return !/\D/.test(str);
  }

function parseInputsToP1P2Array(macroTxt){
    const lineArray = macroTxt.trim().split('\n');
    for(var i = 0; i < lineArray.length; i++){
        var lineAsInts1 = lineArray[i].trim().split(/(\s+)/);
        var lineAsInts= lineAsInts1.filter(n => isANumber(n));
        if(i == 0){
            framerate = parseInt(lineAsInts, 10);
            continue;
        }
        if(parseInt(lineAsInts[1],10) == 1 && parseInt(lineAsInts[2]) == 0){ //P1 input
            p1InputArray.push(parseInt(lineAsInts[0],10));
        }
        else if(parseInt(lineAsInts[1],10) == 1 && parseInt(lineAsInts[2]) == 1){ //P2 input
            p2InputArray.push(parseInt(lineAsInts[0],10));
        }
    }
}

document.getElementById('upload').addEventListener('change', async () =>{
    const fr = new FileReader();
    const file = document.getElementById('in').files[0];
    fr.readAsText(file);
    fr.onload = (() => {
        document.getElementById('textbox').value = fr.result;    
        document.getElementById('noFile').innerHTML = file.name;
        document.getElementById('noFile').style.fontWeight = 'bold';
        document.getElementById('noFile').style.fontSize = '15px';
        macroName = file.name.split('.').slice(0,-1).join('.');
    });     
});

document.getElementById('help-area').addEventListener('click', async () =>{
    document.getElementById('help-box').style.display='block';
});

document.getElementById('close-button').addEventListener('click', async () =>{
    document.getElementById('help-box').style.display='none';
});

document.getElementById('help-area-2').addEventListener('click', async () =>{
    document.getElementById('help-box-2').style.display='block';
});

document.getElementById('close-button-2').addEventListener('click', async () =>{
    document.getElementById('help-box-2').style.display='none';
});

document.getElementById('culling').addEventListener('change', async () =>{
    if(document.getElementById('culling').value === 'Min'){
        reportP1MinResults();
        reportP2MinResults();
    }
    else if(document.getElementById('culling').value === 'Max'){
        reportP1MaxResults();
        reportP2MaxResults();
    }
    else{
        reportP1Results();
        reportP2Results();
    }
});

function reportP1MinResults(){
    document.getElementById('outbox1').value = '';
    if(p1Rule1Breaks.length == 0 && p1Rule2MinCull.length == 0
        && p1Rule3MinCull.length == 0){
        document.getElementById('check1').style.visibility = 'visible';
        document.getElementById('outbox1').value = "Rule 1 violations:\n[none]\n\n";
        document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n[none]\n\n";
        document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n[none]";
    }
    else{
        if(p1Rule1Breaks.length == 0){
            document.getElementById('outbox1').value = "Rule 1 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 1 violations:\n";
            for(var i = 0; i < p1Rule1Breaks.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule1Breaks[i];
            }
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "\n";
        }
        if(p1Rule2MinCull.length == 0){
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n";
            for(var i = 0; i < p1Rule2MinCull.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule2MinCull[i];
            }
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "\n";
        }
        if(p1Rule3MinCull.length == 0){
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n[none]";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n";
            for(var i = 0; i < p1Rule3MinCull.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule3MinCull[i];
            }
        }
        document.getElementById('cross1').style.visibility = 'visible';
    }
}

function reportP2MinResults(){
    document.getElementById('outbox2').value = '';
    if(p2Rule1Breaks.length == 0 && p2Rule2Breaks.length == 0
        && p2Rule3Breaks.length == 0){
        document.getElementById('check2').style.visibility = 'visible';
        document.getElementById('outbox2').value = "Rule 1 violations:\n[none]\n\n";
        document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n[none]\n\n";
        document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 3 violations:\n[none]";
    }
    else{
        if(p2Rule1Breaks.length == 0){
            document.getElementById('outbox2').value = "Rule 1 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 1 violations:\n";
            for(var i = 0; i < p2Rule1Breaks.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule1Breaks[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        if(p2Rule2MinCull.length == 0){
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n";
            for(var i = 0; i < p2Rule2MinCull.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule2MinCull[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        if(p2Rule3MinCull.length == 0){
            document.getElementById('outbox2').value = document.getElementById('outbox2').value +"Rule 3 violations:\n[none]";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 3 violations:\n";
            for(var i = 0; i < p2Rule3MinCull.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule3MinCull[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        document.getElementById('cross2').style.visibility = 'visible';
    }
}

function reportP1MaxResults(){
    document.getElementById('outbox1').value = '';
    if(p1Rule1Breaks.length == 0 && p1Rule2MaxCull.length == 0
        && p1Rule3MaxCull.length == 0){
        document.getElementById('check1').style.visibility = 'visible';
        document.getElementById('outbox1').value = "Rule 1 violations:\n[none]\n\n";
        document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n[none]\n\n";
        document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n[none]";
    }
    else{
        if(p1Rule1Breaks.length == 0){
            document.getElementById('outbox1').value = "Rule 1 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 1 violations:\n";
            for(var i = 0; i < p1Rule1Breaks.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule1Breaks[i];
            }
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "\n";
        }
        if(p1Rule2MaxCull.length == 0){
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 2 violations:\n";
            for(var i = 0; i < p1Rule2MaxCull.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule2MaxCull[i];
            }
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "\n";
        }
        if(p1Rule3MaxCull.length == 0){
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n[none]";
        }
        else{
            document.getElementById('outbox1').value = document.getElementById('outbox1').value + "Rule 3 violations:\n";
            for(var i = 0; i < p1Rule3MaxCull.length; i++){
                document.getElementById('outbox1').value = document.getElementById('outbox1').value + p1Rule3MaxCull[i];
            }
        }
        document.getElementById('cross1').style.visibility = 'visible';
    }
}

function reportP2MaxResults(){
    document.getElementById('outbox2').value = '';
    if(p2Rule1Breaks.length == 0 && p2Rule2MaxCull.length == 0
        && p2Rule3MaxCull.length == 0){
        document.getElementById('check2').style.visibility = 'visible';
        document.getElementById('outbox2').value = "Rule 1 violations:\n[none]\n\n";
        document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n[none]\n\n";
        document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 3 violations:\n[none]";
    }
    else{
        if(p2Rule1Breaks.length == 0){
            document.getElementById('outbox2').value = "Rule 1 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 1 violations:\n";
            for(var i = 0; i < p2Rule1Breaks.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule1Breaks[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        if(p2Rule2MaxCull.length == 0){
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n[none]\n\n";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 2 violations:\n";
            for(var i = 0; i < p2Rule2MaxCull.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule2MaxCull[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        if(p2Rule3MaxCull.length == 0){
            document.getElementById('outbox2').value = document.getElementById('outbox2').value +"Rule 3 violations:\n[none]";
        }
        else{
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "Rule 3 violations:\n";
            for(var i = 0; i < p2Rule3MaxCull.length; i++){
                document.getElementById('outbox2').value = document.getElementById('outbox2').value + p2Rule3MaxCull[i];
            }
            document.getElementById('outbox2').value = document.getElementById('outbox2').value + "\n";
        }
        document.getElementById('cross2').style.visibility = 'visible';
    }
}