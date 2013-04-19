// ==UserScript==
// @name China-net-autofill
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


    console.log('loaded');

    var storedAccount = $getItem("account");
    var storedPassword = $getItem("password");

    console.log('stored items',storedAccount,storedPassword);

    var account = $id("account");
    var password = $id("userPassword");
    if( account ){
        account.value = storedAccount;
        password.value = storedPassword;
        console.log( 'done!' );
    }

    var logBtn = $id("login_button");
    logBtn.addEventListener("click",function(){
        console.log('will store:',account.value,password.value);
        $setItem("account",account.value);
        $setItem("password",password.value);
    });
    console.log( 'localStorage:','account:',$getItem( 'account' ),'password',$getItem( 'password' ) );


}()); // closure
