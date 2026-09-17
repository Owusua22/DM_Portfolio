"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { supabase } from "@/lib/supabase";

// ---------- Types ----------
type SourceType = "case_study" | "project" | "design" | "video";

interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  description: string;
  summary?: string;
  category: string;
  sourceType: SourceType;
  videoUrl?: string;
  projectUrl?: string;
  driveUrl?: string;
  date?: string;
  client?: string;
  year?: string;
  role?: string;
  tools?: string[];
  services?: string[];
  situation?: string;
  task?: string;
  action?: string;
  results?: string;
  result?: string;
  impactLabel?: string;
  platform?: string;
  isFeatured?: boolean;
  galleryImages: string[];
}

const TABS: { key: SourceType; label: string }[] = [
  { key: "case_study", label: "Case Studies" },
  { key: "project", label: "Projects" },
  { key: "design", label: "Design Projects" },
  { key: "video", label: "UGC Videos" },
];

const ACCENT_ORANGE = "rgb(230, 127, 31)";
const DEEP_EMERALD = "rgb(26, 120, 100)";

// ---------- Helpers ----------
const isYouTubeUrl = (url: string): boolean =>
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(url);
const isVimeoUrl = (url: string): boolean => /vimeo\.com\/\d+/.test(url);
const youtubeEmbedUrl = (url: string): string => {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?#]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};
const vimeoEmbedUrl = (url: string): string => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : url;
};

function parseGalleryImages(
  gallery: unknown,
  fallbackImage?: string
): string[] {
  const images: string[] = [];
  if (fallbackImage && fallbackImage.trim()) images.push(fallbackImage.trim());
  if (!gallery) return images;
  if (Array.isArray(gallery)) {
    gallery.forEach((item) => {
      if (typeof item === "string" && item.trim()) images.push(item.trim());
    });
    return images;
  }
  if (typeof gallery === "string") {
    const trimmed = gallery.trim();
    if (!trimmed) return images;
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (typeof item === "string" && item.trim())
            images.push(item.trim());
        });
        return images;
      }
    } catch {}
    if (trimmed.includes(",")) {
      trimmed.split(",").forEach((item) => {
        const url = item.trim();
        if (url) images.push(url);
      });
      return images;
    }
    if (trimmed.startsWith("http")) {
      images.push(trimmed);
    }
  }
  return images;
}

function normalizeStringArray(value: unknown): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    return value
      .filter((item) => typeof item === "string" && item.trim() !== "")
      .map((item) => String(item).trim());
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((item) => typeof item === "string" && item.trim() !== "")
          .map((item) => String(item).trim());
      }
    } catch {}
    if (trimmed.includes(",")) {
      return trimmed
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }
    return [trimmed];
  }
  return undefined;
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<SourceType>("case_study");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string>("");

  // ---------- Modal helpers ----------
  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setSelectedGalleryImage("");
  };

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    const galleryImages =
      item.galleryImages && item.galleryImages.length > 0
        ? item.galleryImages
        : [item.image];
    setSelectedGalleryImage(galleryImages[0]);
    setModalOpen(true);
  };

  // ---------- Scroll lock ----------
  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", h);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", h);
    };
  }, [modalOpen]);

  // ---------- Fetch ----------
  useEffect(() => {
    let cancelled = false;

    const fetchTable = async (
      table: string,
      imageField: string,
      sourceType: SourceType
    ): Promise<PortfolioItem[]> => {
      try {
        const { data, error } = await supabase
          .from(table)
          .select("*")
          .order("created_at", { ascending: false });

        if (error) return [];
        if (!data || data.length === 0) return [];

        return data
          .filter((p: any) => p[imageField])
          .map((p: any) => {
            const fallbackImage = String(p[imageField] || "");
            const galleryImages =
              sourceType === "design"
                ? parseGalleryImages(p.gallery, fallbackImage)
                : [fallbackImage];

            return {
              id: String(p.id || ""),
              image: fallbackImage,
              title: String(p.title || "Untitled"),
              description: String(p.description || ""),
              summary: p.summary ? String(p.summary) : "",
              category: String(p.category || "Uncategorized"),
              sourceType,
              videoUrl: p.video_url ? String(p.video_url) : undefined,
              projectUrl: p.project_url ? String(p.project_url) : undefined,
              driveUrl: p.drive_url ? String(p.drive_url) : undefined,
              date: p.date ? String(p.date) : undefined,
              client: p.client ? String(p.client) : undefined,
              year: p.year ? String(p.year) : undefined,
              role: p.role ? String(p.role) : undefined,
              tools: normalizeStringArray(p.tools),
              services: normalizeStringArray(p.services),
              situation: p.situation ? String(p.situation) : undefined,
              task: p.task ? String(p.task) : undefined,
              action: p.action ? String(p.action) : undefined,
              results: p.results ? String(p.results) : undefined,
              result: p.result ? String(p.result) : undefined,
              impactLabel: p.impact_label ? String(p.impact_label) : undefined,
              platform: p.platform ? String(p.platform) : undefined,
              isFeatured: p.is_featured === true,
              galleryImages,
            };
          });
      } catch (err) {
        return [];
      }
    };

    const fetchAll = async () => {
      setLoading(true);

      const [caseStudies, projects, designs, ugc] = await Promise.all([
        fetchTable("case_studies", "media_url", "case_study"),
        fetchTable("projects", "media_url", "project"),
        fetchTable("graphic_designs", "image_url", "design"),
        fetchTable("ugc_videos", "thumbnail_url", "video"),
      ]);

      if (cancelled) return;

      const all = [...caseStudies, ...projects, ...designs, ...ugc].sort(
        (a, b) => {
          if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
          return 0;
        }
      );

      setItems(all);
      setLoading(false);
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleItems = items.filter((i) => i.sourceType === activeTab);

  const renderVideo = (url: string) => {
    if (isYouTubeUrl(url)) {
      return (
        <iframe
          src={youtubeEmbedUrl(url)}
          title="Video"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="portfolio-modal-video"
        />
      );
    }
    if (isVimeoUrl(url)) {
      return (
        <iframe
          src={vimeoEmbedUrl(url)}
          title="Video"
          frameBorder={0}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="portfolio-modal-video"
        />
      );
    }
    return (
      <video controls playsInline className="portfolio-modal-video" src={url} />
    );
  };

  const renderDetailField = (
    label: string,
    value: string | undefined | null
  ) => {
    if (!value || value.trim() === "") return null;
    return (
      <li>
        <strong>{label}</strong>
        <span style={{ whiteSpace: "pre-line" }}>{value}</span>
      </li>
    );
  };

  const renderDetailList = (label: string, list: string[] | undefined) => {
    if (!list || list.length === 0) return null;
    return (
      <li>
        <strong>{label}</strong>
        <span>{list.join(", ")}</span>
      </li>
    );
  };

  const getSourceTypeLabel = (sourceType: SourceType) => {
    switch (sourceType) {
      case "case_study":
        return "Case Study";
      case "design":
        return "Design Project";
      case "video":
        return "UGC Video";
      case "project":
        return "Project";
      default:
        return "Work";
    }
  };

  return (
    <section id="portfolio" className="portfolio section" style={{ padding: "80px 0" }}>
      
      {/* High-Fidelity Responsive Grid Sizing Engine */}
      <style>{`
        .portfolio-grid-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        .portfolio-card {
          background: #ffffff;
          border: 1px solid rgba(26, 120, 100, 0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .portfolio-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(20, 58, 52, 0.08);
          border-color: rgba(230, 127, 31, 0.2);
        }
        .portfolio-image {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #f4f8f7;
        }
        .portfolio-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .portfolio-card:hover .portfolio-image img {
          transform: scale(1.05);
        }
        .portfolio-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .portfolio-content h3 {
          font-size: 20px;
          font-weight: 850;
          color: #111827;
          line-height: 1.3;
          margin: 8px 0 10px 0;
          transition: color 0.3s ease;
        }
        .portfolio-card:hover .portfolio-content h3 {
          color: ${ACCENT_ORANGE};
        }
        .portfolio-card p {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 24px;
          font-weight: 500;
        }
        
        /* Interactive CTA Arrow Button styling */
        .portfolio-interactive-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 50px;
          border: 1.5px solid ${ACCENT_ORANGE};
          background: transparent;
          color: ${ACCENT_ORANGE};
          font-size: 13.5px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          align-self: flex-start;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .portfolio-card:hover .portfolio-interactive-btn {
          background: ${ACCENT_ORANGE};
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(230, 127, 31, 0.25);
        }
        .portfolio-interactive-btn svg {
          transition: transform 0.3s ease;
        }
        .portfolio-card:hover .portfolio-interactive-btn svg {
          transform: translateX(4px);
        }

        /* Highly Optimized Mobile Grid Override */
        @media (max-width: 767px) {
          .portfolio-grid-layout {
            grid-template-columns: repeat(2, 1fr) !important; /* Force EXACTLY 2 Columns on Mobile */
            gap: 12px !important;
          }
          .portfolio-content {
            padding: 12px !important;
          }
          .portfolio-content h3 {
            font-size: 13.5px !important;
            font-weight: 800;
            margin: 4px 0 6px 0 !important;
          }
          .portfolio-card p {
            display: none !important; /* Hide long paragraphs on mobile to maintain clean grid ratios */
          }
          .portfolio-content .category {
            font-size: 9.5px !important;
            padding: 2px 6px !important;
          }
          .portfolio-interactive-btn {
            padding: 6px 12px !important;
            font-size: 10px !important;
            gap: 4px !important;
            border-width: 1px !important;
          }
          .portfolio-interactive-btn svg {
            width: 10px !important;
            height: 10px !important;
          }
        }
      `}</style>

      <SectionTitle
        title="Portfolio"
        description="A curated selection of case studies, marketing projects, visual design suites, and performance UGC videos showcasing results."
      />

      <div className="container">
        
        {/* Dynamic Filter Navigation Bar */}
        <div className="portfolio-filters-container">
          <ul className="portfolio-filters isotope-filters">
            {TABS.map((tab) => (
              <li
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={activeTab === tab.key ? "filter-active" : undefined}
                style={{
                  fontWeight: "750",
                  textTransform: "uppercase",
                  fontSize: "12.5px",
                  letterSpacing: "0.5px"
                }}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Portfolio Listing Grid */}
        {loading ? (
          <div className="d-flex align-items-center justify-content-center py-5">
            <div className="spinner-border" role="status" style={{ color: ACCENT_ORANGE }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : visibleItems.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(26, 120, 100, 0.08)",
              borderRadius: 20,
              padding: "3.5rem 1.5rem",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
              maxWidth: "500px",
              margin: "40px auto 0 auto"
            }}
          >
            <i
              className="bi bi-folder2-open"
              style={{ fontSize: "2.5rem", color: ACCENT_ORANGE }}
            />
            <p className="mt-3 mb-1 fw-extrabold text-dark">
              No {TABS.find((t) => t.key === activeTab)?.label} yet
            </p>
          </div>
        ) : (
          <div className="portfolio-grid-layout">
            {visibleItems.map((item) => (
              <div 
                key={item.id}
                className="portfolio-card"
                onClick={() => openModal(item)}
                role="button"
                tabIndex={0}
                aria-label={`Open details for ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(item);
                  }
                }}
              >
                {/* Visual Thumbnail Framing */}
                <div className="portfolio-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  {item.sourceType === "video" && (
                    <span 
                      className="portfolio-play-badge"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        background: "rgba(15, 47, 42, 0.25)",
                        color: "#ffffff"
                      }}
                    >
                      <span 
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "50%",
                          background: "#ffffff",
                     
                          display: "grid",
                          placeItems: "center",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.25)"
                        }}
                      >
                        <i className="bi bi-play-fill" style={{ fontSize: "26px", marginLeft: "4px" }} />
                      </span>
                    </span>
                  )}
                </div>

                {/* Metadata & Typography Details */}
                <div className="portfolio-content">
                  <div className="d-flex align-items-center justify-content-between mb-1 flex-wrap gap-1">
                    <span 
                      className="category"
                      style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        textTransform: "uppercase",
                        color: DEEP_EMERALD,
                        background: "rgba(26, 120, 100, 0.06)",
                        padding: "4px 10px",
                        borderRadius: "50px",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {item.category}
                    </span>
                    {item.isFeatured && (
                      <span 
                        className="badge" 
                        style={{ 
                          backgroundColor: ACCENT_ORANGE, 
                          color: "#ffffff",
                          fontSize: "10px",
                          fontWeight: "800",
                          borderRadius: "50px",
                          padding: "4px 10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <h3>{item.title}</h3>
                  
                  {item.description && (
                    <p>
                      {item.description.length > 90
                        ? `${item.description.slice(0, 90)}…`
                        : item.description}
                    </p>
                  )}

                  {/* High-Interaction Micro Action Button */}
                  <button
                    type="button"
                    className="portfolio-interactive-btn"
                    aria-label={`View detailed results for ${item.title}`}
                  >
                    <span>View Project</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================
          MODAL VIEWER
      ============================================================ */}
      {modalOpen && selectedItem && (
        <div
          className="portfolio-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          <div className="portfolio-modal">
            <button
              type="button"
              className="portfolio-modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <i className="bi bi-x-lg" />
            </button>

            <div className="portfolio-modal-body">
              {/* ----- Media Rendering Frame ----- */}
              {selectedItem.sourceType === "video" && selectedItem.videoUrl ? (
                <div className="portfolio-modal-media">
                  {renderVideo(selectedItem.videoUrl)}
                </div>
              ) : selectedItem.sourceType === "design" &&
                selectedItem.galleryImages.length > 0 ? (
                <div className="portfolio-modal-media d-flex flex-column gap-3">
                  <div className="portfolio-modal-gallery-main">
                    <img
                      src={
                        selectedGalleryImage || selectedItem.galleryImages[0]
                      }
                      alt={selectedItem.title}
                      className="portfolio-modal-image"
                    />
                  </div>

                  {selectedItem.galleryImages.length > 1 && (
                    <div className="portfolio-modal-gallery-thumbs d-flex flex-wrap gap-2 justify-content-center">
                      {selectedItem.galleryImages.map((img, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedGalleryImage(img)}
                          className={`portfolio-modal-thumb ${
                            (selectedGalleryImage ||
                              selectedItem.galleryImages[0]) === img
                              ? "active"
                              : ""
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <img
                            src={img}
                            alt={`${selectedItem.title} - ${index + 1}`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : selectedItem.image ? (
                <div className="portfolio-modal-media">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="portfolio-modal-image"
                  />
                </div>
              ) : null}

              {/* ----- Detailed Copy Info ----- */}
              <div className="portfolio-modal-info">
                <span className="portfolio-modal-category">
                  {getSourceTypeLabel(selectedItem.sourceType)}
                </span>
                <h2 className="portfolio-modal-title">
                  {selectedItem.title}
                </h2>

                {selectedItem.summary && (
                  <div className="portfolio-modal-section">
                    <div style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
                      {selectedItem.summary}
                    </div>
                  </div>
                )}

                {selectedItem.description &&
                  selectedItem.description !== selectedItem.summary && (
                    <div className="portfolio-modal-section">
                      <div style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
                        {selectedItem.description}
                      </div>
                    </div>
                  )}

                {/* Case Study Details Grid */}
                {selectedItem.sourceType === "case_study" && (
                  <>
                    {(selectedItem.situation ||
                      selectedItem.task ||
                      selectedItem.action ||
                      selectedItem.results ||
                      selectedItem.result) && (
                      <div className="portfolio-modal-section">
                        <h4>Case Study Outline</h4>
                        <div className="d-flex flex-column gap-3 mt-3">
                          {selectedItem.situation && (
                            <div>
                              <h5 className="fw-semibold mb-1" style={{ color: DEEP_EMERALD }}>Situation</h5>
                              <div
                                style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
                              >
                                {selectedItem.situation}
                              </div>
                            </div>
                          )}
                          {selectedItem.task && (
                            <div>
                              <h5 className="fw-semibold mb-1" style={{ color: DEEP_EMERALD }}>Task</h5>
                              <div
                                style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
                              >
                                {selectedItem.task}
                              </div>
                            </div>
                          )}
                          {selectedItem.action && (
                            <div>
                              <h5 className="fw-semibold mb-1" style={{ color: DEEP_EMERALD }}>Action</h5>
                              <div
                                style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
                              >
                                {selectedItem.action}
                              </div>
                            </div>
                          )}
                          {(selectedItem.results || selectedItem.result) && (
                            <div>
                              <h5 className="fw-semibold mb-1" style={{ color: ACCENT_ORANGE }}>Results</h5>
                              <div
                                style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
                              >
                                {selectedItem.results || selectedItem.result}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <ul className="portfolio-modal-details">
                      {renderDetailField("Client", selectedItem.client)}
                      {renderDetailField("Year", selectedItem.year)}
                      {renderDetailField("Impact", selectedItem.impactLabel)}
                      {renderDetailList("Services", selectedItem.services)}
                      {renderDetailList("Tools", selectedItem.tools)}
                      {selectedItem.driveUrl && (
                        <li>
                          <strong>Google Drive</strong>
                          <a
                            href={selectedItem.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="bi bi-google me-1" />
                            View Full Case Study on Google Drive
                          </a>
                        </li>
                      )}
                    </ul>
                  </>
                )}

                {/* Project Details Grid */}
                {selectedItem.sourceType === "project" && (
                  <ul className="portfolio-modal-details">
                    {renderDetailField("Role", selectedItem.role)}
                    {renderDetailField("Date", selectedItem.date)}
                    {renderDetailList("Tools", selectedItem.tools)}
                    {selectedItem.projectUrl && (
                      <li>
                        <strong>Live Link</strong>
                        <a
                          href={selectedItem.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-globe me-1" />
                          {selectedItem.projectUrl}
                        </a>
                      </li>
                    )}
                    {selectedItem.driveUrl && (
                      <li>
                        <strong>Google Drive</strong>
                        <a
                          href={selectedItem.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-google me-1" />
                          View Project Files on Google Drive
                        </a>
                      </li>
                    )}
                  </ul>
                )}

                {/* Design Projects Details Grid */}
                {selectedItem.sourceType === "design" && (
                  <ul className="portfolio-modal-details">
                    {renderDetailField("Date", selectedItem.date)}
                    {selectedItem.driveUrl && (
                      <li>
                        <strong>Google Drive</strong>
                        <a
                          href={selectedItem.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-google me-1" />
                          View Design Files on Google Drive
                        </a>
                      </li>
                    )}
                  </ul>
                )}

                {/* UGC Performance Videos Details Grid */}
                {selectedItem.sourceType === "video" && (
                  <ul className="portfolio-modal-details">
                    {renderDetailField("Platform", selectedItem.platform)}
                    {renderDetailField("Date", selectedItem.date)}
                    {selectedItem.videoUrl &&
                      !isYouTubeUrl(selectedItem.videoUrl) &&
                      !isVimeoUrl(selectedItem.videoUrl) && (
                        <li>
                          <strong>Video URL</strong>
                          <a
                            href={selectedItem.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="bi bi-play-circle me-1" />
                            {selectedItem.videoUrl}
                          </a>
                        </li>
                      )}
                    {selectedItem.driveUrl && (
                      <li>
                        <strong>Google Drive</strong>
                        <a
                          href={selectedItem.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-google me-1" />
                          View Video Files on Google Drive
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}