//渲染nav
getList();
function getList(){
    $.ajax({
        url:"../lib/json/nav.json",
        dataType:"json",
        success:function(res){
            // console.log(res)

            //准备一个空字符串，准备渲染一级菜单
            let str="";
            
            //开始渲染
            res.forEach(item => {
                str+=`<li>${ item.name }</li>`
            })

            //填充到一级菜单里面
            $(".nav ul")
                .html(str)
                //给一级菜单添加移入移出事件
                .on({
                    mouseenter:function(){$(".nav-box").stop().slideDown()},
                    mouseleave:()=>$(".nav-box").stop().slideUp(),
                })
                .children("li")//找到所有一级菜单下的所有li
                .on("mouseover",function(){
                    const index=$(this).index();
                    const list=res[index].list;//找到要渲染的list数组
                    // console.log(list)

                    //准备一个空字符串，准备渲染二级菜单
                    let str="";

                    //开始渲染
                    list.forEach(function(item){
                        str+=`
                        <li>
                            <div>
                                <img src="${item.list_url}" alt="">
                            </div>
                            <p class="title">${item.list_name}</p>
                            <span class="price">${item.list_price}</span>
                        </li>`
                    })


                    //填充到二级菜单里面
                    $(".nav-box ul")
                        .html(str)

                }) 
            
            //给nav-box添加移入移出事件
            $(".nav-box")
                .on({
                    mouseover:function(){$(this).finish().show()},
                    mouseout:function(){$(this).finish().slideUp()}
                })
            
            
        }
    })
}

$(document).ready(function () {
    var mySwiper = new Swiper('.swiper1', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay:{
            delay:1000},
        // 如果需要分页器
        pagination: {
            el: '.swp1',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    }) 
   })

//渲染banner下面的nav-list
getNavlist();
function getNavlist(){
    $.ajax({
        url:"../lib/json/banner.json",
        dataType:"json",
        success:function(res){
            console.log(res);

            //准备一个空字符串
            let str="";

            //开始渲染nav-list
            res.forEach(function(item){
              str+=`
              <li>
              <span>${item.title}</span>
              <i class="iconfont icon-arrow-right-copy-copy-copy"></i>
              </li>`  
            })

            //填充到nav-list的ul里面
            $(".banner .nav-list ul")
                .html(str)
            //并给它添加移入移出事件
                .on({
                    mouseenter:function(){$(".nav-list-box").stop().show()},
                    mouseleave:function(){$(".nav-list-box").stop().hide()}
                })
            
            //找到nav-list的ul里面的所有的li
               .children("li")
               .on("mouseover",function(){
                   $(this).css('background', 'red');//移入时颜色变红
                   const index=$(this).index();
                   const list=res[index].list;//找到要渲染的list数组
                //    console.log(list)

                //准备一个空字符串准备渲染nav-list-box
                   let str="";
                   //开始渲染
                   list.forEach(function(item){
                        str+=`<li>${item.name}</li>`
                   })
                   //放到.nav-list-box的ul里面
                   $(".nav-list-box ul")
                        .html(str)
               })
               .on("mouseout",function(){
                   $(this).css('background', '');//移出时颜色复原
               })

               $(".nav-list-box")
                    .on({
                        mouseover:function(){$(this).finish().show()},
                        mouseout:function(){$(this).finish().hide()}
                    })
        }
    })
}
$(document).ready(function () {
    var mySwiper = new Swiper('.swiper2', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay:{
            delay:1000},
        // 如果需要分页器
        pagination: {
            el: '.swp2',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    }) 
   })