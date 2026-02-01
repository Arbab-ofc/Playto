import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useCreatePost } from '../../hooks/usePosts';
import { useAnon } from '../../context/AnonContext';

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const createPost = useCreatePost();
  const { anonymous } = useAnon();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    createPost.mutate({ content, is_anonymous: anonymous });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="phone-frame p-6">
      <h3 className="font-display text-2xl mb-4">Share a moment</h3>
      <div className="space-y-4">
        <label className="text-xs uppercase tracking-[0.2em] text-ink/60">Post</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a concise update"
          className="w-full min-h-[140px] bg-cream border border-line rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 mb-2"
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button type="submit" variant="primary">Publish</Button>
      </div>
    </form>
  );
};
