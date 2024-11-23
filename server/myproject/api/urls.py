from django.urls import path
from . views import get_book,create_book,book_details
urlpatterns = [
    path('books/', get_book, name='get_book'),
    path('books/create/', create_book, name='create_book'),
    path('books/<int:pk>', book_details, name='book_details'),
]