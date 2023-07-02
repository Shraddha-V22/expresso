import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  followUserService,
  getSingleUserService,
  unfollowUserService,
} from "../services/userServices";
import { useAuth } from "../contexts/AuthProvider";
import { useMemo } from "react";
import { getUserPostsService } from "../services/postServices";
import UserPost from "../components/UserPost";
import { AUTH } from "../common/reducerTypes";
import Button from "../components/Button";
import Modal from "../components/Modal";
import EditProfile from "../components/EditProfile";
import { usePosts } from "../contexts/PostsProvider";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  const {
    userData: {
      user: { userDetails, token },
    },
    authDispatch,
  } = useAuth();
  const {
    postsData: { posts },
  } = usePosts();
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [open, setOpen] = useState(false);

  const { userId } = useParams();

  const isUserProfile = useMemo(
    () => userDetails._id === userId,
    [userDetails, userId]
  );

  const getUserProfile = async (id) => {
    try {
      const { data, status } = await getSingleUserService(id);
      if (status === 200) {
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUserPosts = async (username) => {
    try {
      const { data, status } = await getUserPostsService(username);
      if (status === 200) {
        setUserPosts(data.posts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const followUnfollowHandler = async (serviceFn, id, token) => {
    try {
      const { data, status } = await serviceFn(id, token);
      if (status === 200) {
        console.log(data);
        authDispatch({ type: AUTH.USER_FOLLOW, payload: data.user });
        setUserProfile(data.followUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile(userId);
  }, [userId, userDetails]);

  useEffect(() => {
    getAllUserPosts(userProfile?.username);
  }, [userProfile, posts]);

  return (
    <section className="py-2">
      <section>
        <section className="relative">
          <img
            src={userProfile?.profileBg}
            alt=""
            className="h-[150px] w-full rounded-md object-cover"
          />
          <div className="absolute -bottom-[30px] left-4 h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-full border-2 bg-green-200">
            <img
              src={userProfile?.profileImg}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </section>
        <section className="flex flex-col items-start gap-1 p-2">
          {isUserProfile ? (
            <Modal
              className="self-end rounded-full border border-sanJuanLight px-2 py-1"
              open={open}
              setOpen={setOpen}
              modalFor={"Edit Profile"}
            >
              {<EditProfile />}
            </Modal>
          ) : userDetails?.following?.find(
              ({ _id }) => _id === userProfile?._id
            ) ? (
            <Button
              onClick={() =>
                followUnfollowHandler(
                  unfollowUserService,
                  userProfile?._id,
                  token
                )
              }
              className={
                "self-end rounded-full border border-sanJuanLight px-2 py-1"
              }
            >
              Following
            </Button>
          ) : (
            <Button
              onClick={() =>
                followUnfollowHandler(
                  followUserService,
                  userProfile?._id,
                  token
                )
              }
              className={
                "self-end rounded-full border border-sanJuanLight px-2 py-1"
              }
            >
              Follow
            </Button>
          )}
          <div>
            <p>
              {userProfile?.firstName} {userProfile?.lastName}
            </p>
            <h3 className="text-sm">@{userProfile?.username}</h3>
          </div>
          <p className="text-xs">{userProfile?.bio}</p>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faLink} className="text-xs" />
            <p className="text-xs underline">{userProfile?.portfolio}</p>
          </div>
          <div className="flex gap-4 text-sm">
            <p>{userProfile?.following?.length} Following</p>
            <p>{userProfile?.followers?.length} Followers</p>
          </div>
        </section>
      </section>
      <section className="flex flex-col gap-2 border-t border-sanJuanLight pt-2">
        {userPosts?.length ? (
          userPosts?.map((post) => <UserPost key={post._id} userPost={post} />)
        ) : (
          <h4 className="mt-4 w-full text-center">No Posts.</h4>
        )}
      </section>
    </section>
  );
}
