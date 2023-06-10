import { useEffect } from "react";
import { getAllUsersService } from "../services/userServices";
import { useState } from "react";

export default function Search() {
  return (
    <section>
      <input type="text" placeholder="search user" />
      {/* {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))} */}
    </section>
  );
}

// function UserCard({ user }) {
//   return (
//     <section>
//       <img
//         src={user?.profileImg}
//         alt=""
//         className="h-[100px] w-[100px] object-cover"
//       />
//       <section className="flex flex-col items-start gap-1 p-4">
//         <button className="self-end border-[1px] p-1">edit profile</button>
//         <h3>@{user?.username}</h3>
//         <p>{user?.bio}</p>
//         <p>{user?.portfolio}</p>
//         <div className="flex gap-4 text-sm">
//           <p>0 Following</p>
//           <p>0 Followers</p>
//         </div>
//       </section>
//     </section>
//   );
// }
