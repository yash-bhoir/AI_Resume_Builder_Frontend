import { Quote } from "lucide-react";

interface Review {
  id: number;
  author: string;
  avatar: string;
  role: string;
  content: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Aarav Sharma",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
    role: "Software Engineer",
    content:
      "Absolutely amazing experience! The attention to detail and customer service was outstanding. I couldn't be happier with the results.",
  },
  {
    id: 2,
    author: "Priya Iyer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "Marketing Specialist",
    content:
      "Great service overall. The team was professional and responsive throughout the entire process. Would definitely recommend to others looking for quality work.",
  },
  {
    id: 3,
    author: "Rohan Mehta",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    role: "Entrepreneur",
    content:
      "Exceeded all expectations! The final result was even better than I imagined. The team went above and beyond to ensure everything was perfect.",
  },
  {
    id: 4,
    author: "Neha Kapoor",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    role: "Graphic Designer",
    content:
      "Outstanding service from start to finish. The team was incredibly knowledgeable and helped guide me through every step of the process.",
  },
  {
    id: 5,
    author: "Vikram Singh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    role: "Project Manager",
    content:
      "Very satisfied with the results. The team was efficient and professional.",
  },
  {
    id: 6,
    author: "Ananya Reddy",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150",
    role: "Content Writer",
    content:
      "Incredible attention to detail and fantastic communication throughout the project. The team really listened to my needs and delivered exactly what I was looking for.",
  },
  {
    id: 7,
    author: "Kabir Das",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    role: "UI/UX Designer",
    content: "The best service I've experienced in years. Highly recommend!",
  },
  {
    id: 8,
    author: "Meera Nair",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    role: "Business Analyst",
    content:
      "Really impressed with the level of expertise and dedication shown by the team. They made what could have been a complex process smooth and straightforward.",
  },
  {
    id: 9,
    author: "Rajesh Verma",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    role: "Consultant",
    content:
      "Exceptional service and results! The team was creative, professional, and delivered beyond my expectations. Would absolutely work with them again.",
  },
];

const UserFeedbackPreview = () => {
  return (
    <div className="flex flex-col items-center mt-32">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center dark:text-white">
        What are our users saying?
      </h1>

      <div className="columns-3 gap-6 space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`break-inside-avoid rounded-xl p-6 shadow-sm hover:shadow-md border hover:bg-secondary dark:hover:bg-primary-foreground transition-all ease-in duration-150`}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover grayscale"
              />
              <div>
                <h3 className="font-semibold text-lg leading-3 text-gray-900 dark:text-white">
                  {review.author}
                </h3>
                <span className="text-xs text-neutral-800 dark:text-neutral-500 font-semibold">
                  {review.role}
                </span>
              </div>
            </div>

            <div className="w-full flex items-start relative">
              <Quote
                className="size-24 dark:text-neutral-800 text-neutral-300 absolute right-0 -top-20"
              />
              <p className="text-neutral-700 dark:text-neutral-400 mb-4 relative z-10">
                {review.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFeedbackPreview;
