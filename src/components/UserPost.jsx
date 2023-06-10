import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../contexts/UsersProvider";

export default function UserPost({ userPost }) {
  const navigate = useNavigate();
  const { users } = useUsers();
  const { content, username, likes, createdAt } = userPost;
  const [readMore, setReadMore] = useState(false);

  const user = users.find((user) => user.username === username);

  // console.log({ users });

  return (
    <section className="m-2 grid grid-cols-[auto_1fr] gap-2 border-2 p-2">
      <div
        onClick={() => navigate(`/${user?._id}`)}
        className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-[1px]"
      >
        <img
          src={user?.profileImg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p>@{username}</p>
          <p className="text-xs">{createdAt}</p>
        </div>
        <div>
          <p className={`${readMore ? "" : "line-clamp-3"} text-sm`}>
            {content}
          </p>
          <button
            onClick={() => setReadMore((prev) => !prev)}
            className="text-sm text-blue-500 underline"
          >
            {readMore ? "read less" : "read more"}
          </button>
        </div>
        <div className="flex justify-between text-sm">
          <p>likes {likes?.likeCount}</p>
          <p>comments 0</p>
        </div>
        <div className="flex w-full justify-evenly gap-2">
          <button className="w-full border-[1px]">Like</button>
          <button className="w-full border-[1px]">Comment</button>
          <button className="w-full border-[1px]">Bookmark</button>
        </div>
      </div>
    </section>
  );
}

// {
//   _id: uuid(),
//   content:
//     "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
//   likes: {
//     likeCount: 0,
//     likedBy: [],
//     dislikedBy: [],
//   },
//   username: "shubhamsoni",
//   createdAt: formatDate(),
//   updatedAt: formatDate(),
// },
