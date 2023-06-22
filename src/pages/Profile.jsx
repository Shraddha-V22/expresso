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

export default function Profile() {
  const {
    userData: {
      user: { userDetails, token },
    },
    authDispatch,
  } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useParams();

  const isUserProfile = useMemo(
    () => userDetails._id === userId,
    [userDetails]
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
  }, [userId]);

  useEffect(() => {
    getAllUserPosts(userProfile?.username);
  }, [userProfile]);

  return (
    <section>
      <section>
        <section className="relative">
          <img src={userProfile?.profileBg} alt="" className="w-full" />
          <div className="absolute -bottom-[30px] left-4 h-[60px] w-[60px] cursor-pointer overflow-hidden rounded-full border-2 bg-green-200">
            <img
              src={userProfile?.profileImg}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </section>
        <section className="flex flex-col items-start gap-1 p-2">
          {isUserProfile ? (
            <button className="self-end border-[1px] p-1">edit profile</button>
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
              className={"self-end"}
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
              className={"self-end"}
            >
              Follow
            </Button>
          )}
          <p>
            {userProfile?.firstName} {userProfile?.lastName}
          </p>
          <h3>@{userProfile?.username}</h3>
          <p className="text-sm">{userProfile?.bio}</p>
          <p className="text-sm underline">{userProfile?.portfolio}</p>
          <div className="flex gap-4 text-sm">
            <p>{userProfile?.following?.length} Following</p>
            <p>{userProfile?.followers?.length} Followers</p>
          </div>
        </section>
      </section>
      <section className="flex flex-col gap-2">
        {userPosts?.map((post) => (
          <UserPost key={post._id} userPost={post} />
        ))}
      </section>
    </section>
  );
}
