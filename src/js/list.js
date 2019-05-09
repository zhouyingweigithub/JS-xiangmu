window.onload=function () {
    var left=this.document.getElementById("nav-left");
    var all=this.document.getElementById("all");
    var li=left.getElementsByTagName("li")
    var h3=left.getElementsByTagName("h3")
    var div=left.getElementsByTagName("div");
    var iconf=document.getElementsByClassName("iconf");

    var ul=document.getElementById("xunran");

    var box=this.document.getElementById("box");

    var shang=document.getElementById("shang");
    var zhong=document.getElementById("zhong");
    var xia=document.getElementById("xia");

    var hierarchy=document.getElementById("hierarchy");
    var gouwuche=document.getElementById("gouwuche");

    gouwuche.onclick=function(){ //跳转购物车
        location.href="../html/shopping.html?";
    }

    left.style.display="none"; //菜单栏隐藏
    all.onmouseover=function(){
        left.style.display="block";  //移进菜单栏显示
    }
    all.onmouseout=function(){
        left.style.display="none";  //移除隐藏
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
        if(i==0){     //小图标的背景位置
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

    var use=this.document.getElementById("use");
    var cke=(document.cookie); //获取cookie，字符串
    var shuzu=cke.split("=");  //根据=号截取，转成数组
    var uid=shuzu[1];       //获取数组的第二个
    if(shuzu.length>=2){
        var url="../api/api.php";    //用户信息接口
        var data="jiekou=xuanran&biao=user&leixing=id&mingcheng="+uid+"&tiao=0&tiao2=1";
        ajax("post",url,data,function(str){
        var arr=JSON.parse(str);
        var html=arr.map(function(item) {
            return `您好，欢迎来到 NALA！ 【 <a  href="javascript:;">${item.name}</a><s>&nbsp;|&nbsp;</s><a href="javascript:;">退出</a> 】`
        });
        use.innerHTML=html; //渲染用户信息
    });
        }

var tiao=0;  //要加载的条数
var tiao2=5;   //一次加载多少条数据
var isok=false; //懒加载开关
var chang=1;   //数据长度
var zongchang=0; //数据长度
var ye=1;        //分页页数
var yetiao=25;   //定义一页多少条数据
var paiisok1=false; //价格排序开关
var paiisok2=false; //销量排序开关
var pailei="";  //排序的类型 按价格 还是销量
var shengjiang1=1; //价格正反序开关
var shengjiang2=1; //销量正反序开关

var canshu=decodeURI(location.search).slice(1);//获取其它页面网址传输过来的参数

// if(canshu==""){  //如果内容为空搜索面膜贴
//     canshu="面膜贴";
// }

function jiazai(yetiao,tiao){   //懒加载 
    window.onscroll=function(){
        var gaodu=window.scrollY; //滚动的距离
        var h=box.offsetHeight-window.innerHeight;//盒子的高度-窗口的高度
        if(gaodu>=(h-200)){   //滚动距离大于200时加载
            if(chang!=0){
                if(tiao<=(yetiao-10)){
                    if(isok==true){   //懒加载开关
                        if(paiisok1==true){  //价格排序开关 打开执行价格排序
                            tiao+=5;
                            var  data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2+"&paixun="+pailei+"&shengjiang1="+shengjiang1;
                            isok=false;
                            xunran(data);
                        }else if(paiisok2==true){//销量排序开关 打开执行销量排序
                            tiao+=5;
                            var  data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2+"&paixun="+pailei+"&shengjiang2="+shengjiang2;
                            isok=false;
                            xunran(data);
                        }else{       //反之正常方式加载
                            tiao+=5;
                            var  data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2;
                            isok=false;
                            xunran(data);
                        }
                    }
                }
            }
        }   
    }   
}
    jiazai(yetiao,tiao);

    function chazong(){  //分页函数
        var zong=1000;
        var tiao=0;
        var url="../api/api.php";    
        var data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+zong;//获取数据总条数
        ajax("post",url,data,function(str){
        var arr=JSON.parse(str);
        zongchang=arr.length;       //获取数据的总长度
        ye=Math.ceil(zongchang/25);  //除一页25条 再向上取整 得出页数
        if(ye==0){         //如果页数等于0时渲染一页
            ye=1;
        }
        zhong.innerHTML="";      //清空分页
        for(var i=0;i<ye;i++){
            zhong.innerHTML+="<span>"+(i+1)+"</span>";  //渲染页数
        }
        var span=zhong.getElementsByTagName("span");

        var l=0;
        function chushi(l){       //页数添加高亮
            for(var j=0;j<span.length;j++){
                span[j].className="";
            }
            span[l].className="gaoliang"; //添加class名
        }
        chushi(l);

        xia.onclick=function () { //分页下一页
            if((l+1)<ye){
            l++;
            chushi(l);
            ul.innerHTML="";
            yetiao=(l+1)*25;
            tiao=(l+1)*25-30;
            chang=1;
            jiazai(yetiao,tiao);
            window.scrollTo(0,0); //窗口距离顶部的距离变成0
        }
    }

        shang.onclick=function () { //分页上一页
        if((l)>0){
            l--;
            chushi(l);
            ul.innerHTML="";
            yetiao=(l+1)*25;
            tiao=(l+1)*25-30;
            chang=1;
            jiazai(yetiao,tiao);
            window.scrollTo(0,0);
        }
    }

        for(let i=0;i<span.length;i++){  //分页中间的点击
            span[i].onclick=function(){                
                l=i;
                chushi(l);
                ul.innerHTML="";
                yetiao=(l+1)*25;
                tiao=(l+1)*25-30;
                chang=1;
                jiazai(yetiao,tiao);
                window.scrollTo(0,0);
            }
        }

        //分类栏点击搜索
        var left=document.getElementById("nav-left");
        var aaa=left.getElementsByTagName("a");
        for(let i=0;i<aaa.length;i++){
            aaa[i].onclick=function () {
                canshu=aaa[i].innerHTML;
                yetiao=25;
                tiao=0;
                chang=1;
                paiisok1=false; //关闭排序开关
                paiisok2=false;
                ul.innerHTML="";
                zhong.innerHTML="";
                var  data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2;
                xunran(data);
                chazong();
                jiazai(yetiao,tiao);
            }
        }

        //搜索栏点击搜索
        var shou=this.document.getElementById("shou");
        var text=document.getElementById("text");
        shou.onclick=function () {      
            canshu=text.value;
            yetiao=25;
            tiao=0;
            chang=1;
            paiisok1=false;
            paiisok2=false;
            ul.innerHTML="";
            zhong.innerHTML="";
            var  data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2;
            xunran(data);
            chazong();
            jiazai(yetiao,tiao);
        }

        //层级渲染函数
        function cengxaunran(){
        hierarchy.innerHTML="";
        if(arr.length!=0){   //数据长度不等于0时才渲染
        if(canshu==arr[0].ttt){
            hierarchy.innerHTML='<a href="javascript:;">'+arr[0].ttt+'</a><i>></i>';
        }
        else if(canshu==arr[0].yyy){
            hierarchy.innerHTML+='<a href="javascript:;">'+arr[0].ttt+'</a><i>></i>';
            hierarchy.innerHTML+='<a href="javascript:;">'+arr[0].yyy+'</a><i>></i>';
        }
        else if(canshu==arr[0].ppp){
            hierarchy.innerHTML+='<a href="javascript:;">'+arr[0].ttt+'</a><i>></i>';
            hierarchy.innerHTML+='<a href="javascript:;">'+arr[0].yyy+'</a><i>></i>';
            hierarchy.innerHTML+='<a href="javascript:;">'+arr[0].ppp+'</a><i>></i>';
        }
        else if(canshu!=arr[0].ttt && canshu!=arr[0].yyy && canshu!=arr[0].ppp){
            hierarchy.innerHTML+='<a href="javascript:;">'+canshu+'</a><i>></i>';
            }
        }
    }
            cengxaunran();

        //点击层级搜索
        var cengji=hierarchy.getElementsByTagName("a");  
        for(let i=0;i<cengji.length;i++){
            cengji[i].onclick=function () {
                canshu=(cengji[i].innerHTML);
                yetiao=25;
                tiao=0;
                chang=1;
                paiisok1=false;
                paiisok2=false;
                ul.innerHTML="";
                zhong.innerHTML="";
                var data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2;
                xunran(data);
                chazong();
                jiazai(yetiao,tiao);
                cengxaunran();
            }
        }
    })
    }
    chazong();

    var data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2;

    //渲染列表
    function xunran(data) {
    var url="../api/api.php";   
    ajax("post",url,data,function(str){
        var arr=JSON.parse(str);
        chang=arr.length;
        var html=arr.map(function(item) {
            return `<li data-id="${item.id}">
            <div class="pic">
                <a href="javascript:;" class="img2">
                <img src="../${item.img}" alt="">
                </a>
            </div>
            <div class="info">
                <p class="name2">
                    <i>
                    ${item.trade}
                        <em>该商品按${item.trade}交易方式进出口</em>
                    </i>
                    ${item.name}
                </p>
                <p class="price2">
                    价格:${item.price}
                </p>
                <p>
                    <span class="sold2">已售:${item.sold}件</span>
                    <span class="bacth2">起批量>${item.batch}件</span>
                </p>
                </p>
                <p class="label2">
                    <em>混</em>
                    <em>定</em>
                </p>
            </div>
        </li>`
        }).join("");
            ul.innerHTML+=html;
            isok=true;


        //点击商品跳到详情页
        var img2=document.getElementsByClassName("img2"); //点击的时候获取自定义id
        for(let i=0;i<img2.length;i++){
            img2[i].onclick=function(ev){
                var ev=ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.nodeName.toLowerCase() == 'img'){
                    var id=ev.target.parentNode.parentNode.parentNode.dataset.id;
                    location.href="../html/detail.html?"+id; 
                }
            }
        }
    })
    }

    xunran(data);

    var xiao=this.document.getElementById("xiao");
    var jia=this.document.getElementById("jia");
    var mo=document.getElementById("mo");

    jia.onclick=function(){  //价格排序
        paiisok1=true;    //打开排序开关
        paiisok2=false;
        pailei="jiage";  //接口类型=价格
        ul.innerHTML="";  //清空列表内容
        shengjiang1=-shengjiang1; //排序取反
        var  data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2+"&paixun="+pailei+"&shengjiang1="+shengjiang1;//排序接口参数
        xunran(data);  //渲染函数
        chazong();   //分页函数
        jiazai(yetiao,tiao); //懒加载函数
    }

    xiao.onclick=function(){ //销量排序
        paiisok1=false;
        paiisok2=true;
        pailei="xiaoliang";
        ul.innerHTML="";
        shengjiang2=-shengjiang2;
        var data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2+"&paixun="+pailei+"&shengjiang2="+shengjiang2;//排序接口参数
        xunran(data);
        chazong();
        jiazai(yetiao,tiao);
    }

    mo.onclick=function(){ //默认排序
        ul.innerHTML="";
        yetiao=25;
        tiao=0;
        chang=1;
        paiisok1=false;
        paiisok2=false;
        zhong.innerHTML="";
        var  data="jiekou=sousuo&mingcheng="+canshu+"&tiao="+tiao+"&tiao2="+tiao2;
        xunran(data);
        chazong();
        jiazai(yetiao,tiao);
    }



    

    




}