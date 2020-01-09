const modulesList = [
    'N/action',
    'N/auth',
    'N/cache',
    'N/certificateControl',
    'N/config',
    'N/crypto',
    'N/crypto/certificate',
    'N/currency',
    'N/currentrecord',
    'N/email',
    'N/encode',
    'N/error',
    'N/file',
    'N/format',
    'N/format/i18n',
    'N/http',
    'N/https',
    'N/https/clientCertificate',
    'N/keyControl',
    'N/log',
    'N/plugin',
    'N/portlet',
    'N/query',
    'N/record',
    'N/redirect',
    'N/render',
    'N/runtime',
    'N/search',
    'N/sftp',
    'N/sso',
    'N/task',
    'N/task/accounting/recognition',
    'N/transaction',
    'N/translation',
    'N/ui/dialog',
    'N/ui/message',
    'N/ui/serverWidget',
    'N/url',
    'N/util',
    'N/workflow',
    'N/xml',
];

//add tooltip
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });


//Set modules count
document.getElementById('modulesCount').textContent = modulesList.length;

//Create buttons for all modules
var modueButtonGroups = document.createElement('div');
modueButtonGroups.className = 'btn-group btn-group-lg';

for(let m=0; m<modulesList.length; m++){
    var btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.type = 'button';
    btn.id = 'btnmodule' + m;
    btn.name = modulesList[m].substring(modulesList[m].lastIndexOf('/') + 1);
    btn.value = 0;
    btn.onclick = moduleBtnClick;
    btn.innerText = modulesList[m];
    modueButtonGroups.appendChild(btn);
}

//add buttons group to the page
document.getElementById('moduleButtonContainer').appendChild(modueButtonGroups);

function moduleBtnClick (){
    

    //change btn atributes
    if(this.value == 0){ //Being Selected
        var currentBtn = document.getElementById(this.id);
        currentBtn.value = 1;
        currentBtn.className = 'btn btn-success';
    }else{      //being un selected
        var currentBtn = document.getElementById(this.id);
        currentBtn.value = 0;
        currentBtn.className = 'btn btn-primary';
    }
    //refresh Text
    refreshJSDocTxt();
}

//jsdoctext
function refreshJSDocTxt(){
    var selectedBtnCount = 0;
    var finalTxt = '';

    for(let m=0; m<modulesList.length; m++){
        var currentBtn = document.getElementById('btnmodule' + m);
        if(currentBtn.value == 1){ //selected
            finalTxt += 
            `/**
 * @param {${currentBtn.name}} ${currentBtn.name}
 * @returns boolean
 */
 `;
            selectedBtnCount += 1;
        }
    }
    //set selected btn cunt
    document.getElementById('selectedmodulesCount').innerText = selectedBtnCount;

   //set the text to UI
    document.getElementById('jsdoctext').innerHTML = finalTxt;
}

function copyToClipboard(){
    var jsDocTxt = document.getElementById('jsdoctext').value;
    
    const el = document.createElement('textarea');
    el.value = jsDocTxt;

    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

}

function clearModuleSelection(){
    //set module selection count to 0
    document.getElementById('selectedmodulesCount').innerText = '';

    //clear JSDoc Tag text
    document.getElementById('jsdoctext').innerHTML = '';

    //clear all button selection
    for(let m=0; m<modulesList.length; m++){
        var currentBtn = document.getElementById('btnmodule' + m);
        currentBtn.value = 0;
        currentBtn.className = 'btn btn-primary';
    }
}