export const filterBugs = (filterBy, bug) => {
  switch (filterBy) {
    case 'all':
      return true;
    case 'closed':
      return bug.isResolved === true;
    case 'open':
      return bug.isResolved === false;
    default:
      return true;
  }
};