import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";

const DetailSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton-dark h-8 w-24 mb-8 rounded-full" />
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="skeleton-dark h-8 w-32 rounded-full" />
          <div className="skeleton-dark h-12 w-full" />
          <div className="skeleton-dark h-12 w-3/4" />
          <div className="skeleton-dark h-5 w-full" />
          <div className="skeleton-dark h-5 w-5/6" />
          <div className="skeleton-dark h-5 w-4/6" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="skeleton-dark h-24 rounded-2xl" />
            <div className="skeleton-dark h-24 rounded-2xl" />
          </div>
        </div>
        <div className="skeleton-dark aspect-video rounded-2xl" />
      </div>
    </div>
  </div>
);

export const ProjectDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const { data: project, error, isLoading } = useSWR(`/projects/${id}`, fetcher);

  if (isLoading) return <DetailSkeleton />;

  if (error || !project || project.message) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 max-w-md">
            <div className="text-7xl font-bold bg-gradient-to-r from-[#55b8ff] to-white bg-clip-text text-transparent mb-4">
              404
            </div>
            <h1 className="text-white text-xl mb-3">Loyiha topilmadi</h1>
            <p className="text-white/60 mb-6 text-sm">
              Siz qidirayotgan loyiha mavjud emas
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] text-white px-6 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-[#55b8ff] transition-colors duration-300 bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10 hover:border-[#55b8ff]/30 text-sm mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Orqaga
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] text-white px-5 py-1.5 rounded-full text-sm font-medium">
                {project.category === "web"
                  ? "Vebsayt"
                  : project.category === "design"
                  ? "Brending"
                  : project.category === "modeling"
                  ? "3D modeling"
                  : "Umumiy"}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-[#55b8ff] to-[#5d75a5] bg-clip-text text-transparent leading-tight">
              {project.title}
            </h1>

            <p className="text-white/70 text-lg leading-relaxed">
              {project.description}
            </p>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#55b8ff] hover:text-white transition-colors text-sm font-medium"
              >
                Loyihani ko'rish
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          {/* Right: Main image */}
          <div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div
                className="aspect-video rounded-xl overflow-hidden cursor-pointer group relative"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={project.images?.[selectedImage] || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {project.images && project.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? "border-[#55b8ff]"
                          : "border-white/20 hover:border-white/40"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 1 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Loyiha galereyasi</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border border-white/10 hover:border-[#55b8ff]/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    setSelectedImage(index + 1);
                    setIsLightboxOpen(true);
                  }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} - ${index + 2}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 inline-block">
            <h3 className="text-white text-xl font-bold mb-3">
              Sizga ham shunday loyiha kerakmi?
            </h3>
            <p className="text-white/60 mb-5 text-sm">
              Biz bilan bog'laning va o'z loyihangizni boshlang
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+998906900048"
                className="bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] text-white px-6 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium text-sm"
              >
                Bog'lanish
              </a>
              <Link
                to="/"
                className="border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/5 transition-all duration-300 font-medium text-sm"
              >
                Boshqa loyihalar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={project.images?.[selectedImage] || "/placeholder.svg"}
              alt={project.title}
              className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
            />

            {project.images && project.images.length > 1 && (
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() =>
                    setSelectedImage(selectedImage > 0 ? selectedImage - 1 : project.images.length - 1)
                  }
                  className="bg-white/10 text-white p-2.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setSelectedImage(selectedImage < project.images.length - 1 ? selectedImage + 1 : 0)
                  }
                  className="bg-white/10 text-white p-2.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
