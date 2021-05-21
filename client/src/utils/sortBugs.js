const isBigger = (priority) => {}
export const sortBugs = (bugs, sortBy) => {
  switch (sortBy) {
    case 'newest':
      return bugs.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    case 'oldest':
      return bugs.slice().sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

    case 'a-z':
      return bugs.slice().sort((a, b) => a.title.localeCompare(b.title));

    case 'z-a':
      return bugs.slice().sort((a, b) => b.title.localeCompare(a.title));
    case 'h-l':
      return bugs.slice().sort((a, b) => {
        if (a.priority === 'high') return 1;
        if (b.priority === 'low') return -1;
        return 0;
      });
    case 'l-h':
      return bugs.slice().sort((a, b) => {
        if (a.priority === 'high') return -1;
        if (b.priority === 'low') return 0;
        return -1;
      });
    case 'closed':
      return bugs.slice().sort((a, b) => {
        if (!a.closedAt) return 1;
        if (!b.closedAt) return -1;
        return +new Date(b.closedAt) - +new Date(a.closedAt);
      }).filter((bug) => {
        return bug.isResolved
      });
    case 'reopened':
      return bugs.slice().sort((a, b) => {
        if (!a.reopenedAt) return 1;
        if (!b.reopenedAt) return -1;
        return +new Date(b.reopenedAt) - +new Date(a.reopenedAt);
      }).filter((bug) => {
        return !bug.isResolved
      });
    default:
      return bugs.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }
};