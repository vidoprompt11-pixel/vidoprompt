import { SUB_CATEGORIES } from "../constants/subCategories";
import "../styles/category.css";

export default function SubCategoryBar({ platform, active, setActive }) {
  // 🛑 SAFETY GUARD (VERY IMPORTANT)
  if (!platform || !SUB_CATEGORIES[platform]) {
    return null;
  }

  return (
    <div className="subcats container">
      {SUB_CATEGORIES[platform].map((item) => (
        <span
          key={item}
          className={active === item ? "active" : ""}
          onClick={() => setActive(item)}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
