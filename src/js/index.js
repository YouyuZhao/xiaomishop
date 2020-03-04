getList();
function getList(){
    $.ajax({
        url:"../lib/json/nav.json",
        dataType:"json",
        success:function(res){
            console.log(res)

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
                    console.log(list)

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