import "../styles/home.css";




export default function SearchBar({ value, onChange, onSearch }) {

  
  return (
    <div className="hero-search">
      <input
        type="text"
        placeholder="Search for prompts, models, or inspiration..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button onClick={onSearch}>
        Search
      </button>
    </div>
  );
}


