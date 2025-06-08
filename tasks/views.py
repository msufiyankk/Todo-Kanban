from django.shortcuts import render
from tasks.models import Todo

def home(request):
    tasks = Todo.objects.all()
    print(tasks,'ffffffffffffffffffffffffffffffffffffffff')
    return render(request,'home.html',{'todos':tasks})

