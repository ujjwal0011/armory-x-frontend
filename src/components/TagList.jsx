import { Link } from "react-router-dom";

const TagsList = ({ tags = [] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Link
          key={index}
          to={`/dashboard/tag/${tag}`}
          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagsList;
