import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

type HTMLImageElementProps = React.ComponentProps<"img">;

export function ZoomableImage(props: HTMLImageElementProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoom, setZoom] = useState(false);

  const openModal = () => {
    setZoom(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    function handleEscKey(e: KeyboardEvent) {
      if (modalOpen && e.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [modalOpen, closeModal]);

  return (
    <div data-slot="zoomable-image">
      {/* biome-ignore lint/a11y/useAltText: props contain alt text */}
      {/* biome-ignore lint/performance/noImgElement: intentional use of img in generic UI component */}
      <img {...props} onClick={openModal} className={cn("cursor-zoom-in object-contain", props.className)} />
      {modalOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex justify-center overflow-auto bg-black bg-opacity-75 p-16",
            zoom ? "items-baseline" : "items-center",
          )}
        >
          <button
            type="button"
            className="absolute right-4 top-4 cursor-pointer text-4xl text-white"
            onClick={closeModal}
            aria-label="关闭图片预览"
          >
            &times;
          </button>
          {/* biome-ignore lint/a11y/useAltText: props contain alt text */}
          {/* biome-ignore lint/performance/noImgElement: intentional use of img in generic UI component */}
          <img
            {...props}
            onClick={() => setZoom(!zoom)}
            className={cn(
              zoom
                ? "m-0 ml-auto mr-auto max-h-none min-h-full max-w-none cursor-zoom-out object-contain"
                : "m-0 h-full max-h-full min-h-full w-full max-w-full cursor-zoom-in object-contain",
            )}
          />
        </div>
      )}
    </div>
  );
}
