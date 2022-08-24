"""word URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from word_home import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('beidanci', views.test,name='beidanci'),
    path('',views.main_page),
    path('main_page_data', views.main_page_data,name='main_page_data'),
    path('book_detail', views.book_detail, name='book_detail'),
    path('getData',views.getDData),
    path('load_data',views.load_data,name='load_data')
]
