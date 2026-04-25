import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../shared/api/Fetcher";

const categoryLabel = (cat) =>
  cat === "web" ? "Vebsayt" : cat === "design" ? "Brending" : cat === "modeling" ? "3D modeling" : "Umumiy";

const DetailSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="container mx-auto max-w-6xl px-4 md:px-8 py-10">
      <div className="skeleton h-6 w-24 mb-10 rounded-full" />
      <div className="skeleton h-[480px] w-full rounded-3xl mb-10" />
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="skeleton h-8 w-32 rounded-full" />
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-3/4" />
          <div className="skeleton h-5 w-full" />
          <div className="skeleton h-5 w-5/6" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ProjectDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { data: project, error, isLoading } = useSWR(`/projects/${id}`, fetcher);

  if (isLoading) return <DetailSkeleton />;

  if (error || !project || project.message) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-8xl font-black text-slate-100 mb-2 select-none">404</div>
          <h1 className="text-2xl font-black text-[#0F172A] mb-3">Loyiha topilmadi</h1>
          <p className="text-slate-500 text-sm mb-8">Siz qidirayotgan loyiha mavjud emas yoki o'chirilgan.</p>
          <Link to="/"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Top bar */}
      <div className="border-b border-slate-100 bg-white sticky top-0 z-10 backdrop-blur-md bg-white/90">
        <div className="container mx-auto max-w-6xl px-4 md:px-8 py-3 flex items-center justify-between">
          <Link to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#2563EB] font-semibold text-sm transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Orqaga
          </Link>
          <span className="bg-blue-50 text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-full">
            {categoryLabel(project.category)}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-8 py-10">

        {/* Hero image */}
        <div
          className="relative rounded-3xl overflow-hidden bg-slate-100 cursor-pointer group mb-10"
          style={{ maxHeight: 520 }}
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={project.images?.[selectedImage] || "/placeholder.svg"}
            alt={project.title}
            className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            style={{ maxHeight: 520 }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
              <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {project.images && project.images.length > 1 && (
          <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
            {project.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === i ? "border-[#2563EB] shadow-md" : "border-slate-100 hover:border-slate-200"
                }`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">

          {/* Left — main info */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-black text-[#0F172A] leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              {project.description}
            </p>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 text-sm">
                Loyihani ko'rish
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          {/* Right — meta */}
          <div className="space-y-4">
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Kategoriya</p>
              <p className="text-[#0F172A] font-semibold">{categoryLabel(project.category)}</p>
            </div>
            {project.images?.length > 0 && (
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Rasmlar soni</p>
                <p className="text-[#0F172A] font-semibold">{project.images.length} ta rasm</p>
              </div>
            )}
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Shunday loyiha kerakmi?</p>
              <a href="tel:+998906900048"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold py-2.5 px-5 rounded-xl transition-colors duration-200 text-sm w-full justify-center">
                Bog'lanish
              </a>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 1 && (
          <div>
            <h2 className="text-2xl font-black text-[#0F172A] mb-6">Galereya</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((img, i) => (
                <div key={i}
                  className="rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => { setSelectedImage(i); setLightboxOpen(true); }}>
                  <div className="aspect-video overflow-hidden">
                    <img src={img} alt={`${project.title} ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA banner */}
      <div className="bg-[#F8FAFC] border-t border-slate-100">
        <div className="container mx-auto max-w-6xl px-4 md:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-[#0F172A] mb-1">Sizga ham shunday loyiha kerakmi?</h3>
            <p className="text-slate-500 text-sm">Biz bilan bog'laning va o'z loyihangizni boshlang</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="tel:+998906900048"
              className="bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm">
              Bog'lanish
            </a>
            <Link to="/"
              className="border-2 border-slate-200 hover:border-[#2563EB] text-slate-700 hover:text-[#2563EB] font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm">
              Boshqa loyihalar
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={project.images?.[selectedImage] || "/placeholder.svg"}
              alt={project.title}
              className="max-w-full max-h-[82vh] object-contain mx-auto rounded-2xl shadow-2xl"
            />

            {project.images && project.images.length > 1 && (
              <div className="flex justify-center gap-3 mt-5">
                <button
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : project.images.length - 1)}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-white/50 text-sm self-center">{selectedImage + 1} / {project.images.length}</span>
                <button
                  onClick={() => setSelectedImage(selectedImage < project.images.length - 1 ? selectedImage + 1 : 0)}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
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
