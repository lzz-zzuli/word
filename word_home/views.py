from django.shortcuts import render
from . import models
from django.shortcuts import render, reverse, redirect, HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
import random
from django.conf import settings
import xlrd
from . import import_data

# Create your views here.
def test(request):
    book = models.Book.objects.get(id=1)
    words = book.my_words()
    books2 = book.my_words(b_list=1)[0]
    aa = []
    aa.append(books2)
    print("book1:",words)
    print("book2:",books2)
    context = {
        'word':aa
    }

    return render(request,'words/test_word.html',context)
def getDData(request):
    if request.method == 'GET':
        get_list = request.GET
        print(get_list)
        begin,end = get_list['newbegin'],get_list['newend']
        print(begin,end)
        book = models.Book.objects.get(id=1)
        words = book.my_words(begin=begin, end=end)
        data = zhuan(words)
        return JsonResponse({'data':data})

def load_data(request):
    if request.method == 'POST':
        file = request.FILES.getlist('data')[0]
        print(file)
        print(type(file))
        url = str(settings.BASE_DIR) + '/static/files/' + str(file.name)
        with open(url, 'wb')as f:
            for data in file.chunks():
                f.write(data)
        xlsx = xlrd.open_workbook(url)
        data = import_data.get_data_fromexcel(xlsx)
        print(data)
        book = models.Book.objects.get(id=1)
        for i in data:
            print(i)
            word = models.Word()
            word.chinese_word = i['chinese_word']
            word.english_word = i['english_word']
            word.list = i['list']
            word.page = i['page']
            word.bid = book
            word.save()
            print(word)
        return_url = reverse('load_data')
        return HttpResponse(f'<script>alert("上传成功");location.href="' + return_url + '";</script>')


    elif request.method == 'GET':
        return render(request, 'words/load_data.html')

def main_page(request):
    if request.method == 'GET':
        return render(request,'words/main_page.html')

def main_page_data(request):
    if request.method == 'GET':
        books = models.Book.objects.all()
        data = []
        for book in books :
            data.append(
                {
                    'bid':book.id,
                    'bookname':book.bookname,
                    'introduce': '暂无',
                    'danci_sum':book.my_words().count(),

                }
            )
        return JsonResponse({'data':data})

def book_detail(request):
    if request.method =="GET":
        mode = request.GET['mode']
        bid = request.GET['bid']
        book = models.Book.objects.get(id=bid)
        if mode == 1 or mode == '1':
            begin,end = request.GET['begin'],request.GET['end']
            words = book.my_words(begin=begin,end=end)
            data = zhuan(words)
            context = {
                'begin':begin,
                'end':end
            }
            print('zxcv')
            return render(request,'words/test_word.html',context)



def zhuan(words):
    data = []
    for w in words:
        otherData = [i for i in words if i.id != w.id]
        wrong = random.sample(list(otherData), 3)
        wrongAnswer = [i.chinese_word for i in wrong]

        answer = [w.chinese_word, wrongAnswer[0], wrongAnswer[1], wrongAnswer[2]]
        random.shuffle(answer)
        data.append(
            {
                'english_word': w.english_word,
                'rightAnswer': w.chinese_word,
                'answer': answer,
            }
        )
    return data
