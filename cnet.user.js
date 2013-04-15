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

    var ultis = {
        $id : function( id ){
            return document.getElementById( id );
        },
    }


    console.log('loaded');

    var _ACCOUNT_ = "01124611158";
    var _PASSWORD_ = "329225";

    var storedAccount = localStorage.getItem("account");
    var storedPassword = localStorage.getItem("password");

    console.log('is localStorage',storedAccount,storedPassword);
    if( storedAccount || storedPassword ){
        _ACCOUNT_ = storedAccount;
        _PASSWORD_ = storedPassword;
    }

    var account = ultis.$id("account");
    var password = ultis.$id("userPassword");
    if( account ){
        account.value = _ACCOUNT_;
        password.value = _PASSWORD_;
        console.log( 'done!' );
    }

    var radio = document.createElement("input");
    var label = document.createElement("label");
    radio.setAttribute("type","checkbox");
    radio.setAttribute("name","member");
    radio.setAttribute("id","member");
    label.setAttribute("for","member");
    label.textContent = "记住密码";

    var parent = password.parentElement;
    parent.appendChild(radio);
    parent.appendChild(label);

    var logBtn = ultis.$id("login_button");
    logBtn.addEventListener("click",function(){
        var ismember = ultis.$id("member");
        if( isMember.checked ){
            localStorage['account'] = account.value;
            localStorage['password'] = password.value;
        } else {
            localStorage['account'] = "";
            localStorage['password'] = "";
        }
    })
    console.log( 'localStorage:','account:',localStorage['account'],'password',localStorage['password'] );


}()); // closure
