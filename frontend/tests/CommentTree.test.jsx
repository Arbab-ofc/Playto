import { render, screen } from '@testing-library/react';
import { CommentTree } from '../src/components/comments/CommentTree';

describe('CommentTree', () => {
  it('builds nested comment structure correctly', () => {
    const comments = [
      { id: 1, parent_id: null, content: 'Root comment', replies: [] },
      { id: 2, parent_id: 1, content: 'Reply to root', replies: [] },
      { id: 3, parent_id: 2, content: 'Nested reply', replies: [] },
      { id: 4, parent_id: null, content: 'Another root', replies: [] }
    ];

    render(<CommentTree comments={comments} />);

    expect(screen.getByText('Root comment')).toBeInTheDocument();
    expect(screen.getByText('Another root')).toBeInTheDocument();
    expect(screen.getByText('Reply to root')).toBeInTheDocument();
    expect(screen.getByText('Nested reply')).toBeInTheDocument();
  });
});
