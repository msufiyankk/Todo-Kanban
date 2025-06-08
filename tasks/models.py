from django.db import models

# Create your models here.
STATUS_CHOICES = [
    ("todo", "To Do"),
    ("doing", "Doing"),
    ("done", "Done"),
]


class Todo(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="todo")

    def __str__(self):
        return f"{self.title} | {self.status}"

