import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Video } from "@/types";

type VideoReelProps = {
  label: string;
  videos: Video[];
};

const thumbnail = ({ id }: Video) => `https://i.ytimg.com/vi/${id}`;

const watchUrl = ({ id, format }: Video) =>
  format === "short"
    ? `https://www.youtube.com/shorts/${id}`
    : `https://www.youtube.com/watch?v=${id}`;

export default function VideoReel({ label, videos }: VideoReelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState<Video | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    const measure = () => {
      const max = list.scrollWidth - list.clientWidth;

      setEdges({ start: list.scrollLeft <= 1, end: list.scrollLeft >= max - 1 });
    };

    measure();
    list.addEventListener("scroll", measure, { passive: true });

    const observer = new ResizeObserver(measure);

    observer.observe(list);

    return () => {
      list.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, []);

  const page = (direction: 1 | -1) => {
    const list = listRef.current;

    list?.scrollBy({ left: direction * list.clientWidth * 0.8, behavior: "smooth" });
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!current || !dialog || dialog.open) return;

    dialog.showModal();
    // The dialog would otherwise focus the player, and key presses inside a
    // YouTube frame never reach the page, so Escape could not close it.
    dialog.querySelector<HTMLButtonElement>(".video-dialog-close")?.focus();
  }, [current]);

  const close = () => dialogRef.current?.close();

  return (
    <div className="video-reel">
      <div className="video-reel-head">
        <p className="video-reel-label">
          {label}
          <span>{videos.length} videos</span>
        </p>

        {!(edges.start && edges.end) && (
          <div className="video-reel-nav">
            <button
              type="button"
              aria-label="Previous videos"
              disabled={edges.start}
              onClick={() => page(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="More videos"
              disabled={edges.end}
              onClick={() => page(1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <ul className="video-reel-list" ref={listRef}>
        {videos.map((video) => (
          <li key={video.id} data-format={video.format}>
            <button
              type="button"
              className="video-tile"
              aria-label={`Play “${video.title}”`}
              title={video.title}
              onClick={() => setCurrent(video)}
            >
              {video.format === "short" ? (
                <img
                  src={`${thumbnail(video)}/oar2.jpg`}
                  alt=""
                  width={1080}
                  height={1920}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <img
                  src={`${thumbnail(video)}/mqdefault.jpg`}
                  srcSet={`${thumbnail(video)}/mqdefault.jpg 320w, ${thumbnail(video)}/hq720.jpg 1280w`}
                  sizes="220px"
                  alt=""
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
              )}

              <span className="video-tile-play" aria-hidden="true">
                <Play />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="video-dialog"
        data-format={current?.format}
        aria-label={current?.title}
        data-lenis-prevent
        onClose={() => setCurrent(null)}
        onClick={(event) => {
          // A click on the dialog itself, not its content, is on the backdrop.
          if (event.target === event.currentTarget) close();
        }}
      >
        {current && (
          <div className="video-dialog-body">
            <div className="video-dialog-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&playsinline=1`}
                title={current.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="video-dialog-bar">
              <p>{current.title}</p>

              <a
                href={watchUrl(current)}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
                <ArrowUpRight aria-hidden="true" />
              </a>

              <button
                type="button"
                className="video-dialog-close"
                onClick={close}
                aria-label="Close video"
              >
                <X aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
