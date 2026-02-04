const tabs = ["instagram", "youtube", "tiktok"];

export default function CategoryTabs({ active, setActive }) {
  return (
    <div className="tabs">
      {tabs.map(t => (
        <button
          key={t}
          className={active === t ? "active" : ""}
          onClick={() => setActive(t)}
        >
          {t.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
