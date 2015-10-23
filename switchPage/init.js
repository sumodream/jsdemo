var get={
    byId:function(id){
        return document.getElementById(id);
    },
    byClass:function(aClass,parent){
        if(document.getElementsByClassName){
            return document.getElementsByClassName(aClass);
        }
        var aParent=parent?get.byId(parent):document,
            Aclass=[],
            elems=aParent.getElementsByTagName("*");
        for(var i= 0,l=elems;i< l.length;i++){
            if(l[i].className == aClass){
                Aclass.push(l[i]);
            }
        }
        return Aclass;
    },
    byTagName:function(tag,parent){
        return (parent || document).getElementsByTagName(tag);
    }
};
var method={ 
    addEvent:function(obj,type,fn){
        if(document.addEventListener){
            obj.addEventListener(type,fn,false);//非IE
        }else if(document.attachEvent){
            obj.attachEvent("on"+type,fn);//IE
        }
        obj["on"+type]=fn;
    },
    removeEvent:function(obj,type,fn){
        if(document.removeEventListener){
            obj.removeEventListener(type,fn);
        }else if(document.detachEvent){
            obj.detachEvent("on"+type,fn);
        }
        obj["on"+type]=null;
    }
};
window.onload=function(){
    var body=get.byTagName("body")[0];
    var wrap=get.byId("wrap")  ;
    var page=get.byClass("page");
    var h=null;
    var menu=get.byClass("menu")[0];
    var nodes=[];
    var iIndex=0;
    var nowTop=0;
    var nextTop=0;
    var playing=true;
    var timer=null;
    var speed=null;
    for(var i=0;i<page.length;i++){
        nodes[i]=document.createElement("li");
        nodes[i].index=i;
        menu.appendChild(nodes[i]);
        nodes[i].onclick=function(){
            win.scrollTop();
            iIndex=this.index;
            win.animate();
        }
    }
    if(page.length>0){
        nodes[0].className=nodes[0].className==""?"active":nodes[0].className+" active";
    }
    var win={
        changeBodyHeight:function(){
            h=document.documentElement.clientHeight || document.body.clientHeight;
            body.style.height=h+"px";
        },
        changePageHeight:function(){
            for(var i=0;i<page.length;i++){
                page[i].style.height=h+"px";
            }
        },
        scrollTop:function(){
            nowTop=iIndex*h;
        },
        animate:function(){
            if(!playing){
                return false;
            }
            nextTop=iIndex*h;
            if(nextTop == nowTop){
                return false;
            }
            playing=false;
            timer=setInterval(function(){
                if(nextTop > nowTop){
                    speed -=30;
                    (speed < -nextTop)&&(speed = -nextTop);
                }else{
                    speed +=30;
                    (speed > -nextTop)&&(speed = -nextTop);
                }
                wrap.style.top=speed+"px";
                if(speed == -nextTop){ 
                    clearInterval(timer);
                    playing=true;
                    for(var i=0;i<nodes.length;i++){
                        nodes[i].className=nodes[i].className==""?"":nodes[i].className.replace(/active|\sactive|active\s|\sactive\s/i,"");
                    }
                    nodes[iIndex].className="active";
                }
            },10)
        },
        ScrollEvent:function(e){
            if(e.addEventListener){
                method.addEvent(e,"mousewheel DOMMouseScroll",win.scrollFnc)
            }
            e.onmousewheel=win.scrollFnc;
        },
        scrollFnc:function(e){
            if(!playing){
                return false;
            }
            var e=e||window.event;
            var t=null;
            win.scrollTop();
            if(e.wheelDelta){
                t= e.wheelDelta;
                t>0?iIndex--:iIndex++;
            }else if(e.detail){
                t= e.detail;
                t<0?iIndex--:iIndex++;
            }
            loop = true ;
            win.changeIndex();
            win.animate();
            e.preventDefault();
        },
        changeIndex:function(){
            iIndex=iIndex>=page.length?page.length-1:iIndex;
            iIndex=iIndex<0?0:iIndex;
        }
    };
    win.changeBodyHeight();
    win.changePageHeight();
    win.ScrollEvent(document);
    window.onresize=function(){
        setTimeout(function(){
            win.changeBodyHeight();
            win.changePageHeight();
            wrap.style.top= -(iIndex*h)+"px"
        },500);
    }
};