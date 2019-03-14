# Django-sns

* 해당 프로젝트는 `https://github.com/eduyu/django-sns` 참고
* models.py

```python
from django.db import models

# imagekit
from imagekit.models import ProcessedImageField, ImageSpecField
from imagekit.processors import ResizeToFit

# Create your models here.


class Posting(models.Model):
    content = models.TextField(default='')
    icon = models.CharField(max_length=20, default='')
    # Save as origin
    # image = models.ImageField(blank=True, upload_to='postings/%Y%m%d')
    # Resize
    image = ProcessedImageField(
        blank=True,
        upload_to='postings/resize/%Y%m%d',
        processors=[ResizeToFit(width=960, upscale=False)],
        format='JPEG'
    )

    image_thumbnail = ImageSpecField(
        source='image',
        processors=[ResizeToFit(width=320, upscale=False)],
        format='JPEG',
        options={'quality': 60},
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}: {self.content[:20]}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        print()
        print(f"=== Saved Posting with id: {self.id} ===")
        print(f"    content: {self.content}")
        if self.image:
            print(f"    image: {self.image.width}px * {self.image.height}px: {round(self.image.size / 1024)}kb")
        print("=================================")


class Comment(models.Model):
    posting = models.ForeignKey(Posting, on_delete=models.CASCADE)
    content = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.posting.content[:10]}: {self.content[:20]}"
```

* urls.py

```python
from django.urls import path
from . import views

app_name = 'sns'

urlpatterns = [
    path('', views.posting_list, name='posting_list'),
    path('<int:posting_id>/', views.posting_detail, name='posting_detail'),
    path('create/', views.create_posting, name='create_posting'),

    path('<int:posting_id>/comments/create/', views.create_comment, name='create_comment'),
]
```

* views.py

```python
from django.shortcuts import render, get_object_or_404, redirect
from . models import Posting, Comment

# Create your views here.


def posting_list(request):
    postings = Posting.objects.order_by('-updated_at')
    context = {
        'postings': postings,
    }
    return render(request, 'sns/list.html', context)


def posting_detail(request, posting_id):
    posting = get_object_or_404(Posting, id=posting_id)
    comments = posting.comment_set.order_by('-created_at')  # TODO: Duck-typing
    context = {
        'posting': posting,
        'comments': comments,
    }
    return render(request, 'sns/detail.html', context)


def create_posting(request):
    if request.method == 'POST':
        posting = Posting()
        posting.content = request.POST.get('content')
        posting.icon = request.POST.get('icon')
        posting.image = request.FILES.get('image')
        posting.save()
        return redirect('sns:posting_detail', posting.id)
    else:
        return redirect('sns:posting_list')


def create_comment(request, posting_id):
    posting = get_object_or_404(Posting, id=posting_id)
    if request.method == 'POST':
        comment = Comment()
        comment.content = request.POST.get('comment')
        comment.posting = posting
        comment.save()
    return redirect('sns:posting_detail', posting.id)
```

