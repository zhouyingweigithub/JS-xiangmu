window,onload=function(){
    var tex=this.document.getElementById("tex");
    var pwd=document.getElementById("pwd");
    var but=document.getElementById("but");
    var hiht=this.document.getElementById("hiht");

    but.onclick=function(){ 

        var tex1=tex.value;
        var tex2=pwd.value;

        var url="../api/api.php";
        var data="jiekou=login&yonghu="+tex1+"&mima="+tex2;

        ajax("post",url,data,function(str){
            var arr=JSON.parse(str);  
            if(arr.length!=0){                 //返回的长度不等于0
                var cke=(document.cookie); //获取cookie，字符串
                var shuzu=cke.split("=");  //根据=号截取，转成数组
                var uid=shuzu[1];       //获取数组的第二个
                var id=arr[0].id;       //获取正在点击登录的id
                if(id!=uid){          //两个ID不一样才可登录
                alert("登录成功");
                cookie.set("use",id,{path:"/zhouyingwei-xiangmu"})        //登录成功时把用户名存到cookie
                location.href="../shouye.html?";  //跳转到下一个页面，并带一个id过去
                }
                else{
                    alert("此用户正在登录");
                }
            }else{
               hiht.innerHTML=`<div><div>-</div><span>帐号或密码有误</span></div>`;
            }
        })
    }


}