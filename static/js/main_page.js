window.addEventListener('load',function(){
    fn();
    var alldata = null

     var timer1 = setTimeout(next, 300);
     function next(){
         console.log('函数内',alldata)
     }
    function fn(){
        $.ajax({
        url: 'main_page_data',
        type: 'GET',
        data: {},
        success: function (e) {
            // console.log(e.data)
            alldata = e.data
            console.log(alldata[0])
            create_table(alldata[0])
        }

    });

        function create_table(book){
            var tbody = document.querySelector('tbody')
            var tr = document.createElement('tr');
            tbody.appendChild(tr)
            var thead = document.querySelector('thead')
            console.log(222,thead.children[0].children.length)
            book_list = [book.bookname,book.introduce,book.danci_sum]

            for(var i=0;i<thead.children[0].children.length;i++)
            {
                console.log('正在创建。。',i)
                var th = document.createElement('th');
                tr.appendChild(th)

                th.innerHTML = book_list[i]
            }
            tr.children[tr.children.length-1].innerHTML = '<input id="ipu1" type="text" value="a"><input id="ipu2" type="text" value="b"><button id="btn">搜索</button>'
            var btn = document.querySelector('#btn')
            btn.addEventListener('click',function(){

                var ipu1 = document.querySelector('#ipu1')
                var ipu2 = document.querySelector('#ipu2')
                console.log(ipu1.value,ipu2.value)
                window.location.href = 'http://127.0.0.1:8000/beidanci?begin=' + ipu1.value + '&' + 'end=' + ipu2.value;
            })
            // tr.children[tr.children.length-1].innerHTML = '<a id="'+ book.bid+'" href="javascript:;">背诵</a> <a id="'+ book.bid+'" href="javascript:;">背诵2</a>'
            // var a = tr.children[tr.children.length-1].children[0]
            // var a2 = tr.children[tr.children.length-1].children[1]
            // a.addEventListener('click',function(){
            //
            //     $.ajax({
            //         url: 'book_detail',
            //         type: 'GET',
            //         data: {
            //             'mode':0,
            //             'bid':a.getAttribute('id')
            //         },
            //         success: function (e) {
            //             // console.log(e.data)
            //
            //         }
            //
            //         });
            // })
            // a2.addEventListener('click',function(){
            //     var content = prompt().split(" ")
            //     console.log(content)
            //     console.log(typeof content[0])
            //     var begin = parseInt(content[0])
            //     var end = parseInt(content[1])
            //     if(!begin.isNAN && !end.isNAN)
            //     {
            //         // window.location.href = 'http://127.0.0.1:8000/we/';
            //         console.log(begin,end)
            //         $.ajax({
            //         url: 'book_detail',
            //         type: 'GET',
            //         data: {
            //             'mode':1,
            //             'bid':a.getAttribute('id'),
            //             'begin':begin,
            //             'end':end
            //         },
            //         success: function (e) {
            //             // console.log(e.data)
            //
            //         }
            //
            //         });
            //     }
            // else{
            //         alert('输入格式不正确！！！')
            //     }
            //
            //
            // })
        }


    }
})

