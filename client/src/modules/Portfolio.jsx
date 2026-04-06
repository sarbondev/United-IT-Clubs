import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";

const ProjectSkeleton = () => (
  <div className="rounded-2xl overflow-hidden break-inside-avoid mb-4">
    <div className="skeleton h-60 rounded-none" />
    <div className="bg-white p-5 border border-t-0 border-gray-100 rounded-b-2xl">
      <div className="skeleton h-5 w-3/4 mb-2" />
      <div className="skeleton h-4 w-full mb-2" />
      <div className="skeleton h-4 w-1/3" />
    </div>
  </div>
);

const categories = [
  { key: "", label: "Barcha loyihalar" },
  { key: "web", label: "Vebsayt" },
  { key: "design", label: "Brending" },
  { key: "modeling", label: "3D modeling" },
];

export const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: projects, error, isLoading } = useSWR("/projects", fetcher);

  const filteredProjects =
    projects?.projects?.filter(
      (p) => !selectedCategory || p.category === selectedCategory
    ) || [];

  return (
    <section className="py-20 px-4 bg-white" id="our-projects">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#5d75a5] mb-4">
            Biz qilgan loyihalar
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 border ${
                selectedCategory === cat.key
                  ? "bg-[#5d75a5] text-white border-[#5d75a5]"
                  : "bg-white text-[#5d75a5] border-[#55b8ff]/30 hover:border-[#55b8ff]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && filteredProjects.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredProjects.map((item) => (
              <Link
                key={item._id}
                to={`/${item._id}`}
                className="group block relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 break-inside-avoid mb-4"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.images?.[0] || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-auto min-h-[200px] max-h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-[#55b8ff] transition-colors duration-300 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-200 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                      {item.category === "web"
                        ? "Vebsayt"
                        : item.category === "design"
                        ? "Brending"
                        : item.category === "modeling"
                        ? "3D modeling"
                        : "Umumiy"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#5d75a5]/60 text-lg">
              Hozircha loyihalar mavjud emas
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
