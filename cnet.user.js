// ==UserScript==
// @name china-net-autofill
// @description 自动填写用户名和密码
// @include http://61.137.86.87:8080/portalNat444/index.jsp
// @author UncleBill <billbill290@gmail.com>
// @version 0.01
// @date 2013-04-15
// @license MIT License
// ==/UserScript==

(function(){

    var $id = function( id ){
        return document.getElementById( id );
    };
    var $getItem = function( attr ){
        return localStorage.getItem(attr);
    };
    var $setItem = function( attr, value ){
        localStorage.setItem( attr, value );
    };

    var storedAccount = $getItem("account");
    var storedPassword = $getItem("password");

    var account = $id("account");
    var password = $id("userPassword");
    if( account ){
        account.value = storedAccount;
        password.value = storedPassword;
    }

    var logBtn = $id("login_button");
    logBtn.addEventListener("click",function(){
        $setItem("account",account.value);
        $setItem("password",password.value);
    });

}()); // closure
