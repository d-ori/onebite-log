import { useCommentData } from "@/hooks/queries/use-comments-data";
import CommentItem from "./comment-item";
import Fallback from "../fallback";
import Loader from "../loader";

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentsPending) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
