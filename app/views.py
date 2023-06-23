import boto3
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer, MediaFileSerializer
from .models import Profile, MediaFile
from rest_framework_simplejwt.tokens import RefreshToken

s3_client = boto3.client(
    's3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
)


@api_view(['POST'])
def register(request):
    username = request.data['username']
    password = request.data['password']
    email = request.data['email']

    if User.objects.filter(username=username).exists():
        return JsonResponse({'message': 'Username already exists'})

    if User.objects.filter(email=email).exists():
        return JsonResponse({'message': 'Email already exists'})

    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()

    return JsonResponse({'message': 'User registered successfully'})



@api_view(['POST'])
def login_view(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # login(request, user)
        return JsonResponse({'message': 'Login successful', 'access_token': access_token})
    else:
        return JsonResponse({'message': 'Invalid credentials'}, status=401)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def create_or_edit_profile(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)

    serializer = ProfileSerializer(instance=profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    else:
        return JsonResponse(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    image = request.FILES['image']

    signed_url = generate_signed_url(image.name)
    upload_file_to_s3(image, signed_url)

    media_file = MediaFile.objects.create(profile=profile, media_type='image', file=signed_url)
    serializer = MediaFileSerializer(media_file)
    return JsonResponse(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_video(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    video = request.FILES['video']

    signed_url = generate_signed_url(video.name)
    upload_file_to_s3(video, signed_url)

    media_file = MediaFile.objects.create(profile=profile, media_type='video', file=signed_url)
    serializer = MediaFileSerializer(media_file)
    return JsonResponse(serializer.data)


def generate_signed_url(filename):
    signed_url = s3_client.generate_presigned_url(ClientMethod='put_object',
                                                  Params={
                                                      'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                                                      'Key': filename,
                                                      'ACL': 'public-read',
                                                  },
                                                  ExpiresIn=3600
                                                  # Set the expiration time for the signed URL (in seconds)
                                                  )

    return signed_url


def upload_file_to_s3(file, signed_url):
    s3_client.put_object(
        Body=file,
        Bucket=settings.AWS_STORAGE_BUCKET_NAME,
        Key=signed_url.split('/')[-1],  # Extract the object key from the signed URL
        ACL='public-read'
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def media_listing(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    images = MediaFile.objects.filter(profile=profile, media_type='image')
    videos = MediaFile.objects.filter(profile=profile, media_type='video')

    image_serializer = MediaFileSerializer(images, many=True)
    video_serializer = MediaFileSerializer(videos, many=True)

    data = {
        'profile': ProfileSerializer(profile).data,
        'images': image_serializer.data,
        'videos': video_serializer.data
    }
    return JsonResponse(data)


@api_view(['GET'])
def home(request):
    return JsonResponse({'message': 'Welcome to the home page'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    try:
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        return JsonResponse(serializer.data)
    except Profile.DoesNotExist:
        return JsonResponse({'message': 'Profile does not exist'}, status=404)

