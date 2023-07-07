import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import Button from "./Button";
import { editUserDataService } from "../services/userServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { AUTH } from "../common/reducerTypes";
import Modal from "./Modal";
import { avatarImgs } from "../common/avatarImgs";
import Avatar from "./Avatar";
import { uploadMedia } from "../common/uploadMedia";
import { toast } from "react-toastify";

export default function EditProfile({ setOpen: setEditProfieOpen }) {
  const {
    userData: {
      user: { userDetails, token },
    },
    authDispatch,
  } = useAuth();
  const [userInfo, setUserInfo] = useState({
    profileBg: userDetails?.profileBg || null,
    profileImg: userDetails?.profileImg || null,
    bio: userDetails?.bio || "",
    portfolio: userDetails?.portfolio || "",
  });
  const [open, setOpen] = useState(false);

  const getImage = (property) =>
    typeof userInfo[property] === "string"
      ? userInfo[property]
      : userInfo[property] === null
      ? null
      : URL.createObjectURL(userInfo[property]);

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
    const id = toast.loading("Updating profile...");
    if (
      typeof userData.profileBg === "object" ||
      typeof userData.profileImg === "object"
    ) {
      try {
        let newData = { ...userData };
        if (typeof userData.profileBg === "object") {
          const response = await uploadMedia(userData.profileBg);
          newData.profileBg = response.url;
        }
        if (typeof userData.profileImg === "object") {
          const response = await uploadMedia(userData.profileImg);
          newData.profileImg = response.url;
        }
        const { data, status } = await editUserDataService(newData, token);
        if (status === 201) {
          authDispatch({ type: AUTH.UPDATE_USER, payload: data.user });
          setEditProfieOpen(false);
          toast.update(id, {
            render: "Profile updated!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error(error);
        toast.update(id, {
          render: "Update profile request failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } else {
      try {
        const { data, status } = await editUserDataService(userData, token);
        if (status === 201) {
          authDispatch({ type: AUTH.UPDATE_USER, payload: data.user });
          setEditProfieOpen(false);
          toast.update(id, {
            render: "Profile updated!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error(error);
        toast.update(id, {
          render: "Update profile request failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <section className="w-[250px] rounded-md border border-mineShaftLight p-2">
      <div className="relative w-full">
        <div className="relative h-[70px] w-full rounded-md border-2">
          <img
            src={
              userInfo.profileBg
                ? getImage("profileBg")
                : userDetails?.profileBg
            }
            className="h-full w-full rounded-md object-cover"
            alt=""
          />

          <div
            onClick={(e) => {
              e.stopPropagation();
              imageUploadHandler("profileBg");
            }}
            className="absolute top-0 z-10 grid h-full w-full cursor-pointer place-items-center rounded-md bg-black/30 text-gray-300 duration-300 hover:text-gray-100"
          >
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </div>
        <div className="absolute -bottom-[20px] left-4 z-10 h-[60px] w-[60px] cursor-pointer overflow-hidden rounded-full border-2 bg-green-200">
          <img
            src={
              userInfo.profileImg
                ? getImage("profileImg")
                : userDetails?.profileImg
            }
            alt=""
            className="h-full w-full object-cover"
          />
          <Modal
            open={open}
            setOpen={setOpen}
            modalFor={
              <div className="absolute top-0 z-10 grid h-full w-full cursor-pointer place-items-center rounded-md bg-black/30 text-gray-300 duration-300 hover:text-gray-100">
                <FontAwesomeIcon icon={faCamera} />
              </div>
            }
          >
            <EditProfileImage
              setOpen={setOpen}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          </Modal>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2">
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
            className="rounded-md border border-mineShaftLight bg-inherit py-1 indent-2 text-sm outline-none placeholder:text-sm"
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
              setUserInfo((prev) => ({ ...prev, portfolio: e.target.value }))
            }
            className="rounded-md border border-mineShaftLight bg-inherit py-1 indent-2 text-sm outline-none placeholder:text-sm"
          />
        </div>
        <div className="flex w-full gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              editProfileHandler(userInfo, token);
            }}
            className="w-full py-1 text-xs uppercase"
          >
            save
          </Button>
          <Button className="w-full py-1 text-xs uppercase">cancel</Button>
        </div>
      </div>
    </section>
  );
}

export function EditProfileImage({ userInfo, setUserInfo, setOpen }) {
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();

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

  return (
    <div className="flex flex-col gap-4 rounded-md border p-2">
      <div className="h-[70px] w-[70px] cursor-pointer self-center overflow-hidden rounded-full border-2 bg-green-200">
        <img
          src={userInfo?.profileImg ? userImg : userDetails?.profileImg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <section>
        <p className="mb-2 text-center text-xs text-gray-400">
          Choose from given avatars
        </p>
        <section className="grid grid-cols-4 gap-1">
          {avatarImgs?.map((el) => (
            <div
              key={el.name}
              onClick={(e) => {
                e.stopPropagation();
                setUserInfo((prev) => ({ ...prev, profileImg: el.url }));
              }}
            >
              <Avatar className={"h-[60px] w-[60px]"} profileUrl={el.url} />
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
            className="py-1 text-xs uppercase"
          >
            upload from gallery
          </Button>
        </div>
        <Button
          onClick={() => setOpen(false)}
          className="py-1 text-xs uppercase"
        >
          save
        </Button>
      </div>
    </div>
  );
}
