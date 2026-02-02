# Playto Technical Explainer

## Overview
Playto is a gamified community feed with threaded discussions, anonymous mode, public profiles, and a 24‑hour leaderboard. The system focuses on performance, data integrity, and smooth UX patterns (infinite scroll + bottom sheet details).

## Nested Comments (MPTT)
Playto uses **django-mptt** for threaded comments:

- Efficient traversal of large trees
- Single query retrieval for the full tree
- Fast descendant/ancestor queries using integer boundaries

### N+1 Solution
Comments are preloaded with author data:

```python
Post.objects.select_related('author').prefetch_related(
    Prefetch('comments', queryset=Comment.objects.select_related('author').order_by('tree_id', 'lft'))
)
```

The frontend rebuilds the tree in O(n) using `parent_id`.

## 24-Hour Leaderboard
Leaderboard values are calculated from **KarmaTransaction** within the last 24 hours. The results are cached for 60 seconds to reduce heavy aggregation load.

## Likes and Concurrency
Likes are protected against race conditions using:
- unique constraints
- atomic transactions
- F() expressions

## Anonymous Mode
Logged‑in users can toggle anonymous mode:
- Stored in frontend localStorage
- Passed to backend as `is_anonymous`
- Backend hides author identity by returning `Anonymous`

## Posts & Comments API
Key endpoints:
- `GET /api/posts/` (public, cached)
- `POST /api/posts/` (auth, supports `is_anonymous`)
- `POST /api/comments/` (auth, supports `is_anonymous`)
- `GET /api/leaderboard/`
- `GET /api/auth/me/`
- `PATCH /api/auth/me/` (update bio)
- `GET /api/auth/users/by-username/<username>/` (public profile by username)
- `GET /api/auth/users/search/?q=` (mention autocomplete)

## Mentions
Comment content supports `@username` mentions:
- Frontend detects mentions and renders them as profile links.
- Comment form includes lightweight autocomplete backed by `users/search`.

## UI/UX Patterns
- **Infinite scroll** for Latest Posts (React Query + IntersectionObserver).
- **Bottom sheet drawer** for full post + comments.
- **Dark mode** with textured noise background.
- **Auth gating** for create post/comments + protected profile.

## Profile
Profile shows:
- Karma stats
- Editable bio
- Infinite scroll list of user posts
- Real stats for posts/replies

Public profile shows:
- Total karma and 24h karma
- Total likes across their posts
- Highlights for posts/replies
- User posts list

## Caching
- Posts list cached for 30 seconds.
- Leaderboard cached for 60 seconds.

## Security & Access
- JWT authentication
- Login/register blocked when authenticated
- Profile protected
- Tokens cleared on 401

## Testing
- Backend tests for leaderboard and concurrent likes
- Frontend tests for comment tree rendering
