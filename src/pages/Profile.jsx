import { useEffect, useState, useMemo } from "react";
import {
  useParams,
  NavLink,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import {
  followUserService,
  getSingleUserService,
  unfollowUserService,
} from "../services/userServices";
import { useAuth } from "../contexts/AuthProvider";
import { getUserPostsService } from "../services/postServices";
import UserPost from "../components/UserPost";
import { AUTH } from "../common/reducerTypes";
import Button from "../components/Button";
import Modal from "../components/Modal";
import EditProfile from "../components/EditProfile";
import { usePosts } from "../contexts/PostsProvider";
import { faLink, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../contexts/ThemeProvider";
import Avatar from "../components/Avatar";

export function UserProfile() {
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [userProfile, setUserProfile] = useState({});
  const { userId } = useParams();

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

  useEffect(() => {
    getUserProfile(userId);
  }, [userId, userDetails]);

  return (
    <section>
      <header>
        {location?.pathname === `/${userProfile?._id}` ? (
          <div className="flex items-center gap-4 border-b p-2">
            <button
              className={`h-6 w-6 ${
                theme === "dark" ? "hover:bg-sanJuan" : "hover:bg-gray-100"
              } rounded-full`}
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div>
              <h3 className="text-lg font-semibold capitalize">
                {userProfile?.firstName} {userProfile?.lastName}
              </h3>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4 p-2">
              <button
                className={`h-6 w-6 ${
                  theme === "dark" ? "hover:bg-sanJuan" : "hover:bg-gray-100"
                } rounded-full`}
                onClick={() => navigate(`/${userProfile?._id}`)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold capitalize">
                  {userProfile?.firstName} {userProfile?.lastName}
                </h3>
                <p className="text-xs">{userProfile?.username}</p>
              </div>
            </div>
            <div className="flex justify-evenly border-b p-2 pb-0">
              <NavLink
                style={({ isActive }) => ({
                  borderBottom: isActive ? "2px solid" : "",
                })}
                className="w-full text-center"
                to={`/${userProfile?._id}/followers`}
              >
                Followers
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  borderBottom: isActive ? "2px solid" : "",
                })}
                className="w-full text-center"
                to={`/${userProfile?._id}/following`}
              >
                Following
              </NavLink>
            </div>
          </div>
        )}
      </header>
      <Outlet />
    </section>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const {
    userData: {
      user: { userDetails, token },
    },
    authDispatch,
  } = useAuth();
  const {
    postsData: { posts },
  } = usePosts();
  const { theme } = useTheme();
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

  console.log(userProfile);

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
          <div
            className={`absolute -bottom-[30px] left-4 h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-full border-2`}
          >
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
              {<EditProfile setOpen={setOpen} />}
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
          {userProfile?.bio && <p className="text-xs">{userProfile?.bio}</p>}
          {userProfile?.portfolio && (
            <a
              href={userProfile?.portfolio}
              target="_blank"
              className="flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faLink} className="text-xs" />
              <p className="text-xs hover:underline">
                {userProfile?.portfolio}
              </p>
            </a>
          )}
          <div className="flex gap-4 text-sm">
            <p
              className="cursor-pointer"
              onClick={() => navigate(`/${userProfile?._id}/following`)}
            >
              {userProfile?.following?.length}{" "}
              <span className="hover:underline">Following</span>
            </p>
            <p
              className="cursor-pointer"
              onClick={() => navigate(`/${userProfile?._id}/followers`)}
            >
              {userProfile?.followers?.length}{" "}
              <span className="hover:underline">Followers</span>
            </p>
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

export function UserFollowing() {
  const {
    userData: {
      user: { userDetails, token },
    },
  } = useAuth();
  const { followUnfollowHandler } = usePosts();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const { userId } = useParams();

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

  useEffect(() => {
    getUserProfile(userId);
  }, [userId, userDetails]);

  return (
    <section className="flex flex-col gap-2">
      {userProfile?.following?.map((us) => (
        <section
          onClick={() => navigate(`/${us?._id}`)}
          className="grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-2 border-b border-sanJuanLighter p-2 last:border-b-0"
        >
          <div className="flex items-center gap-2">
            <Avatar onClick={() => {}} profileUrl={us?.profileImg} />
            <div className="leading-5">
              <p className="line-clamp-1 text-sm">
                {us?.firstName} {us?.lastName}
              </p>
              <p className="line-clamp-1 text-xs">@{us?.username}</p>
              <small>{us?.bio}</small>
            </div>
          </div>
          {userDetails?.following?.find(({ _id }) => _id === us?._id) ? (
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
        </section>
      ))}
    </section>
  );
}

export function UserFollowers() {
  const {
    userData: {
      user: { userDetails, token },
    },
  } = useAuth();
  const { followUnfollowHandler } = usePosts();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const { userId } = useParams();

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

  useEffect(() => {
    getUserProfile(userId);
  }, [userId, userDetails]);

  return (
    <section className="flex flex-col gap-2">
      {userProfile?.followers?.map((us) => (
        <section
          onClick={() => navigate(`/${us?._id}`)}
          className="grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-2 border-b border-sanJuanLighter p-2 last:border-b-0"
        >
          <div className="flex items-center gap-2">
            <Avatar onClick={() => {}} profileUrl={us?.profileImg} />
            <div className="leading-5">
              <p className="line-clamp-1 text-sm">
                {us?.firstName} {us?.lastName}
              </p>
              <p className="line-clamp-1 text-xs">@{us?.username}</p>
              <small>{us?.bio}</small>
            </div>
          </div>
          {userDetails?.followers?.find(({ _id }) => _id === us?._id) ? (
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
        </section>
      ))}
    </section>
  );
}
