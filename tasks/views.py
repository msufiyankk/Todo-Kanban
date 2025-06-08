from django.shortcuts import render,redirect
from tasks.models import Todo

def home(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description', '')
        status = request.POST.get('status', 'todo')
        if title:  # Basic validation
            Todo.objects.create(title=title, description=description, status=status)
            print(title,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
            return redirect('/') 
    tasks = Todo.objects.all()
    # print(request.POST,"ooooooooooooooooooooooooooooooooooooo")


    # print(tasks,'ffffffffffffffffffffffffffffffffffffffff')
    return render(request,'home.html',{'todos':tasks})

