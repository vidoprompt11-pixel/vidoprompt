import { SUB_CATEGORIES } from "../constants/subCategories";

export default function SubCategoryBar({ platform, active, setActive }) {
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
