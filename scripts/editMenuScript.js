/**
 * Created by akrum on 25.03.17.
 */
function blurSiteElements() {
    var objectsToBlur = document.getElementsByClassName("blurred-object");
    for(var i=0;i<objectsToBlur.length;i++)
    {
        objectsToBlur[i].style.filter="blur(3px)";
        objectsToBlur[i].style.pointerEvents="none";
    }
}
function unblurSiteElements() {
    var objectsToBlur = document.getElementsByClassName("blurred-object");
    for (var i = 0; i < objectsToBlur.length; i++) {
        objectsToBlur[i].style.filter = "none";
        objectsToBlur[i].style.pointerEvents = "all";
    }
}
function startComposeThing(evnt) {
    console.log("Opening edit menu");
    document.getElementById("editMenu").style.display="inline";
    blurSiteElements();
    evnt.preventDefault();
    stopScrolling();
}
function endComposeThing(evnt) {
    document.getElementById("editableDiv").innerText="";
    document.forms.editMenu.articleTitle.value="";
    document.getElementById("editMenu").style.display="none";
    unblurSiteElements();
    startScrolling();
    if(evnt) evnt.preventDefault();
}
function gotCopyPaste(evnt) {
    var clipboardData, pastedData;

    // Stop data actually being pasted into div
    evnt.stopPropagation();
    evnt.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = evnt.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
    // Do whatever with pasteddata
    this.innerHTML+=pastedData;
}
function saveChangesButtonClicked(evnt) {
    evnt.preventDefault();
    var tempArticle=
        {
            id:-1,
            title:document.forms.editMenu.articleTitle.value,
            summary:document.getElementById("editableDiv").innerText.slice(0,50)+"...",
            createdAt:new Date(),
            author: userName,
            content:document.getElementById("editableDiv").innerText,
            tags:["TECH","DEMO"]
        };
    if(articleService.validateArticle(tempArticle))
    {
        articleService.addArticle(tempArticle);
        tagService.updateArticles();
        console.log("Successfully added article:");
        console.log("tempArticle");
        endComposeThing();
    }
    else
    {
        alert("check article contents please");
        console.log("article: ");
        console.log(tempArticle);
    }
}
document.getElementById("composeButton").addEventListener("click",startComposeThing);
document.forms.editMenu.editMenuCancelButton.addEventListener("click",endComposeThing);
document.getElementById("editableDiv").addEventListener("paste",gotCopyPaste);
document.forms.editMenu.editMenuDoneButton.addEventListener("click",saveChangesButtonClicked);