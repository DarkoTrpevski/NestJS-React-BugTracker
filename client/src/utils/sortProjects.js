
export const sortProjects = (projects, sortBy) => {
  switch (sortBy) {
    case 'newest':
      return projects.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    case 'oldest':
      return projects.slice().sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

    case 'a-z':
      return projects.slice().sort((prevEl, nextEl) => prevEl.name.localeCompare(nextEl.name));

    case 'z-a':
      return projects.slice().sort((prevEl, nextEl) => nextEl.name.localeCompare(prevEl.name));
    default:
      return projects.slice().sort((prevEl, nextEl) => +new Date(nextEl.createdAt) - +new Date(prevEl.createdAt));
  }
};