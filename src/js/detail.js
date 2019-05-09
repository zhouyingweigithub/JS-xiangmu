window.onload=function () {
    var left=this.document.getElementById("nav-left");
    var all=this.document.getElementById("all");
    var li=left.getElementsByTagName("li")
    var h3=left.getElementsByTagName("h3")
    var div=left.getElementsByTagName("div");
    var iconf=document.getElementsByClassName("iconf");
    var aaa=left.getElementsByTagName("a");
    var gouwuche=document.getElementById("gouwuche");
    var fangdajing=document.getElementById("fangdajing");
    var fangdajing2=document.getElementById("fangdajing2");

    gouwuche.onclick=function(){
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


for(let i=0;i<aaa.length;i++){
    aaa[i].onclick=function () {
        var biaoqian=aaa[i].innerHTML;
        location.href="../html/list.html?"+biaoqian;  //跳转到下一个页面，并带一个标签过去
    }
}

var use=this.document.getElementById("use");
var cke=(document.cookie); //获取cookie，字符串
var shuzu=cke.split("=");  //根据=号截取，转成数组
var uid=shuzu[1];       //获取数组的第二个
if(shuzu.length>=2){
    var url="../api/api.php";    //首页用户信息接口
    var data="jiekou=xuanran&biao=user&leixing=id&mingcheng="+uid+"&tiao=0&tiao2=1";
    ajax("post",url,data,function(str){
    var arr=JSON.parse(str);
    var html=arr.map(function(item) {
        return `您好，欢迎来到 NALA！ 【 <a  href="javascript:;">${item.name}</a><s>&nbsp;|&nbsp;</s><a href="javascript:;">退出</a> 】`
    });
    use.innerHTML=html;
});
    }



var datu=this.document.getElementById("datu");
var xiaotu=this.document.getElementById("xiaotu");
var xiaoliang=this.document.getElementById("xiaoliang");
var prand=this.document.getElementById("prand");
var name=this.document.getElementById("name");
var price=this.document.getElementById("price");
var batch=this.document.getElementById("batch");
var hun=this.document.getElementById("hun");
var yanse=this.document.getElementsByClassName("yanse");
var tiaoma=this.document.getElementsByClassName("tiaoma");
var jiage=this.document.getElementsByClassName("jiage");
var jian=this.document.getElementsByClassName("jian");
var kucun=this.document.getElementsByClassName("kucun");
var jiesao=this.document.getElementById("jiesao");
var box=this.document.getElementById("box");


var id=decodeURI(location.search).slice(1);//获取列表传输过来的参数
var url="../api/api.php";
var data="jiekou=xuanran&biao=list&leixing=id&mingcheng="+id+"&tiao=0&tiao2=1";
ajax("post",url,data,function(str){
    var arr=JSON.parse(str);
        datu.innerHTML+='<img src="../'+arr[0].img+'" alt="">';
        datu.innerHTML+='<img src="../'+arr[0].img2+'" alt="">';
        datu.innerHTML+='<img src="../'+arr[0].img3+'" alt="">';
        fangdajing2.innerHTML+='<img src="../'+arr[0].img+'" alt="">';
        fangdajing2.innerHTML+='<img src="../'+arr[0].img2+'" alt="">';
        fangdajing2.innerHTML+='<img src="../'+arr[0].img3+'" alt="">';
        xiaotu.innerHTML+='<li class="liimg"><img src="../'+arr[0].img+'" alt=""><div></div></li>';
        xiaotu.innerHTML+='<li class="liimg"><img src="../'+arr[0].img2+'" alt=""><div></div></li>';
        xiaotu.innerHTML+='<li class="liimg"><img src="../'+arr[0].img3+'" alt=""><div></div></li>';
        xiaoliang.innerHTML='销量：'+arr[0].sold+'';
        prand.innerHTML=arr[0].brand;
        price.innerHTML=arr[0].price;
        name.innerHTML='<em id="em">'+arr[0].trade+'</em>'+arr[0].name;
        batch.innerHTML='起批量:'+arr[0].batch+'件及以上';
        hun.innerHTML='本商品支持'+arr[0].hua;
    for(let i=0;i<yanse.length;i++){
        yanse[i].innerHTML=arr[0].yanse;
        tiaoma[i].innerHTML='条码：'+arr[0].tiaoma;
        jiage[i].innerHTML='价格：'+arr[0].price;
        jian[i].innerHTML=arr[0].gunge+'件';
        kucun[i].innerHTML='库存:'+arr[0].kuncun;
        jiesao.innerHTML="";
        var isok=true;
        window.onscroll=function () {
            var h=box.offsetHeight-window.innerHeight; //盒子的高度-窗口的高度
            var y=window.scrollY;//鼠标滚动距离
            if(y>=h){
                if(isok){
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img4+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img5+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img6+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img7+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img8+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img9+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img10+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img11+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img12+'" alt="">';
                jiesao.innerHTML+=' <img src="../img/detail-img/'+arr[0].img13+'" alt="">';
                isok=false;
                }
            }
        }

    }

    var imgi=0;
    var datupian=datu.getElementsByTagName("img");
    var xiaotupian=xiaotu.getElementsByClassName("liimg");
    var fangdatu=fangdajing2.getElementsByTagName("img");
    for(let i=0;i<xiaotupian.length;i++){
        xiaotupian[i].onclick=function(){
            for(let i=0;i<datupian.length;i++){
                datupian[i].style.zIndex=0;
                fangdatu[i].style.zIndex=0;
            }
            datupian[i].style.zIndex=10;
            fangdatu[i].style.zIndex=10;
            imgi=i;
        }
    }


    document.onmousemove=(ev)=>{
        var ev = window.event || event;
    
         var y=ev.clientY;  //鼠标的位置
         var x=ev.clientX;
    
         var w=fangdajing.offsetWidth; //遮罩长度
         var h=fangdajing.offsetHeight+100;
    
        var top=y-h;         //拿鼠标的位置减去遮罩长的一半就可以得到遮罩的位置
        var left=x-w;
    
        if(top<=0){  //临界值判断
            top=0;
        }
        if(top>=(datu.offsetHeight-fangdajing.offsetHeight)){ //上下不能大于盒子减去遮罩的距离
            top=datu.offsetHeight-fangdajing.offsetHeight; 
        }
        if(left<=0){
            left=0;
        }
        if(left>=(datu.offsetWidth-fangdajing.offsetWidth)){//左右不能大于盒子减去遮罩的距离
            left=datu.offsetWidth-fangdajing.offsetWidth;
        }
    
        fangdajing.style.top=top+"px";  //给小图添加样式
        fangdajing.style.left=left+"px";
    
        var l=left/(datu.offsetWidth-fangdajing.offsetWidth); //计算小图移动比例
        var t=top/(datu.offsetHeight-fangdajing.offsetWidth);
    
        var L=(fangdatu[0].offsetWidth-fangdajing2.offsetWidth)*l; //计算大图的移动比例
        var T=(fangdatu[0].offsetHeight-fangdajing2.offsetHeight)*t;


        fangdatu[imgi].style.top=-T+"px"; //给大图添加样式
        fangdatu[imgi].style.left=-L+"px";
    }
    
    datu.onmouseover=function(){
        fangdajing.style.display="block";
        fangdajing2.style.display="block";
    }
    datu.onmouseout=function(){
        fangdajing.style.display="none";
        fangdajing2.style.display="none";
    }
    fangdajing.onmouseover=function(){
        fangdajing.style.display="block";
        fangdajing2.style.display="block";
    }
    fangdajing.onmouseout=function(){
        fangdajing.style.display="none";
        fangdajing2.style.display="none";
    }


    //点击加入购物车
    var gouwuche2=document.getElementById("gouwuche2");
    gouwuche2.onclick=function () {
        var url="../api/api.php";
        var cke=(document.cookie); //获取cookie，字符串
        var shuzu=cke.split("=");  //根据=号截取，转成数组
        var user=shuzu[1]; //获取数组的第一个
        var data="jiekou=jiagouwu&id="+arr[0].id+"+&user="+user;
        ajax("post",url,data,function(str){
            if(str="srue"){
                alert("成功加入购物车");
            }else{
                alert("加入购物车失败");
            }
        })
    }
})






  
}
