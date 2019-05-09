window.onload=function () {
    var tex=document.getElementById("tex");
    var pwd=document.getElementById("pwd");
    var pwd2=document.getElementById("pwd2");
    var yzm=document.getElementById("yzm");
    var gain=document.getElementById("gain");
    var pact=document.getElementById("pact");
    var but=document.getElementById("but");

    var hint1=document.getElementById("hint1");
    var hint2=document.getElementById("hint2");
    var hint3=document.getElementById("hint3");

    var tanbut=document.getElementById("tanbut");



    var a1=false; //各路开关
    var a2=false;
    var a3=false;
    var a4=false;
    var reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;//手机号码正则
    var reg2=/^\d{6,20}$/;  //密码正则

    tex.onblur=function(){  //用户名验证
    shoujihao();
    }
    function shoujihao(){  //验证用户名存不存在函数
        var tex1=tex.value;
        var url="../api/api.php";
        var data="jiekou=register&yonghu="+tex1;
        ajax("post",url,data,function(str){
            if(tex1.trim()){  //非空验证
                if(reg.test(tex1)){ //正则验证
                    if(str=="0"){ //是否存在验证
                    hint1.innerHTML=`<span><img src="../img/register-img/1.png" alt=""></span>`;
                    a1=true;
                }else{
                    hint1.innerHTML=`<span><img src="../img/register-img/2.png" alt="">该帐号已被注册使用</span>`;
                    a1=false;
                }            
                }else{
                    hint1.innerHTML=`<span><img src="../img/register-img/2.png" alt="">请输入正确的手机号码</span>`;
                    a1=false;
                } 
        }else{
            hint1.innerHTML=`<span><img src="../img/register-img/2.png" alt="">内容不能为空</span>`;
            a1=false;
        }
        })
        }


    pwd.onblur=function(){ //密码1非空验证 正则验证
        if(pwd.value.trim()){
            if(reg2.test(pwd.value)){
                hint2.innerHTML=`<span><img src="../img/register-img/1.png" alt=""></span>`;
                a2=true;
            }else{
                hint2.innerHTML=`<span><img src="../img/register-img/2.png" alt="">密码要6-20位数之间</span>`;
                a2=false;
            }
        }else{
            hint2.innerHTML=`<span><img src="../img/register-img/2.png" alt="">内容不能为空</span>`;
            a2=false;
        }

    }
    pwd2.onblur=function(){ //密码2非空验证 正则验证 相同认证
        if(pwd2.value.trim()){
            if(reg2.test(pwd2.value)){
                if(pwd.value==pwd2.value){
                    hint3.innerHTML=`<span><img src="../img/register-img/1.png" alt=""></span>`;
                    a3=true;
                }else{
                    hint3.innerHTML=`<span><img src="../img/register-img/2.png" alt="">两次密码输入不一致</span>`;
            }
            }else{
                hint3.innerHTML=`<span><img src="../img/register-img/2.png" alt="">密码要6-20位数之间</span>`;
                a3=false;
            }
        }else{
            hint3.innerHTML=`<span><img src="../img/register-img/2.png" alt="">内容不能为空</span>`;
            a3=false;
        }
    }
    yzm.onblur=function(){ //验证码非空验证
        if(yzm.value.trim()){
            a4=true;
        }else{
            a4=false;
        }
    }



    var shuzu="zxcvbnmasdfghjklqwertyuiop1234567890ZXCVBNMASDFGHJKLQWERTYUIOP"; //生成验证码
        var a="";
        gain.onclick=function(){
            a="";
        for(var i=0;i<4;i++){
           a+=shuzu.charAt(parseInt(Math.random()*62));
        }
            gain.innerHTML=a;
        }


        but.onclick=function(){  //注册
            shoujihao();
            var tantex="";
            var valtex=tex.value;
            var valpwd1=pwd.value;
            var valpwd2=pwd2.value;
            var valyzm=yzm.value.toLowerCase();
            var valgain=gain.innerHTML.toLowerCase();
            if(reg.test(valtex)){  //正则判断
                if(a1 && a2 && a3 && a4){  //开关判断
                    if(valpwd1==valpwd2){  //密码相同
                        if(valyzm==valgain){  //验证码相同
                            if(pact.checked){  //协议选中
                                var url="../api/api.php";
                                var data="jiekou=register2&yonghu="+valtex+"&mima="+valpwd2;
                                ajax("post",url,data,function(str){
                                    if(str){
                                        tantex="注册成功";
                                        tan(tantex);
                                    }else{
                                        tantex="注册失败";
                                        tan(tantex);
                                        }
                                    })
                            }else{
                                tantex="请先勾选协议";
                                tan(tantex);}
                        }else{
                        tantex="请输入正确的验证码";
                        tan(tantex);
                    }
                    }else{
                        tantex="两次密码输入不一致";
                        tan(tantex);
                }
                }else{
                    tantex="内容不符合规范";
                    tan(tantex);
            }
            }else {
                tantex="请输入正确的手机号码";
                tan(tantex);
            }

            //弹窗
        function tan(tantex){
            var tan=document.getElementById("tan");
            tan.style.display="block";
            tan2.innerHTML=tantex;
            tanbut.onclick=function () {
                tan.style.display="none";
            }
        }

}



    
}