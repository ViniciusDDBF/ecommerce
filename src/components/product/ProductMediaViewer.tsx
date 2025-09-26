import ThumbnailNavigation from '../ThumbnailNavigation';

interface ProductMediaViewerProps {
  images: { url: string; media_type: string }[];
  selectedMedia: { url: string; media_type: string } | null;
  setSelectedMedia: (media: { url: string; media_type: string } | null) => void;
  productName: string;
  thumbnailOrientation?: 'horizontal' | 'vertical';
}

export default function ProductMediaViewer({
  images,
  selectedMedia,
  setSelectedMedia,
  productName,
  thumbnailOrientation = 'vertical',
}: ProductMediaViewerProps) {
  return (
    <div className="w-full lg:w-1/2">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:gap-6">
        {/* Thumbnail Navigation */}
        <div className="order-2 sm:order-1">
          <ThumbnailNavigation
            images={images}
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
            productName={productName}
            orientation={thumbnailOrientation}
          />
        </div>

        {/* Main Product Image */}
        <div className="order-1 flex-shrink-0 sm:order-2">
          <div className="drop-shadow-ember relative rounded-2xl">
            {selectedMedia &&
              (selectedMedia.media_type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  className="h-auto max-h-[400px] max-w-[400px] w-full rounded-lg object-contain sm:max-h-[500px]"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  className="h-auto max-h-[400px] max-w-[400px] w-full rounded-lg object-contain sm:max-h-[500px]"
                  alt={productName}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
