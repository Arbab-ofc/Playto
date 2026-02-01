export const buildCommentTree = (comments) => {
  const map = new Map();
  const roots = [];

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach((comment) => {
    const node = map.get(comment.id);
    if (comment.parent_id === null) {
      roots.push(node);
    } else {
      const parent = map.get(comment.parent_id);
      if (parent) {
        parent.replies.push(node);
      }
    }
  });

  return roots;
};
