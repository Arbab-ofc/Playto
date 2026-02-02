import { Link } from 'react-router-dom';
import { parseMentions } from '../../utils/parseMentions';

export const MentionText = ({ text, className, as: Tag = 'p' }) => {
  const parts = parseMentions(text || '');

  return (
    <Tag className={className}>
      {parts.map((part, index) => {
        if (part.type === 'mention') {
          const username = part.value;
          return (
            <Link
              key={`${username}-${index}`}
              to={`/u/${encodeURIComponent(username)}`}
              className="text-ink/90 hover:text-accent transition-colors"
            >
              @{username}
            </Link>
          );
        }

        return <span key={`text-${index}`}>{part.value}</span>;
      })}
    </Tag>
  );
};
