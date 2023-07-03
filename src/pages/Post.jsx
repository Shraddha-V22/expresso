import { useParams } from "react-router-dom";
import { getSinglePostService } from "../services/postServices";
import { useEffect } from "react";
import { useState } from "react";
import { useUsers } from "../contexts/UsersProvider";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserPost from "../components/UserPost";
import { getPostCommentsService } from "../services/commentsServices";
import Comment from "../components/Comment";
import { usePosts } from "../contexts/PostsProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useTheme } from "../contexts/ThemeProvider";

export default function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const {
    usersData: { users },
  } = useUsers();
  const {
    postsData: { posts },
  } = usePosts();

  // const user = users.find((user) => user.username === post?.username);

  const getUserPost = async (postId) => {
    try {
      const { data, status } = await getSinglePostService(postId);
      if (status === 200) {
        setPost(data.post);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPost(postId);
  }, [posts, postId]);

  return (
    <section className="flex flex-col gap-2">
      <UserPost userPost={post} isSinglePage />
      <Comments postId={postId} />
    </section>
  );
}

function Comments({ postId }) {
  const {
    postsData: { posts },
  } = usePosts();
  const { theme } = useTheme();
  const [comments, setComments] = useState([]);

  const getPostComments = async (postId) => {
    try {
      const { data, status } = await getPostCommentsService(postId);
      if (status === 200) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostComments(postId);
  }, [posts, postId]);

  return (
    <section
      className={`${
        theme === "dark" ? "bg-sanJuan" : "border"
      } rounded-md border-sanJuanLight`}
    >
      <h3
        className={`${
          theme === "dark" ? "" : "border-sanJuanLight"
        } border-b px-4 py-2`}
      >
        Comments
      </h3>
      {comments?.length > 0 ? (
        <section className="">
          {comments?.map((co) => (
            <Comment
              key={co._id}
              comment={co}
              postId={postId}
              setComments={setComments}
            />
          ))}
        </section>
      ) : (
        <p className="rounded-md p-1 pl-2 text-center text-sm">
          Be the first one to comment!
        </p>
      )}
    </section>
  );
}
