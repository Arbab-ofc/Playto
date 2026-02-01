import re
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    total_karma = serializers.IntegerField(read_only=True)
    karma_last_24h = serializers.IntegerField(read_only=True)
    total_posts = serializers.SerializerMethodField()
    total_comments = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'bio',
            'created_at',
            'total_karma',
            'karma_last_24h',
            'total_posts',
            'total_comments',
        ]

    def get_total_posts(self, obj):
        return obj.posts.count()

    def get_total_comments(self, obj):
        return obj.comments.count()


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'bio']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    full_name = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'full_name']

    def validate_password(self, value):
        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError(
                'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.'
            )
        return value

    def create(self, validated_data):
        full_name = validated_data.pop('full_name', '').strip()
        first_name = ''
        last_name = ''
        if full_name:
            parts = full_name.split()
            first_name = parts[0]
            last_name = ' '.join(parts[1:]) if len(parts) > 1 else ''
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
        )
        return user
