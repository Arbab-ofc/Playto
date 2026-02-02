from django.core.cache import cache


def bust_posts_cache():
    delete_pattern = getattr(cache, 'delete_pattern', None)
    if callable(delete_pattern):
        delete_pattern('views.decorators.cache.cache_page.*')
    else:
        cache.clear()


def bust_leaderboard_cache():
    cache.delete('leaderboard_24h')
