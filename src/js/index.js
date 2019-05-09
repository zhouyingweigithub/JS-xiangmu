window.onload=function(){

    var img=document.getElementById("img");
    var tupian=img.getElementsByTagName("div");
    var focus=document.getElementById("focus");
    var jiaodian=focus.getElementsByTagName("div");
    var center=document.getElementById("csf-center");


    var left=document.getElementById("nav-left");
    var iconf=document.getElementsByClassName("iconf");
    var h3=left.getElementsByTagName("h3")
    var li=left.getElementsByTagName("li");
    var div=left.getElementsByTagName("div");

    var aaa=left.getElementsByTagName("a");

    var brandR=document.getElementById("brand-r");
    var brandC=document.getElementById("brand-center");
    var brandA=brandC.getElementsByTagName("a");
    var makeup=document.getElementById("makeup");
    var ul=makeup.getElementsByTagName("ul");
    var butR=document.getElementById("button-right");
    var butL=document.getElementById("button-left");
    var img=makeup.getElementsByClassName("img");
    var name=makeup.getElementsByClassName("name");
    var sost=makeup.getElementsByClassName("sost");
    var amount=makeup.getElementsByClassName("amount");
    var prand=makeup.getElementsByClassName("prand");

    var img2=document.getElementsByClassName("img2");
    var name2=document.getElementsByClassName("name2");
    var price2=document.getElementsByClassName("price2");
    var sold2=document.getElementsByClassName("sold2");
    var bacth2=document.getElementsByClassName("bacth2");


    var carousel=this.document.getElementById("carousel");
    var gouwuche=document.getElementById("gouwuche");

    var text=this.document.getElementById("text");
    var shou=this.document.getElementById("shou");

    gouwuche.onclick=function(){ //跳转购物车
        location.href="html/shopping.html?";
    }

    var a=2;                       //初始下标
    yidong();
    dingshi=setInterval(yidong,3000);  //定时器

    function yidong() {          //移动函数
        a++;
        for(let i=0;i<tupian.length;i++){
            tupian[i].style.zIndex=0;
            tupian[i].style.opacity=0;
        }
        if(a>=tupian.length){
            a=0;
        }
        tupian[a].style.opacity=1;
        tupian[a].style.zIndex=1;
        tupian[a].style.transition="all "+0.5+"s";
        gaoliang(a);
    }

        for(let i=0;i<jiaodian.length;i++){     //获取焦点点击时的下标
            jiaodian[i].onclick=function(){   
                for(let  i=0;i<tupian.length;i++){
                    tupian[i].style.zIndex=0;
                    tupian[i].style.opacity=0;
                 }      
            tupian[i].style.zIndex=1;
            tupian[i].style.opacity=1;
            tupian[i].style.transition="all "+1+"s"; 
            gaoliang(i);  
                }
            }

    function gaoliang(a){                     //焦点高亮函数
        for(let i=0;i<tupian.length;i++){
            jiaodian[i].style.background="#666666";  //全部清空
            }
            jiaodian[a].style.background="#ff0000";      //根据a的值来显示
            
            }

        center.onmouseover=function(){        //鼠标移动进范围后关闭定时器
            clearInterval(dingshi);
        }
        center.onmouseout=function(){            //鼠标移除后开启定时器
            dingshi=setInterval(yidong,3000);
        }

        focus.onmouseover=function(){        //鼠标移动进焦点后关闭定时器
            clearInterval(dingshi);
        }
        focus.onmouseout=function(){            //鼠标移除后开启定时器
            dingshi=setInterval(yidong,3000);
        }

        var Y=0;
        function iconf1(){              //菜单栏小图标变化函数
            iconf[0].style.backgroundPositionY=-80+"px";
            iconf[1].style.backgroundPositionY=-40+"px";
            iconf[2].style.backgroundPositionY=-0+"px";
            iconf[3].style.backgroundPositionY=-120+"px";
        }
        iconf1();
        function caidanx(i) {
            for(let i=0;i<li.length;i++){         //排他效果
                li[i].style.background="#fff";  
                div[i].style.display="none";
                div[i].style.right=-200+"px";
                div[i].style.opacity=0;
                h3[i].style.color="#00000";
                iconf1();
            }
            li[i].style.background="#dfdfdf";      //添加效果
            div[i].style.display="block";
            div[i].style.right=-560+"px";
            div[i].style.opacity=1;
            h3[i].style.color="#df3442";
            if(i==0){
                Y=-80;
            }else if(i==1){
                Y=-40;
            }else if(i==2){
                Y=-0;
            }else if(i==3){
                Y=-120;
            }
            iconf[i].style.backgroundPositionY=(Y-20)+"px";
        }

        for(let i=0;i<li.length;i++){
        li[i].onmouseover=function() {      //鼠标移进一级分类栏，菜单栏显示
            caidanx(i);
        }
        div[i].onmouseover=function() {      //鼠标移进二级分类栏，菜单栏显示
            caidanx(i);
        }
    }

    for(let i=0;i<li.length;i++){       //鼠标移除，菜单栏隐藏
        li[i].onmouseout=function() {
                li[i].style.background="#fff";
                div[i].style.display="none";
                h3[i].style.color="#000000";
                iconf[i].style.backgroundPositionY=Y+"px";
        }
        div[i].onmouseout=function() {
            li[i].style.background="#fff";
            div[i].style.display="none";
            h3[i].style.color="#000000";
            iconf[i].style.backgroundPositionY=Y+"px";
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }

    shou.onclick=function(){ //点击搜索的时候跳到列表页
        var tex=text.value;
        location.href="html/list.html?"+tex;
    }


    for(let i=0;i<aaa.length;i++){ //点击分类的时候跳到列表页
        aaa[i].onclick=function () {
            var biaoqian=aaa[i].innerHTML;
            location.href="html/list.html?"+biaoqian;  //跳转到下一个页面，并带一个标签过去
        }
    }

    var juli=0;
    butR.onclick=function() { //热批商品移动过渡效果
        juli+=1165;
        ul[0].style.left=-juli+"px";
        ul[0].style.transition="all "+1+"s";
        if(juli>=3495){
            juli=0;
            ul[0].style.left=juli+"px";
            ul[0].style.transition="all "+1+"s";
        }
    }
    butL.onclick=function() {
        juli-=1165;
        ul[0].style.left=-juli+"px";
        ul[0].style.transition="all "+1+"s";
        if(juli<0){
            juli=2330;
            ul[0].style.left=-juli+"px";
            ul[0].style.transition="all "+1+"s";
        }
    }

    function pinpainame(f){  //热门品牌渲染
        var url="api/api.php";
        var data=f;    
        ajax("post",url,data,function(str){
        var arr=JSON.parse(str);
        // console.log(arr);
        var html=arr.map(function(item) {
            return `<li><a href=""><img src="${item.url}" alt="">${item.name}</a></li>`
        }).join("");
        var html2=` <li class="brand-h"><a href=""><div><img src="img/index-img/pinpai/brand_more.png" alt=""></div>更多品牌>><a></li>`
        brandR.style.opacity=0;
        dingshi3=setTimeout(yidong3,300);
        function yidong3(){
            brandR.innerHTML=html+html2;
            brandR.style.opacity=1;
            brandR.style.transition="all "+500+"ms";
        }      
    })
    hh++;
    }

    for(let i=0;i<brandA.length;i++){  //品牌分类移动变色
        brandA[i].onmouseover=function(){
            for(let j=0;j<brandA.length;j++){
                brandA[j].className="";
            }
            brandA[i].className="target";
            if(i==0){
                var f="jiekou=xuanran&biao=brand&leixing=brandCenter3&mingcheng=全部品牌&tiao=0&tiao2=13";
                pinpainame(f)
            }
            if(i==1){
                var f="jiekou=xuanran&biao=brand&leixing=brandCenter&mingcheng=韩国品牌&tiao=0&tiao2=13";
                pinpainame(f)
            }
            if(i==2){
                var f="jiekou=xuanran&biao=brand&leixing=brandCenter&mingcheng=日本品牌&tiao=0&tiao2=13";
                pinpainame(f)
            }
            if(i==3){
                var f="jiekou=xuanran&biao=brand&leixing=brandCenter&mingcheng=欧美品牌&tiao=0&tiao2=13";
                pinpainame(f)
            }
            if(i==4){
                var a="jiekou=xuanran&biao=brand&leixing=brandCenter&mingcheng=国产品牌&tiao=0&tiao2=13";
                pinpainame(a)
            }
            if(i==5){
                var f="jiekou=xuanran&biao=brand&leixing=brandCenter2&mingcheng=可授权品牌&tiao=0&tiao2=13";
                pinpainame(f)
            }
            if(i==6){
                var f="jiekou=xuanran&biao=brand&leixing=brandCenter&mingcheng=其他品牌&tiao=0&tiao2=13";
                pinpainame(f)
            }
        }
    }

    var hh=1;
    window.onscroll=function(){
    var h=window.innerHeight; //窗口的高度
    var gaodu=window.scrollY; //滚动的距离
    var gh=h+gaodu; 
    if(hh==1){
        if(gh>=700){
        var f="jiekou=xuanran&biao=brand&leixing=brandCenter3&mingcheng=全部品牌&tiao=0&tiao2=13";
        pinpainame(f);
    }
    }
    if(hh==2){
    if(gh>=1200){
        var shuju="jiekou=xuanran&biao=list&leixing=label&mingcheng=热批商品&tiao=0&tiao2=15"; //热批商品渲染
        xunran(shuju);
    }
    }
    if(hh==3){
    if(gh>=1800){
        var shuju2="jiekou=xuanran&biao=list&leixing=ttt&mingcheng=彩妆&tiao=0&tiao2=8"; //彩妆渲染
        var fanwei=0;
        var fanwei2=8;
        xunran2(shuju2,fanwei,fanwei2);
    }
    }
    if(hh==4){
    if(gh>=2600){
        var shuju2="jiekou=xuanran&biao=list&leixing=ttt&mingcheng=面膜&tiao=0&tiao2=8"; //面膜渲染
        var fanwei=8;
        var fanwei2=16;
        xunran2(shuju2,fanwei,fanwei2);
    }
    }
    if(hh==5){
    if(gh>=3350){
        var shuju2="jiekou=xuanran&biao=list&leixing=ttt&mingcheng=护肤&tiao=0&tiao2=8"; //护肤渲染
        var fanwei=16;
        var fanwei2=24;
        xunran2(shuju2,fanwei,fanwei2);
    }
    }
    if(hh==6){
    if(gh>=4150){
        var shuju2="jiekou=xuanran&biao=list&leixing=ttt&mingcheng=个人护理&tiao=0&tiao2=8"; //个人护理渲染
        var fanwei=24;
        var fanwei2=32;
        xunran2(shuju2,fanwei,fanwei2);
            }
        }   
    }

    function xunran(shuju){  //热门品牌渲染函数
        var url="api/api.php";  
        var data=shuju;
        ajax("post",url,data,function(str){
        var arr=JSON.parse(str);
        // console.log(arr);
        for(let i=0;i<15;i++){
            img[i].innerHTML="<img src='"+arr[i].img+"'alt=''>";
            name[i].innerHTML="<a href=''>"+arr[i].name+"</a>";
            sost[i].innerHTML="价格:"+arr[i].price;
            amount[i].innerHTML="已售:"+arr[i].sold+"件";
            prand[i].innerHTML="品牌:"+arr[i].brand;
        }
    })
    hh++;
    }
    
    function xunran2(shuju2,fanwei,fanwei2){ //商品渲染
    var url="api/api.php";
    var data=shuju2;
    ajax("post",url,data,function(str){
        var arr=JSON.parse(str);
        // console.log(arr);
        var a=0;
        for(let i=fanwei;i<fanwei2;i++){
            img2[i].innerHTML="<img src='"+arr[a].img+"'alt=''>";
            name2[i].innerHTML="<i>"+arr[a].trade+"<em>该商品按"+arr[a].trade+"交易方式进出口</em></i>"+arr[a].name+"</p>";
            price2[i].innerHTML="价格:"+arr[a].price;
            sold2[i].innerHTML="已售:"+arr[a].sold+"件";
            bacth2[i].innerHTML="起批量>"+arr[a].batch+"件";
            a++;
        }
     })
     hh++;
    }

    dingshi2=setInterval(yidong2,2000); //轮播条定时器
    var topY=0;
    var boxY=carousel.offsetHeight;
    function yidong2(){
        topY+=23;
        if(topY>=boxY){
            topY=0;
        carousel.style.position="absolute";
        carousel.style.top=-topY+"px";
        }
        carousel.style.position="absolute";
        carousel.style.top=-topY+"px";
        carousel.style.transition="all "+500+"ms";
    }

    var use=this.document.getElementById("use");
    var cke=(document.cookie); //获取cookie，字符串
    var shuzu=cke.split("=");  //根据=号截取，转成数组
    var uid=shuzu[1];       //获取数组的第二个
    if(shuzu.length>=2){
        var url="api/api.php";    //首页用户信息接口
        var data="jiekou=xuanran&biao=user&leixing=id&mingcheng="+uid+"&tiao=0&tiao2=1";
        ajax("post",url,data,function(str){
        var arr=JSON.parse(str);
        var html=arr.map(function(item) {
            return `您好，欢迎来到 NALA！ 【 <a  href="javascript:;">${item.name}</a><s>&nbsp;|&nbsp;</s><a id="tuichu" href="javascript:;">退出</a> 】`
        });

        var html2=arr.map(function(item) {
            return ` <h3>hi-<em>${item.name}</em></h3>
            <div>
                <span>现货：</span>
                <span>
                    <a href="">${item.fu}</a>
                    <br>
                    待付款
                </span>
                <span>
                    <a href="">${item.shou}</a>
                    <br>
                    待收货
                </span>
            </div>
            <div>
                <span>订货：</span>
                <span>
                    <a href="">0</a>
                    <br>
                    待付款
                </span>
                <span>
                    <a href="">0</a>
                    <br>
                    待收货
                </span>
            </div>`
        });
        use.innerHTML=html;  //渲染用户信息
        use2.innerHTML=html2;

        var tuichu=document.getElementById("tuichu"); //退出和删除cookie
        tuichu.onclick=function(){
            var exp = new Date(); 
            exp.setTime(exp.getTime() - 1); 
            document.cookie = "use" + "=" + escape("111") + ";expires=" + exp.toGMTString() + ";path=/zhouyingwei-xiangmu";//删除cookie
            use.innerHTML=` 您好，欢迎来到 NALA！ 【 <a href="html/Login.html">请登录</a><s>&nbsp;</s><a href="html/register.html">免费注册</a> 】`;
            use2.innerHTML=`<h3>Hi~欢迎来到NALA</h3>
            <input type="button" value="登录" id="deng">
            <input type="button" value="注册" id="zhu">`;
        }
        });
    }else{
        var deng=this.document.getElementById("deng");
        var zhu=document.getElementById("zhu");
        deng.onclick=function () {
            location.href="html/Login.html?";
        }
        zhu.onclick=function () {
            location.href="html/register.html?";
        }
    }
    

    }