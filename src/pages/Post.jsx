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

export default function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const {
    usersData: { users },
  } = useUsers();

  const user = users.find((user) => user.username === post?.username);

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
  }, []);

  return (
    <section>
      <UserPost userPost={post} />
      <Comments postId={postId} />
    </section>
  );
}

function Comments({ postId }) {
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
  }, []);

  return (
    <section className="ml-[50px]">
      {comments?.length > 0 ? (
        comments?.map((co) => (
          <Comment
            key={co._id}
            comment={co}
            postId={postId}
            setComments={setComments}
          />
        ))
      ) : (
        <p>Be the first one to comment!</p>
      )}
    </section>
  );
}
