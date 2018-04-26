let htmlFile=document.getElementById('htmlFile');

htmlFile.onchange=function(activeTab){
    var input = event.target;
    var reader = new FileReader();
    var searchKey=document.getElementById('searchKey').value;
    reader.onload = function(){
        var dataURL = reader.result;
        document.getElementById("code-to-scan").innerHTML=dataURL;
        scanDocument(searchKey);
    };
    var result = reader.readAsText(input.files[0]);
}

const scanDocument=(arg)=> {
    var totalElements=document.getElementsByClassName(arg).length;
    var arrayElements="";
    for(var compteur=0;compteur<totalElements;compteur++){
      var urlFromHtml=document.getElementsByClassName(arg)[compteur].getAttribute('href');
      console.log(document.getElementsByClassName(arg)[compteur].nodeValue);
      if(urlFromHtml!='javascript:void(0)'){
            arrayElements=arrayElements+"<p>"+urlFromHtml+"</p>";
            if(document.getElementById("optionOpenUrlsOn").checked){
                console.log("Option Open Urls ON");
                openPage(urlFromHtml);
            }
      }
    }
    document.getElementById("total-count").innerHTML=totalElements-1;
    document.getElementById("list-urls").innerHTML=arrayElements;
    copyElement(document.getElementById("list-urls"));
  }

const openPage=(urlIn)=>{
    chrome.tabs.create({ url: urlIn , selected: false});
    console.log("url || "+urlIn+" || ok");
}

const copyElement=(el)=>{
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand("Copy");
}
