import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useCreateComment } from '../../hooks/useComments';
import { useAnon } from '../../context/AnonContext';
import { useUserSearch } from '../../hooks/useUsers';

export const CommentForm = ({ postId, parentId = null }) => {
  const [content, setContent] = useState('');
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionStart, setMentionStart] = useState(null);
  const [cursorPos, setCursorPos] = useState(0);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef(null);
  const createComment = useCreateComment();
  const { anonymous } = useAnon();
  const { data: suggestions = [] } = useUserSearch(debouncedQuery);

  const suggestionList = useMemo(
    () => (Array.isArray(suggestions) ? suggestions : []),
    [suggestions]
  );

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(mentionQuery.trim()), 200);
    return () => clearTimeout(timer);
  }, [mentionQuery]);

  const updateMentionState = (nextValue, selectionStart) => {
    const cursor = typeof selectionStart === 'number' ? selectionStart : nextValue.length;
    setCursorPos(cursor);
    const beforeCursor = nextValue.slice(0, cursor);
    const atIndex = beforeCursor.lastIndexOf('@');
    if (atIndex === -1) {
      setMentionQuery('');
      setMentionStart(null);
      return;
    }

    const charBefore = atIndex === 0 ? '' : beforeCursor[atIndex - 1];
    const validPrefix = atIndex === 0 || /\s/.test(charBefore);
    if (!validPrefix) {
      setMentionQuery('');
      setMentionStart(null);
      return;
    }

    const token = beforeCursor.slice(atIndex + 1);
    if (!/^[A-Za-z0-9_]*$/.test(token)) {
      setMentionQuery('');
      setMentionStart(null);
      return;
    }

    setMentionQuery(token);
    setMentionStart(atIndex);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate({ post: postId, parent_id: parentId, content, is_anonymous: anonymous });
    setContent('');
    setMentionQuery('');
    setMentionStart(null);
  };

  const handleSelectSuggestion = (username) => {
    if (mentionStart === null) return;
    const before = content.slice(0, mentionStart);
    const after = content.slice(cursorPos);
    const nextValue = `${before}@${username} ${after}`;
    const nextCursor = `${before}@${username} `.length;
    setContent(nextValue);
    setMentionQuery('');
    setMentionStart(null);
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(nextCursor, nextCursor);
      }
    });
  };

  const showSuggestions = mentionStart !== null && debouncedQuery.length > 0;

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center space-x-2">
      <div className="relative flex-1">
        <Input
          ref={inputRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            updateMentionState(e.target.value, e.target.selectionStart);
          }}
          onClick={(e) => updateMentionState(e.currentTarget.value, e.currentTarget.selectionStart)}
          onKeyUp={(e) => updateMentionState(e.currentTarget.value, e.currentTarget.selectionStart)}
          placeholder="Write a reply..."
        />
        {showSuggestions && suggestionList.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-cream border border-line rounded-2xl shadow-lift z-20 max-h-56 overflow-y-auto">
            {suggestionList.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleSelectSuggestion(user.username)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-canvas/80 transition-colors"
              >
                <span className="font-semibold">@{user.username}</span>
                {user.first_name ? (
                  <span className="text-xs text-ink/60 ml-2">{user.first_name}</span>
                ) : null}
              </button>
            ))}
          </div>
        )}
      </div>
      <Button type="submit" variant="secondary">Reply</Button>
    </form>
  );
};
