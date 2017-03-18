/**
 * Created by akrum on 18.03.17.
 */

var tagService = (function () {
    var availableTags=[];
    var chosenTags=[];
    var chosenTagsHTMLContainer;
    var availableTagsHTMLContainer;
    function rgb(r, g, b){
        return "rgb("+r%256+","+g%256+","+b%256+")";
    }
    var allTags = [];
    function buildOneTag(tagName,attributes,innerText) {
        var result="<";
        result+=tagName;
        result+=" "+attributes;
        result+=">\n";
        if(innerText !== undefined)
        {
            result+=innerText;
            result+="</";
            result+=tagName;
            result+=">\n";
        }

        return result;
    }
    function buildAttribute(attributeName, innerString) {
        var result=(attributeName+'="');
        result+=innerString+('" ');
        return result;
    }
    function refillChosenHTML() {
        var tempResult = "";
        chosenTags.forEach(function (chosenTag) {
            tempResult+=buildOneTag("button",buildAttribute("class","tag-pick-field-chosen")+buildAttribute("style","border: 2px solid "+chosenTag.color),chosenTag.tag)
        });
        console.log(tempResult);
        chosenTagsHTMLContainer.innerHTML=tempResult;
    }
    function refillAvailableHTML() {
        var tempResult = "";
        availableTags.forEach(function (availableTag) {
            tempResult+=buildOneTag("button",buildAttribute("class","tag-pick-field")+buildAttribute("style","border: 2px solid "+availableTag.color),availableTag.tag)
        });
        availableTagsHTMLContainer.innerHTML=tempResult;
    }
    function fillByDefault() {
        refillAvailableHTML();
        refillChosenHTML();
    }
    function init() {
        chosenTagsHTMLContainer= document.getElementById("chosenTagsID");
        availableTagsHTMLContainer = document.getElementById("availableTagsID");
        allTags = JSON.parse(localStorage.getItem("defaultTags"));
        for (var i = 0; i < 7; i++) {
            availableTags.push(allTags[i]);
        }
        for(var i=7;i<allTags.length;i++){
            chosenTags.push(allTags[i]);
        }
        fillByDefault();
    }

    return {
        init: init
    };
}());
document.addEventListener('DOMContentLoaded', startRoutine);
function startRoutine() {
    tagService.init();
}