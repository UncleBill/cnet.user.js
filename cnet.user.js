// ==UserScript==
// @name China-net-fill
// @description 自动填写用户名和密码
// @include http://61.137.86.87:8080/portalNat444/index.jsp
// @author UncleBill
// @version 0.01
// @date 2013-04-15
// @license MIT License
// ==/UserScript==


(function(){
    var _ACCOUNT_ = "01124611158";
    var _PASSWORD_ = "329225";

    var account = document.getElementById("account");
    var password = document.getElementById("userPassword");
    if( account ){
        account.value = _ACCOUNT_;
        password.value = _PASSWORD_;
        console.log( 'done!' );
    }
}()); // closure
