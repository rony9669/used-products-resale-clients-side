import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Mishu's Kitchen`;
  }, [title]);
};

export default useTitle;
