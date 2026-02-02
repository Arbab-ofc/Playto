const mentionRegex = /(^|[^A-Za-z0-9_])@([A-Za-z0-9_]{1,30})/g;

export const parseMentions = (text = '') => {
  const parts = [];
  let lastIndex = 0;

  let match = mentionRegex.exec(text);
  while (match) {
    const [fullMatch, prefix, username] = match;
    const start = match.index;
    const mentionStart = start + prefix.length;

    if (start > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, start) });
    }

    if (prefix) {
      parts.push({ type: 'text', value: prefix });
    }

    parts.push({ type: 'mention', value: username });
    lastIndex = mentionStart + 1 + username.length;

    match = mentionRegex.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return parts;
};
