import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "my mother cried the day I was born because she knew she would never be better than me.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "TheGinaLinetti",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Just ate a bag of glitter so my insides can shine just as bright as my outside😎",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        content: "No amount of glitter can shine as bright as you jake",
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "trueblueboyle",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      {
        _id: uuid(),
        content: "Pack your stuff. We're going to the hospital A.S.A.P",
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "sergeantamy",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      {
        _id: uuid(),
        content: "Thanks babe, good idea. I think I'm dying",
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "itsyaboijakey",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
    ],
    username: "itsyaboijakey",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "If I die, turn my tweets into a book.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "TheGinaLinetti",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Life is a party and I'm a pinata.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "trueblueboyle",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "I told amy I like her, she told me she was deeply in love with me, and it's all in the past.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        content: "I did not say LOVE or DEEPLY.",
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "sergeantamy",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      {
        _id: uuid(),
        content: "It's in the past, amy. MOVE ON!",
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "itsyaboijakey",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
    ],
    username: "itsyaboijakey",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "I'm scared of businessmen. A whole army of gray-suited Brads and Chads trying to suck my soul and redeem it for frequent flyer miles",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "TheGinaLinetti",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Anime : Spirited Away",
    mediaUrl:
      "https://res.cloudinary.com/de7oltfip/video/upload/v1688908384/FzpLmIaWYAA_X0p_hjh3hf.mp4",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "shraddha__22",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "I'm playing Kwazy Cupcakes, I'm hydrated as hell, and I'm listening to Sheryl Crow. Ive got my own party going on.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "TerryLovesYogurt",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Pizzaz is who I'm. Would you tell the sky to stop being so blue?",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        content: "Yes, I wish it were tan.",
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "CaptainHolt99",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      {
        _id: uuid(),
        content: "What?",
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "TheGinaLinetti",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      {
        _id: uuid(),
        content: "It's my favorite color. It's no nonsense.",
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "CaptainHolt99",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
    ],
    username: "TheGinaLinetti",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Everything is garbage. Never love anything.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "CaptainHolt99",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "I was thinking how I would make the perfect American president based upon my skill set, dance ability, and bloodlust.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "TheGinaLinetti",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Just give up. It's the Boyle way. It's why our family crest is a white flag.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "trueblueboyle",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Anime : The Secret World of Arrietty",
    mediaUrl:
      "https://res.cloudinary.com/de7oltfip/video/upload/v1688908635/FzftzvtWIAAb4Jj_qyo9mr.mp4",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "shraddha__22",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Love. It sustains you. It's like oatmeal.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "CaptainHolt99",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Anyone over the age of six celebrating a birthday should go to hell.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "ToughRosa",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "We are thinking about something very IMPORTANT here.",
    mediaUrl:
      "https://res.cloudinary.com/de7oltfip/image/upload/v1688909205/a69ff35367de07d3ff04b42f8231c854_ys4exe.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "sergeantamy",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "We arrested a woman today because we are feminists.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "itsyaboijakey",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Anime : Kiki’s Delivery Service",
    mediaUrl:
      "https://res.cloudinary.com/de7oltfip/video/upload/v1688908888/Fyl-suJWIAAToYH_z8pbpk.mp4",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "shraddha__22",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
