import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { avatarImgs } from "../common/avatarImgs";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import FollowSuggestions from "../components/FollowSuggestions";
import { toast } from "react-toastify";
import { editUserDataService } from "../services/userServices";
import { uploadMedia } from "../common/uploadMedia";
import { AUTH } from "../common/reducerTypes";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeProvider";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    userData: {
      user: { userDetails, token },
    },
    authDispatch,
  } = useAuth();
  const [userInfo, setUserInfo] = useState({
    profileBg: "https://i.redd.it/gocxo6n16m871.png",
    profileImg:
      "	https://tse2.mm.bing.net/th?id=OIP.r-l3mhddNzm7351sOrTNjgHaHa&pid=Api&P=0&h=180" ||
      null,
    bio: userDetails?.bio || "",
    portfolio: userDetails?.portfolio || "",
  });
  const [index, setIndex] = useState(0);

  const userImg =
    typeof userInfo?.profileImg === "string"
      ? userInfo?.profileImg
      : userInfo?.profileImg === null
      ? null
      : URL.createObjectURL(userInfo?.profileImg);

  const imageUploadHandler = (property) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file.type.split("/")[0] === "image" && file.size > 1024000) {
        toast.error("The image size should not be more than 1mb.");
        return;
      }
      setUserInfo((prev) => ({ ...prev, [property]: file }));
    };
    input.click();
  };

  const editProfileHandler = async (userData, token) => {
    if (typeof userData.profileImg === "object") {
      try {
        const response = await uploadMedia(userData.profileImg);
        const { data, status } = await editUserDataService(
          { ...userData, profileImg: response.url },
          token
        );
        if (status === 201) {
          authDispatch({ type: AUTH.UPDATE_USER, payload: data.user });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data, status } = await editUserDataService(userData, token);
        if (status === 201) {
          authDispatch({ type: AUTH.UPDATE_USER, payload: data.user });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section
      className={`${
        theme === "dark" ? "bg-mineShaftDark text-white" : ""
      } grid h-[100vh] w-full place-items-center`}
    >
      <div className={`flex flex-col gap-4`}>
        <p className="text-center text-sm">
          {index === 2
            ? "Here are some people you can follow to get started"
            : "Let's take a few seconds to setup your profile"}
        </p>
        {index === 0 && (
          <div
            className={`${
              theme === "dark" ? "bg-mineShaft" : "border"
            } flex flex-col gap-4 rounded-md p-4`}
          >
            <div className="h-[70px] w-[70px] cursor-pointer self-center overflow-hidden rounded-full border-2 bg-green-200">
              <img
                src={userInfo?.profileImg ? userImg : userDetails?.profileImg}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <section>
              <p className="mb-2 text-center text-xs text-gray-400">
                Choose from the given avatars
              </p>
              <section className="grid grid-cols-4 gap-2">
                {avatarImgs?.map((el) => (
                  <div
                    key={el.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserInfo((prev) => ({ ...prev, profileImg: el.url }));
                    }}
                  >
                    <Avatar
                      className={"h-[60px] w-[60px]"}
                      profileUrl={el.url}
                    />
                    <p className="text-center text-xs capitalize">{el.name}</p>
                  </div>
                ))}
              </section>
            </section>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="mb-2 text-center text-xs text-gray-400">Or</p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    imageUploadHandler("profileImg");
                  }}
                  className={`${
                    theme === "dark" ? "bg-mineShaftLight" : ""
                  } py-1 text-xs uppercase`}
                >
                  upload from gallery
                </Button>
              </div>
              <Button
                onClick={() =>
                  userInfo.profileImg !== null
                    ? setIndex((prev) => prev + 1)
                    : toast.error(
                        "Please select an avatar/upload from gallery."
                      )
                }
                className={`${
                  theme === "dark" ? "bg-mineShaftLight" : ""
                } w-full py-1 text-xs uppercase`}
              >
                next
              </Button>
            </div>
          </div>
        )}
        {index === 1 && (
          <div
            className={`${
              theme === "dark" ? "bg-mineShaft" : "border"
            } flex flex-col gap-4 rounded-md p-4`}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="bio" className="ml-1 text-xs capitalize">
                bio
              </label>
              <input
                type="text"
                id="bio"
                placeholder="Write your bio here?"
                value={userInfo.bio}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, bio: e.target.value }))
                }
                autoComplete="off"
                className="rounded-md border py-1 indent-2 text-sm outline-none placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="website-link" className="ml-1 text-xs capitalize">
                website link
              </label>
              <input
                type="text"
                id="website-link"
                placeholder="Website link"
                value={userInfo.portfolio}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    portfolio: e.target.value,
                  }))
                }
                autoComplete="off"
                className="rounded-md border py-1 indent-2 text-sm outline-none placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  editProfileHandler(userInfo, token);
                  setIndex((prev) => prev + 1);
                }}
                className={`${
                  theme === "dark" ? "bg-mineShaftLight" : ""
                } w-full py-1 text-xs uppercase`}
              >
                save
              </Button>
              <Button
                onClick={() => setIndex((prev) => prev - 1)}
                className={`${
                  theme === "dark" ? "bg-mineShaftLight" : ""
                } w-full py-1 text-xs uppercase`}
              >
                go back
              </Button>
            </div>
          </div>
        )}
        {index === 2 && (
          <div
            className={`${
              theme === "dark" ? "bg-mineShaft" : "border"
            } flex flex-col items-center gap-4 rounded-md p-4`}
          >
            <FollowSuggestions isSuggestion />
            <Button
              onClick={() => navigate("/")}
              className={`${
                theme === "dark" ? "bg-mineShaftLight" : ""
              } w-full py-1 text-xs uppercase`}
            >
              {userDetails?.following?.length > 0 ? "Next" : "Skip"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
