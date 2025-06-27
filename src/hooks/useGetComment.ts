import { useEffect, useState } from "react";
import { uesCurrentIndexContext } from "../stores/global/CurrentIndex";
import { sleep } from "../utils/appHelper";

export default function useGetComment() {
  const { isOpenComment } = uesCurrentIndexContext();

  const [isFetching, setIsFetching] = useState(true);

  const [comments, setComments] = useState<UserComment[]>([]);

  const handleGetComment = async () => {
    setIsFetching(true);
    await sleep(500);
    setIsFetching(false);
  };

  useEffect(() => {
    if (!isOpenComment) return;

    handleGetComment();

    return () => {
      if (isOpenComment) {
        setComments([]);
      }
    };
  }, [isOpenComment]);

  return {
    comments,
    setComments,
    isFetching,
  };
}
