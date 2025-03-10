import { truncateText } from "@/lib/utils";
import { FaRegFileLines } from "react-icons/fa6";

interface GenerateHistoryCardProps {
  title: string;
  date: string;
}

const GenerateHistoryCard = ({ title, date }: GenerateHistoryCardProps) => {
  return (
    <div className="w-[250px] h-[290px] group">
      <div className="w-full h-full border rounded-md group-hover:shadow-lg transition-all ease-in duration-150 group-hover:border-neutral-600 dark:group-hover:border-neutral-400">
        <div className="flex items-center justify-center w-full h-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-t-md">
          <FaRegFileLines className="size-20 text-neutral-400 group-hover:text-indigo-500 transition-all ease-in duration-150" />
        </div>
        <div className="p-3 flex flex-col items-start justify-center w-full h-[30%]">
          <h1 className="text-md font-semibold">{truncateText(title,25)}</h1>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GenerateHistoryCard;
