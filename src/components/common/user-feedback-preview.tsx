import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // Import toast from sonner
import { FEEDBACK_ENDPOINTS } from "@/lib/endpoints";

interface Review {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
}

const UserFeedbackPreview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.post(`${FEEDBACK_ENDPOINTS.GET_FEEDBACK}`);
        setReviews(response.data.data); 
      } catch (error) {
        toast.error("Failed to fetch feedbacks. Please try again later.");
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div className="text-center mt-32">Loading...</div>;
  }

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