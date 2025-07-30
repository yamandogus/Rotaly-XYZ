import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const thumbnails = [
  { src: "/images/detail2.jpg", alt: "Hotel Thumbnail 1" },
  { src: "/images/detail3.jpg", alt: "Hotel Thumbnail 2" },
  { src: "/images/detail4.jpg", alt: "Hotel Thumbnail 3" },
  { src: "/images/detail5.jpg", alt: "Hotel Thumbnail 4", overlay: "16+" },
];

const ImageGallery = () => (
  <div className="lg:w-[700px]">
  
    <div className="relative h-[550px] w-full rounded-2xl overflow-hidden mb-4">
      <Image
        src="/images/detail1.jpg"
        alt="Riad Deluxe Hotel"
        fill
        className="object-cover"
        priority
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full shadow"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full shadow"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </Button>
    </div>

    {/* Alt küçük görseller */}
    <div className="grid grid-cols-4 gap-2 w-full">
  {thumbnails.map((thumb, idx) => (
    <div
      key={idx}
      className="relative w-full h-[210px] rounded-xl overflow-hidden cursor-pointer group"
    >
      <Image
        src={thumb.src}
        alt={thumb.alt}
        fill
        className={`object-cover ${thumb.overlay ? "opacity-60" : ""}`}
      />
      {thumb.overlay && (
        <span className="absolute inset-0 flex items-center justify-center z-10 text-white text-lg font-bold drop-shadow-lg">
          {thumb.overlay}
        </span>
      )}
    </div>
  ))}
</div>

  </div>
);

export default ImageGallery;
