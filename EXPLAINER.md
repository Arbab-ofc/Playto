# Playto Technical Explainer

## The Tree: Nested Comments Implementation

### Database Model

We use django-mptt (Modified Preorder Tree Traversal) to model nested comments efficiently.

Why MPTT?
- Single query retrieval for entire comment tree
- Efficient ordering without recursion
- Fast ancestor/descendant queries using integer comparisons

### N+1 Solution

Bad approach: 1 query for post + N queries for each comment author.

Good approach: prefetch related authors in a single query:

```python
post = Post.objects.prefetch_related(
    Prefetch(
        'comments',
        queryset=Comment.objects.select_related('author').order_by('tree_id', 'lft')
    )
).get(id=1)
```

### Serialization Strategy

We return flat comments and let the frontend build the tree in O(n) time.

```javascript
function buildCommentTree(flatComments) {
  const map = new Map();
  const roots = [];

  flatComments.forEach(comment => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  flatComments.forEach(comment => {
    const node = map.get(comment.id);
    if (comment.parent_id === null) {
      roots.push(node);
    } else {
      map.get(comment.parent_id)?.replies.push(node);
    }
  });

  return roots;
}
```

## The Math: 24-Hour Leaderboard Calculation

Requirements:
- Calculate karma earned in last 24 hours only
- Cannot store a daily field on User
- Must aggregate from transaction history

Django ORM:

```python
leaderboard = User.objects.annotate(
    karma_24h=Sum(
        'karma_transactions__amount',
        filter=Q(karma_transactions__created_at__gte=twenty_four_hours_ago)
    ),
    total_posts=Count('posts', distinct=True),
    total_comments=Count('comments', distinct=True)
).filter(
    karma_24h__isnull=False,
    karma_24h__gt=0
).order_by('-karma_24h')[:5]
```

### Performance Optimizations

- Index on created_at for time filtering
- Composite index on (user, created_at)
- Redis caching for leaderboard (60 seconds)

## The AI Audit: Bug Discovery & Fix

### Race Condition in Like Handler

Fixed with:
- unique constraint on Like
- F() expressions for atomic increments
- transaction.atomic to ensure all-or-nothing

### N+1 Query in Comment Serializer

Fixed with:
- select_related('author')
- annotate reply counts

Key takeaways:
- MPTT + Prefetch solves comment tree N+1 problem
- Time-filtered aggregation enables dynamic leaderboards
- Atomic operations + constraints prevent race conditions
- Test with realistic data to catch performance issues
