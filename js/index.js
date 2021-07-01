let user = $('.box .form .username input') //用户名
let phone = $('.box .form .phone input')//手机号
let pwd = $('.box .form .paw input')//密码
let register = $('.box .register input[type=button]') //注册
let agreement = $('.agreement label input[type=checkbox]') //协议
//弹窗
function  showPopUp(msg ,timeout = 1500) {
    let div = document.createElement('div')
    div.classList.add('pop-up')
    document.body.append(div)
    let pop_up = $('.pop-up'); //错误的时候的提示框
    pop_up.style.height = `100vw`
    pop_up.style.backgroundColor = '#dadade'
    pop_up.style.opacity = '.3'
    pop_up.style.position  = 'fixed'
    pop_up.style.top  = 0
    pop_up.style.right  = 0
    pop_up.style.left  = 0
    pop_up.style.bottom  = 0
    pop_up.style.lineHeight = 100 + 'vh'
    pop_up.style.textAlign = 'center'
    pop_up.style.color = 'red'
    pop_up.style.fontWeight = 800
    pop_up.style.fontSize = 40 + 'px'
    pop_up.style.display = 'none'
    pop_up.style.display = 'block'
    pop_up.innerHTML = msg
    setTimeout(function (){
        pop_up.style.display = 'none'
    },timeout)
}
//错误提示的弹窗
function window_tan(ipt,msg,colorr) {
    let _box = ipt.parentElement.nextElementSibling.nextElementSibling
    let div = document.createElement('div')
    div.innerHTML =  msg
    div.className = 'show'
    div.style.color = colorr
    _box.append(div)
    let next = div.previousElementSibling
    //当它有上一个元素的时候给他移出 没有就什么都不做
    next ? next.remove() : next
}

// 检验 test_if 函数
function test_if(Reg, error = null, my, msg = null) {
    //Reg 正则表达式  error错误的弹窗  my我自己这个触发事件的标签  msg 错误的时候的消息
    // let  flag = false
    if(Reg.test(my.value)) {
        error ? error.style.display = 'none': console.log()
        my.style.border = `1px solid black`;
        window_tan(my,'ok了','black')
    }else {
        window_tan(my,msg,'red')
        error ? error.style.display = 'block': console.log()
        my.style.border = `1px solid red`;
        // Reg.test(my.value) ? my.style.border = `1px solid blue`: my.style.border = `1px solid black`
    }
}


//提交表单
//中文、英文、数字组合
    let userReg = /^[\u4E00-\u9FA5A-Za-z0-9]{4,14}$/ //4-14位
    let win_user = user.parentElement.nextElementSibling //弹窗
    user.addEventListener('focus',function (){
        if(userReg.test(this.value)) {
            win_user.style.display = 'none'
            user.style.border = '1px solid black';
        }else {
            win_user.style.display = 'block'
            user.style.border = '1px solid blue';
        }
    })

    user.addEventListener('change',function (){
        test_if(userReg,win_user,user,'格式错误,4-14位字母数字汉字')
    })

    user.addEventListener('blur',function (){
        if(this.value.trim().length === 0) { //去掉空格然后输入长度为 0
            window_tan(user,'不能是空的')
        }
        win_user.style.display = 'none'
        // user.style.border = '1px solid black';
    })
    //手机号
    const reg_phone = /^(1[3-9][0-9]{9})$/;
    phone.addEventListener('focus',function (){
        phone.style.border = '1px solid blue';
    })
    phone.addEventListener('change',function (){
        test_if(reg_phone,'',phone,'手机号码格式不正确')
    })

    phone.addEventListener('blur',function (){
        // phone.style.border = '1px solid black';
        if(this.value.trim().length === 0) { //去掉空格然后输入长度为 0
            window_tan(phone,'不能是空的')
        }
    })

  //密码 必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
    const reg_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
    let win_pwd = pwd.parentElement.nextElementSibling //弹窗
    pwd.addEventListener('focus',function (){
        win_pwd.style.display = 'block'
        pwd.style.border = '1px solid blue';
    })
    pwd.addEventListener('change',function (){
        test_if(reg_pwd,win_user,pwd,'密码的格式不正确','red')
    })
    pwd.addEventListener('blur',function (){
        // pwd.style.border = '1px solid black';
        win_pwd.style.display = 'none'
        if(this.value.trim().length === 0) { //去掉空格然后输入长度为 0
            window_tan(pwd,'不能是空的')
        }
    })

        //验证码
    let iptt = $('.box .form .code input[type=text]')//生成验证码的 按钮
    let code_button = $('.box .form .code input[type=button]') //输入验证码的输入框
    let auth_code = 'zxcvbnmasfdghjklkqwwertyyuiop123456789ZXCVBNMASDFGHJKLQWERTYUIOP';//验证码
    let kong = ''
    for (let i = 0; i < 4; i++) {
        kong += auth_code[parseInt(Math.random() * auth_code.length)]
    }
    code_button.value = kong
    if (!iptt.value.trim()) { //.trim()  去空格
        iptt.addEventListener('focus',function (){
            window_tan( iptt,'不能是空的'); iptt.style.border = '1px solid blue'
        })
    }else if (!iptt.value.toLowerCase().trim() === !code_button.value.toLowerCase().trim()) {
        iptt.addEventListener('focus',function (){
            window_tan( iptt,'验证成功','black')
        })
    }else {
        window_tan( iptt,'输入错误')
    }
    iptt.addEventListener('blur',function (){
        window_tan( iptt,''); iptt.style.border = '1px solid black';
    })
    //点击它自重新获取验证码
    code_button.addEventListener('click',function (){ code('') })
//复选框被选中的时候才能提交
register.addEventListener('click',function (){
    if(!agreement.checked ) {
        showPopUp('请选中后才能提交')
    }else if (userReg.test(user.value) && reg_phone.test(phone.value) && reg_pwd.test(pwd.value) &&
    !iptt.value.toLowerCase().trim() === !code_button.value.toLowerCase().trim()){
        showPopUp('提交成功')
    }
})
