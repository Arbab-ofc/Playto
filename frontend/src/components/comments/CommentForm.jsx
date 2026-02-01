import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useCreateComment } from '../../hooks/useComments';
import { useAnon } from '../../context/AnonContext';

export const CommentForm = ({ postId, parentId = null }) => {
  const [content, setContent] = useState('');
  const createComment = useCreateComment();
  const { anonymous } = useAnon();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate({ post: postId, parent_id: parentId, content, is_anonymous: anonymous });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a reply..."
      />
      <Button type="submit" variant="secondary">Reply</Button>
    </form>
  );
};
