from django.db import models

# Create your models here.

class Book(models.Model):
    bookname = models.CharField(max_length=128)

    class Meta:
        verbose_name_plural = "Book"

    def my_words(self,b_list=False,begin=False,end=False):
        if b_list:
            books = self.book_word.all().filter(list=b_list)
        elif begin and end:
            all = self.book_word.all()
            all = [i.page for i in all]
            if int(begin) < int(min(all)):
                begin = int(min(all))
            if int(end) > int(max(all)):
                end = int(max(all))
            range_list = range(int(begin),int(end)+1)
            print(range_list)
            books = self.book_word.all().filter(page__in=range_list)
        else:
            books = self.book_word.all()
        return books


class Word(models.Model):
    english_word = models.CharField(max_length=128)
    chinese_word = models.CharField(max_length=256)
    list = models.IntegerField()
    page = models.IntegerField(default=0)
    bid = models.ForeignKey(Book,on_delete=models.CASCADE,related_name="book_word",null=True)