

/*
大麦网请求地址
https://search.damai.cn/searchajax.html

keyword=
cty=
ctl=%E6%BC%94%E5%94%B1%E4%BC%9A
sctl=
tsg=0
st=
et=
order=1
pageSize=30
currPage=1
tn=
*/


//准备一个全局变量，记录一下分页器切换到第几页
let currPage=1;

//准备一个变量判断分页器师傅还需要渲染
let flag=true

//获取列表数据
getList();
function getList() {
    $.ajax({
        url: "/dm",
        data: {
            keyword: "",
            cty: "",
            ctl: "演唱会",
            sctl: "",
            tsg: 0,
            st: "",
            et: "",
            order: 1,
            pageSize: 30,
            currPage: currPage,//用的是全局变量
            tn: "",
        },
        dataType: "json",
        success: function (res) {
            // console.log(res);
            //res.pageData.totalPage 最多多少页
            //res.pageData.resultData 用它来渲染页面

            //渲染页面
            bindHtml(res.pageData.resultData);

        //    if(flag===true){
        //     bindPagi(res.pageData.totalPage)  //渲染分页器
        //    }
           //也可以写成短路表达式
           flag && bindPagi(res.pageData.totalPage);
        }
    })
}

//渲染页面
function bindHtml(list){
    console.log(list)

    let str="";
    list.forEach(function(item){
        str+=` <li>
        <img src="${item.verticalPic}"/>
        <p>${item.name}</p>
    </li>`
    })
    $(".box ul")
        .html(str)
}

//渲染分页器
function bindPagi(totalPage){
    // console.log(totalPage)
    flag=false;
    $('.pagi').pagination({
        pageCount:totalPage,//总页数
        jump: true,
        coping: true,
        homePage: '首页',
        endPage: '末页',
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) {
            // console.log(api.getCurrent());

            //给全局准备的变量赋值，每切换一次全局变量就赋值一次
            currPage=api.getCurrent();

            getList()
        }
    })
}
