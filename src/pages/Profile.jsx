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
import { AUTH, USERS } from "../common/reducerTypes";
import { useUsers } from "../contexts/UsersProvider";

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

  const followUserProfile = async (id, token) => {
    try {
      const { data, status } = await followUserService(id, token);
      if (status === 200) {
        authDispatch({ type: AUTH.USER_FOLLOW, payload: data.user });
        setUserProfile(data.followUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unfollowUserProfile = async (id, token) => {
    try {
      const { data, status } = await unfollowUserService(id, token);
      if (status === 200) {
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
          <img
            src="https://i.redd.it/gocxo6n16m871.png"
            alt=""
            className="w-full"
          />
          <div className="absolute -bottom-[30px] left-4 h-[60px] w-[60px] cursor-pointer overflow-hidden rounded-full border-2 bg-green-200">
            <img
              src={userProfile?.profileImg}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </section>
        <section className="flex flex-col items-start gap-1 p-4">
          {isUserProfile ? (
            <button className="self-end border-[1px] p-1">edit profile</button>
          ) : userDetails?.following?.find(
              ({ _id }) => _id === userProfile?._id
            ) ? (
            <button
              onClick={() => unfollowUserProfile(userProfile?._id, token)}
              className="self-end border-[1px] p-1"
            >
              Following
            </button>
          ) : (
            <button
              onClick={() => followUserProfile(userProfile?._id, token)}
              className="self-end border-[1px] p-1"
            >
              Follow
            </button>
          )}
          <h3>@{userProfile?.username}</h3>
          <p>{userProfile?.bio}</p>
          <p>{userProfile?.portfolio}</p>
          <div className="flex gap-4 text-sm">
            <p>{userProfile?.following?.length} Following</p>
            <p>{userProfile?.followers?.length} Followers</p>
          </div>
        </section>
      </section>
      <section>
        {userPosts?.map((post) => (
          <UserPost key={post._id} userPost={post} />
        ))}
      </section>
    </section>
  );
}
