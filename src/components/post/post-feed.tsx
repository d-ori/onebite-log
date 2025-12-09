import PostItem from "./post-item";
import Fallback from "../fallback";
import Loader from "../loader";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data";

export default function PostFeed({ authorId }: { authorId?: string }) {
  const { data, error, isPending, isFetchingNextPage, fetchNextPage } =
    useInfinitePostsData(authorId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((postId) => <PostItem key={postId} postId={postId} />),
      )}
      {isFetchingNextPage && <Loader />}

      <div ref={ref}></div>
    </div>
  );
}
