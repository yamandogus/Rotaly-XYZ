import { Link } from "@/i18n/routing";
import { Heart, Share2, Home } from "lucide-react";

const Breadcrumbs = () => (
  <nav className="text-sm mb-6 flex items-center justify-between">
    <ol className="list-none p-0 inline-flex items-center flex-wrap">
      <li className="flex items-center">
        <Home className="w-4 h-4 mr-1 text-black" />
        <Link href="/" className="text-black hover:underline dark:text-white">
          Anasayfa
        </Link>
        <span className="mx-2">/</span>
      </li>
      <li className="flex items-center">
        <Link href="/categories/hotel" className="text-black hover:underline dark:text-white">
          Otel
        </Link>
        <span className="mx-2">/</span>
      </li>
      <li className="text-blue-600 font-semibold">Riad Deluxe Hotel</li>
    </ol>

    <div className="flex items-center gap-4">
      <Heart className="w-5 h-5 text-black cursor-pointer" />
      <Share2 className="w-5 h-5 text-black cursor-pointer" />
    </div>
  </nav>
);

export default Breadcrumbs;
