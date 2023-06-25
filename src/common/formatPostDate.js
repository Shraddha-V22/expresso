export const formatPostDate = (date) => {
  let postDate = new Date(date);
  let now = new Date();
  let sec = Math.floor((now - postDate) / 1000);
  if (sec > 59) {
    const min = Math.floor(sec / 60);
    if (min > 59) {
      const hrs = Math.floor(min / 60);
      if (hrs > 23) {
        const days = Math.floor(min / 24);
        if (days > 7) {
          const weeks = Math.floor(days / 7);
          if (days > 30) {
            const months = Math.floor(days / 30);
            if (months > 11) {
              return postDate.toLocaleDateString("en-us", {
                day: "numeric",
                year: "numeric",
                month: "short",
              });
            } else {
              return `${months}mo ago`;
            }
          } else {
            return `${weeks}w ago`;
          }
        } else {
          return `${days}d ago`;
        }
      } else {
        return `${hrs}hrs ago`;
      }
    } else {
      return `${min}min ago`;
    }
  } else {
    return `few seconds ago`;
  }
};
