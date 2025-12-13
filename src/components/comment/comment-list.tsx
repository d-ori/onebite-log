import { useCommentData } from "@/hooks/queries/use-comments-data";
import CommentItem from "./comment-item";
import Fallback from "../fallback";
import Loader from "../loader";
import type { Comment, NestedComment } from "@/types";

function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    if (!comment.parent_comment_id) {
      result.push({ ...comment, children: [] });
    } else {
      const parentCommentIndex = result.findIndex(
        (item) => item.id === comment.parent_comment_id,
      );

      result[parentCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment: result[parentCommentIndex],
      });
    }
  });
  return result;
}

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentsPending) return <Loader />;

  const nestedComments = toNestedComments(comments);

  return (
    <div className="flex flex-col gap-5">
      {nestedComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
