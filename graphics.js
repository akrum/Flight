/**
 * Created by akrum on 01.03.17.
 */
var globalRopePosition=0;
var globalSignsPosition=0;
var canUseVerticalScrolling=true;
var mouseEvent= function (evnt) {
        if(evnt.deltaX!=0) canUseVerticalScrolling=false;
        if(globalSignsPosition-evnt.deltaX/2>=0)globalSignsPosition=0;
        else
        {
            globalSignsPosition-=evnt.deltaX/2;
            globalRopePosition-=evnt.deltaX/2;
        }
        if(canUseVerticalScrolling)
        {
            if(globalSignsPosition-evnt.deltaY/2>=0)globalSignsPosition=0;
            else
            {
                globalSignsPosition-=evnt.deltaY/2;
                globalRopePosition-=evnt.deltaY/2;
            }
        }
        document.getElementById("pageRope").style.backgroundPositionX=globalRopePosition+"px";
        document.getElementById("pageSigns").style.left=globalSignsPosition+"px";

};
var mouseOverBars=function (evnt) {
    document.getElementById("popoverWindow").style.visibility="visible";
    var objectsToBlur = document.getElementsByClassName("blurred-object");
    for(var i=0;i<objectsToBlur.length;i++)
    {
        objectsToBlur[i].style.filter="blur(3px)";
        objectsToBlur[i].style.pointerEvents="none";
    }
    console.log("Will show popover");
};
var mouseNotOverBars=function (evnt) {
    document.getElementById("popoverWindow").style.visibility="hidden";
    var objectsToBlur = document.getElementsByClassName("blurred-object");
    for(var i=0;i<objectsToBlur.length;i++)
    {
        objectsToBlur[i].style.filter="none";
        objectsToBlur[i].style.pointerEvents="all";
    }
    console.log("Will hide popover");
};
document.body.addEventListener("wheel",mouseEvent);
document.getElementById("bars-picker").addEventListener("mouseover",mouseOverBars);
document.getElementById("popoverWindow").addEventListener("mouseleave",mouseNotOverBars);

// console.log("position:"+parseInt(document.getElementById("pageRope0").style.left,10));
// document.getElementById("pageSigns").style.top=document.getElementById("pageRope0").style.top;