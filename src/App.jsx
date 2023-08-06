import axios from "axios";
import "./App.css";
import { useState } from "react";
function App() {
  const [animes, setAnimes] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    const animeName = e.target.animeName.value;
    const url = `https://api.jikan.moe/v4/anime?q=${animeName}`;
    axios
      .get(url)
      .then(({ data }) => setAnimes(data.data))
      .catch((err) => console.log(err));
  };
  return (
    <main className="bg-black min-h-screen text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-red-500">
        Anime search
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex rounded-md overflow-hidden max-w-max mx-auto"
      >
        <input
          id="animeName"
          placeholder="Type your anime..."
          className="text-black p-2"
          type="text"
        />
        <button className="bg-red-500 px-4">Search</button>
      </form>
      <section className="grid gap-4 grid-cols-[repeat(auto-fill,_180px)] justify-center max-w-[1200px] mx-auto mt-4">
        {
          animes.map((anime) => (
            <article key={anime.mal_id} className="bg-white text-black rounded-md overflow-hidden">
              <div className="h-[240px] overflow-hidden">
                <img className="h-full w-full block object-cover" src={anime.images.webp.large_image_url} alt="" />
              </div>
              <section className="p-2">
                <h4 className="text-sm my-2 font-bold line-clamp-1">{anime.title}</h4>
                <p className="line-clamp-4 text-xs">{anime.synopsis}</p>
              </section>
            </article>
          ))
        }
      </section>
    </main>
  );
}
export default App;