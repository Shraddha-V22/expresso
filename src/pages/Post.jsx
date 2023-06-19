import { useParams } from "react-router-dom";
import { getSinglePostService } from "../services/postServices";
import { useEffect } from "react";
import { useState } from "react";
import { useUsers } from "../contexts/UsersProvider";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UserPost from "../components/UserPost";

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
    </section>
  );
}
