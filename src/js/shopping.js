window.onload=function () {
        var left=this.document.getElementById("nav-left");
        var all=this.document.getElementById("all");
        var li=left.getElementsByTagName("li")
        var h3=left.getElementsByTagName("h3")
        var div=left.getElementsByTagName("div");
        var iconf=document.getElementsByClassName("iconf");
        var aaa=left.getElementsByTagName("a");

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


    for(let i=0;i<aaa.length;i++){
        aaa[i].onclick=function () {
            var biaoqian=aaa[i].innerHTML;
            location.href="../html/list.html?"+biaoqian;  //跳转到下一个页面，并带一个标签过去
        }
    }



    //购物车商品渲染
    var gouwuche=document.getElementById("gouwuche");
    var pinpaishuzu=[];//数组 存储品牌

    var url="../api/api.php";       
    var data="jiekou=gouwuche&user="+uid;   //购物车接口 根据cookie用户ID查询购物车表
    ajax("post",url,data,function(str){ 
        var arr=JSON.parse(str);
        var url="../api/api.php";
        for(let i=0;i<arr.length;i++){         //循环 购物车有多少ID就查询多少次
            var data="jiekou=gouwuche&id="+arr[i].id; //购物车接口 根据商品ID查询列表页
            ajax("post",url,data,function(str){ 
                var arr=JSON.parse(str);
                if(pinpaishuzu.indexOf(arr[0].brand)==-1){  //数组方法查询，有就返回下标，没有返回-1，对品牌去重
                    pinpaishuzu.push(arr[0].brand); 
                    //获得几个品牌就渲染几个ul
                    gouwuche.innerHTML+='<ul><div data-id="'+arr[0].id+'"><input type="checkbox" class="dianpu"><span>品牌：'+arr[0].brand+'</span></div></ul>';
                }
                var xiabiao=pinpaishuzu.indexOf(arr[0].brand); //数组方法查询,取得品牌在数组中的下标
                var ul=gouwuche.getElementsByTagName("ul");
                var html=arr.map(function(imte){
                    return `
                <li class="lis" data-id="${imte.id}">
                    <div>
                         <input type="checkbox" class="wupin">
                    </div>
                    <div>
                        <img src="../${imte.img}" alt="">
                        <div>${imte.name}</div>
                    </div>
                    <div>
                        <p>颜色分类：${imte.yanse}</p>
                        <p>规格：${imte.gunge}盒</p>
                    </div>
                    <div>
                        <p>￥${imte.yuanjia}.00</p>
                        <p>${imte.price}.00</p>
                    </div>
                    <div>
                        <input type="button" name="" class="jian" value="-">
                        <input type="text" name="" class="tex" value="1">
                        <input type="button" name="" class="jia" value="+">
                    </div>
                    <div>
                        <p>${imte.price}.00</p>
                    </div>
                    <div>
                        <p>移入收藏夹</p>
                        <p class="shanchu">删除</p>
                        <p>相似宝贝</p>
                    </div>
                </li>`
                })
                ul[xiabiao].innerHTML+=html; //根据下标对ul进行渲染
        }) 
    }
})

    var tan=document.getElementById("tan");
    var queding=this.document.getElementById("queding");
    var quxiao=this.document.getElementById("quxiao");
    var zjia=this.document.getElementById("zongjia");
    var jiesuan=document.getElementById("jiesuan");
    var zongjiaqian=0; //记录总价
    var arr=[];//记录所有复选框的状态

    gouwuche.onclick=function (ev) {  //事件委托
    if(ev.target.className=="shanchu"){ //点击的是删除才有效果
           tan.style.display="block";  //显示弹窗
           tan2.innerHTML="你真的要删除我吗？";
           queding.onclick=function () {  //点击确定时删除商品节点
                var uid=(ev.target.parentNode.parentNode).dataset.id;
                var li=ev.target.parentNode.parentNode;
                var ul=ev.target.parentNode.parentNode.parentNode;
                ul.removeChild(li);
                var url="../api/api.php";
                var data="jiekou=shanchu&id="+uid;  //删除购物车商品接口
                ajax("post",url,data,function (str) {
                    if(str=="true"){
                        tan.style.display="none"; //返回值是true时隐藏弹窗
                    }else{
                        tan2.innerHTML="删除失败!"; //失败时改变弹窗的文字
                    }
                })
            }
           quxiao.onclick=function(){  //点击取消的隐藏弹窗
               tan.style.display="none";
           }
        }

    if(ev.target.className=="dianpu"){ //点击大复选框
        zongjiaqian=0;
        arr=[];
        var li=ev.target.parentNode.parentNode.getElementsByTagName("li");//获取这个品牌内的li
        var li2=ev.target.parentNode.parentNode.parentNode.getElementsByTagName("li");//获取全部的li
        if(ev.target.checked==true){ //判断点击的复选框是不是开启状态
            ev.target.checked==false; //是开启的就关闭
            for(let i=0;i<li.length;i++){
                var input=li[i].children[0].getElementsByTagName("input")[0];
                    input.checked=true; //把商品的复选框打钩
                    li[i].style.background="#ff0000"; 
                    jiesuan.style.background="rgb(243, 44, 9)";
                    jiesuan.style.color="#ccc";
            }   
                //点击大复选框打钩计算总价
            for(let i=0;i<li2.length;i++){ //打钩的时候计算所有商品的价格
                var lis=li2[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
                arr.push(lis.checked);//把复选框的状态存到数组
                if(lis.checked==true){
                    var jiaqian=lis.parentNode.parentNode.getElementsByTagName("div")[6].getElementsByTagName("p")[0].innerHTML*1;
                    zongjiaqian+=jiaqian;
                }
            }           
        }else{
            for(let i=0;i<li.length;i++){ //反之改变成原来的颜色
                li[i].style.background="rgba(236, 236, 236, 0.8)";
                var input=li[i].children[0].getElementsByTagName("input")[0];
                input.checked=false;//把ul里面的商品的复选框打钩取消
            }
                //取消大复选框打钩计算总价
            for(let i=0;i<li2.length;i++){//取消打钩的时候再重新计算所有商品的价格
                var lis=li2[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
                arr.push(lis.checked);//把复选框的状态存到数组
                if(lis.checked==true){
                    var jiaqian=lis.parentNode.parentNode.getElementsByTagName("div")[6].getElementsByTagName("p")[0].innerHTML*1;
                    zongjiaqian+=jiaqian;
                }
            }
        }
        if(arr.indexOf(true)==-1){//数组里面不存在打开的开关则改变总价颜色
            jiesuan.style.background="#ccc";
            jiesuan.style.color="rgb(243, 44, 9)";
        }
    }

    if(ev.target.className=="wupin"){ //点击小复选框
        zongjiaqian=0;    //清空价格
        arr=[];         //清空数组
        var shu=0;     //记录一个品牌复选框打钩的数量
        var li=ev.target.parentNode.parentNode; //获取点击的li
        //获取所有的li
        var li2=ev.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("li");
        //获取一个品牌的li
        var li3=ev.target.parentNode.parentNode.parentNode.getElementsByTagName("li");
        //获取大复选框
        var li4=ev.target.parentNode.parentNode.parentNode.getElementsByTagName("div")[0].getElementsByTagName("input")[0];
        if(ev.target.checked==true){//点击的时是打钩的进来
            li.style.background="#ff0000"; //改变颜色
            jiesuan.style.background="rgb(243, 44, 9)";
            jiesuan.style.color="#ccc";
            //点击小复选框计算总价
            for(let i=0;i<li2.length;i++){ //循环所有的li
                var lis=li2[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0];//获取所有的复选框
                arr.push(lis.checked);//把全部复选框的状态存到数组
                if(lis.checked==true){ //判断是不是打钩的
                    //获取是打钩的价钱
                    var jiaqian=lis.parentNode.parentNode.getElementsByTagName("div")[6].getElementsByTagName("p")[0].innerHTML*1;
                    zongjiaqian+=jiaqian; //获取每个打钩的价格累加给zongjiaqian
                }
            }
            //点击小复选框判断大框该不该打钩
            for(let i=0;i<li3.length;i++){//循环一个品牌的li
                var lis=li3[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0];//获取一个品牌的复选框
                if(lis.checked==true){ //判断一个品牌的小复选框是不是打钩的
                    shu++;  //是打钩的数量就+1
                    if(shu==li3.length){ //数量的和点击的这个品牌的li长度一样时
                        li4.checked=true; //给大框打钩
                    }
                }
            }
        }else{
            li.style.background="rgba(236, 236, 236, 0.8)";
            //取消小复选框打钩计算总价
            for(let i=0;i<li2.length;i++){ //循环所有的li
                var lis=li2[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0];//获取所有的复选框
                arr.push(lis.checked);//把全部复选框的状态存到数组
                if(lis.checked==true){ //判断是不是打钩的
                    //获取是打钩的价钱
                    var jiaqian=lis.parentNode.parentNode.getElementsByTagName("div")[6].getElementsByTagName("p")[0].innerHTML*1;
                    zongjiaqian+=jiaqian; //获取每个打钩的价格累加给zongjiaqian
                }
            }
        }   
            //点击小复选框判断大框该不该打钩
            for(let i=0;i<li3.length;i++){//循环一个品牌的li
                var lis=li3[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0];//获取一个品牌的复选框
                if(lis.checked==false){ //判断一个品牌的小复选框不是打钩
                    shu++;  //不是打钩的数量就+1
                    if(shu<li3.length){ //数量的和点击的这个品牌的li长度一样时
                        li4.checked=false; //把大框打钩取消
                    }
                }
            }

            if(arr.indexOf(true)==-1){//数组里面不存在打开的开关则改变总价颜色
                jiesuan.style.background="#ccc";
                jiesuan.style.color="rgb(243, 44, 9)";
            }
        }

    if(ev.target.className=="jian"){//点击减数量
        var tex=ev.target.nextSibling.nextSibling;
        var zhi=tex.value;
        if(zhi>1){
            zhi--;
            var yuanjia=ev.target.parentNode.previousSibling.previousSibling.getElementsByTagName("p")[1].innerHTML*1;
            var shuliang=zhi;
            var he=ev.target.parentNode.nextSibling.nextSibling.getElementsByTagName("p")[0];
            he.innerHTML=yuanjia*shuliang;
            //获取点击的小复选框 判断是不是打钩
            var li=ev.target.parentNode.parentNode.getElementsByTagName("div")[0].getElementsByTagName("input")[0];
            if(li.checked==true){
                zongjiaqian=0;//清空价格
                //获取全部的li
                var li2=ev.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("li");
                for(let i=0;i<li2.length;i++){ //循环所有的li
                //获取所有的复选框
                var lis=li2[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
                if(lis.checked==true){
                    //获取打钩li的价格改变总价
                    var lijia=lis.parentNode.parentNode.getElementsByTagName("div")[6].getElementsByTagName("p")[0].innerHTML*1;
                    zongjiaqian+=lijia;
                }
            }
        }
    }
        tex.value=zhi;
    }

    if(ev.target.className=="jia"){//点击减数量
        var tex=ev.target.previousSibling.previousSibling;
        var zhi=tex.value;
        if(zhi<100){
            zhi++;
            var yuanjia=ev.target.parentNode.previousSibling.previousSibling.getElementsByTagName("p")[1].innerHTML*1;
            var shuliang=zhi;
            var he=ev.target.parentNode.nextSibling.nextSibling.getElementsByTagName("p")[0];
            he.innerHTML=yuanjia*shuliang;

            //获取点击的小复选框 判断是不是打钩
            var li=ev.target.parentNode.parentNode.getElementsByTagName("div")[0].getElementsByTagName("input")[0];
            if(li.checked==true){
                zongjiaqian=0;//清空价格
                //获取全部的li
                var li2=ev.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("li");
                for(let i=0;i<li2.length;i++){ //循环所有的li
                //获取所有的复选框
                var lis=li2[i].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
                if(lis.checked==true){
                    //获取打钩li的价格改变总价
                    var lijia=lis.parentNode.parentNode.getElementsByTagName("div")[6].getElementsByTagName("p")[0].innerHTML*1;
                    zongjiaqian+=lijia;
                }
            }
        }
            
    }
        tex.value=zhi;
    }

    zjia.innerHTML=zongjiaqian;//把价格渲染出来

}





}