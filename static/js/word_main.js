window.addEventListener('load', function() {
    fn();

    var btn = document.getElementById('endbtn')
    var btnnext = document.getElementById('btnnext')
    var div1 = document.getElementById('div_first')
    var lables = document.querySelectorAll('label');
    var danci = document.getElementById('danci')
    var alldata = null
    var questionSum = 0

    btn.onclick = fn
    btnnext.addEventListener('click',function(){
        var nowxu = div1.xu

        if(nowxu < questionSum -1)
        {
            div1.xu ++;
            console.log(nowxu + 1,div1.xu)
            console.log(alldata[div1.xu])
            danci.innerHTML = '单词：' + alldata[div1.xu].english_word
            for(var j = 0;j<lables.length;j++)
                {
                    lables[j].innerHTML = alldata[div1.xu].answer[j]
                    lables[j].parentNode.style.background = 'pink'
                }
        }
        else if(nowxu === questionSum -1)
        {
            alert('恭喜你，已经做完'+questionSum +'道题')
        }

    })
    function next(){
        var nowxu = div1.xu

        if(nowxu < questionSum -1)
        {
            div1.xu ++;
            console.log(nowxu + 1,div1.xu)
            console.log(alldata[div1.xu])
            danci.innerHTML = '单词：' + alldata[div1.xu].english_word
            for(var j = 0;j<lables.length;j++)
                {
                    lables[j].innerHTML = alldata[div1.xu].answer[j]
                    lables[j].parentNode.style.background = 'pink'
                }
            if(alldata[div1.xu].response === 'right')
            {
                for(var j = 0;j<lables.length;j++)
                {
                    if(lables[j].innerHTML === alldata[div1.xu].rightAnswer)
                    {
                        lables[j].parentNode.style.background = 'green'
                    }

                }
            }
            else if(alldata[div1.xu].response === 'wrong')
            {
                for(var j = 0;j<lables.length;j++)
                {
                    if(lables[j].innerHTML === alldata[div1.xu].wrongAnswer)
                    {
                        lables[j].parentNode.style.background = 'red'
                    }

                }
            }
        }
        else if(nowxu === questionSum -1)
        {
            alert('恭喜你，已经做完'+questionSum +'道题')
        }
    }
    function fn(){
        var canshu = location.search
        canshu = canshu.substr(1)
        canshu_list = canshu.split('&')
        var begin = canshu_list[0].substr(6)
        var end = canshu_list[1].substr(4)

        $.ajax({
        url: 'http://127.0.0.1:8000/getData?newbegin=' + parseInt(begin) + '&' + 'newend=' + parseInt(end),
        type: 'GET',
        data: {
            'begin':1,
            'end':2
        },
        success: function (e) {
            // console.log(e)
            // console.log(e.data[0])v
            alldata = e.data
            questionSum = e.data.length
            for(var i = 0;i<e.data.length;i++)
            {
                console.log(e.data[i])
                e.data[i].xu = i
                e.data[i].response = 'not'

            }
            alldata = e.data
            var div1 = document.getElementById('div_first')
            div1.xu = 0
            var lables = document.querySelectorAll('label');
            // console.log(lables)
            danci.innerHTML = '单词： ' + e.data[0].english_word
            for(var j = 0;j<lables.length;j++)
            {
                lables[j].innerHTML = e.data[0].answer[j]
            }
            addkuang();
            kuang_jia();
        }

    });
    }
    div1.addEventListener('click',function(e){

        myTarget = e.target
        content = myTarget.querySelectorAll('label')[0].innerHTML


        var nowxu = div1.xu
        console.log(alldata[nowxu])
        if (myTarget === div1)
        {

        }
        else{
            if(alldata[nowxu].response === 'not')
            {
                 if(content === alldata[nowxu].rightAnswer)
                {
                    myTarget.style.background = 'green';
                    alldata[nowxu].response = 'right';
                }
                else{

                    myTarget.style.background = 'red';
                    alldata[nowxu].response = 'wrong';
                    alldata[nowxu].wrongAnswer = content
                }

                // console.log(alldata)
                var timer1 = setTimeout(next, 500);
            }


        }
        kuang_jia();


    })
    function addkuang(){

        var record = document.querySelector('.record')
        for(var i =0;i<questionSum;i+=5)
        {
            var cv = 5;
            var record_son = document.createElement('div');
            record.appendChild(record_son)
            // console.log('正在创建')
            record_son.className = 'record_son'
            while(cv--)
            {
                if (i + (5 - cv) - 1 < questionSum)
                {
                    var son = document.createElement('div');
                    record_son.appendChild(son)
                    son.className = 'litter';
                    son.setAttribute('index', i + (5 - cv) - 1);

                    // console.log(son)
                    // console.log(son.getAttribute('index'))
                    // console.log(alldata[son.getAttribute('index')])
                }

            }
        }


    }
    function kuang_jia(){
        var record_sons = document.querySelectorAll('.record_son')

        // console.log(1112,record_sons.length)

        for(var i = 0;i<record_sons.length;i++)
        {

            var record_son = record_sons[i]
            // console.log(record_son)
            var sons = record_son.querySelectorAll('div')
            // console.log(222,sons)
            for(var j = 0;j<sons.length;j++)
            {
                var son = sons[j]
                son.addEventListener('click',function(){
                    var nowxu = this.getAttribute('index')
                    if(nowxu<questionSum && nowxu>=0) {
                        div1.xu = nowxu;
                        danci.innerHTML = '单词：' + alldata[nowxu].english_word
                        for(var j = 0;j<lables.length;j++)
                        {
                            lables[j].innerHTML = alldata[nowxu].answer[j]
                            lables[j].parentNode.style.background = 'pink'
                        }

                        if (alldata[nowxu].response === 'not')
                        {

                        }
                        else if(alldata[nowxu].response === 'right')
                        {
                            for(var j = 0;j<lables.length;j++)
                            {
                                if(lables[j].innerHTML === alldata[nowxu].rightAnswer)
                                {
                                    lables[j].parentNode.style.background = 'green'
                                }

                            }
                        }
                        else
                        {
                            for(var j = 0;j<lables.length;j++)
                            {
                                if(lables[j].innerHTML === alldata[nowxu].wrongAnswer)
                                {
                                    lables[j].parentNode.style.background = 'red'
                                }

                            }
                        }

                    }


                })
                son.innerHTML =  parseInt(son.getAttribute('index')) + 1
                if(alldata[son.getAttribute('index')].response === 'not')
                {
                    son.className = "litter not"
                }
                else if(alldata[son.getAttribute('index')].response === 'right')
                {
                    son.className = "litter right"
                }
                else
                {
                    son.className = "litter wrong"
                }
                // console.log(son)

            }
        }
    }




})