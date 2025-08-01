import React from "react";
import {
  BedDoubleIcon,
  SofaIcon,
  BathIcon,
  TvIcon,
  WifiIcon,
  RefrigeratorIcon,
} from "lucide-react";

const features = [
  { icon: <BedDoubleIcon className="w-6 h-6 text-gray-400" />, label: "2 Çift Kişilik Yatak" },
  { icon: <SofaIcon className="w-6 h-6 text-gray-400" />, label: "1 Oturma alanı" },
  { icon: <BathIcon className="w-6 h-6 text-gray-400" />, label: "2 Banyo" },
  { icon: <RefrigeratorIcon className="w-6 h-6 text-gray-400" />, label: "1 Minibar" },
  { icon: <WifiIcon className="w-6 h-6 text-gray-400" />, label: "Wi Fi" },
  { icon: <TvIcon className="w-6 h-6 text-gray-400" />, label: "1 Televizyon" },
];

const HotelInfo = () => (
  <div className="mt-6">
    <h3 className="font-semibold mb-4 text-lg">Özellikler</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {features.map((f, i) => (
        <div
          key={i}
         className="flex flex-col items-center justify-center gap-2 bg-white rounded-xl p-5 border border-gray-100 shadow-md min-h-[90px]"
        >
          {f.icon}
          <span className="text-sm font-medium text-center text-gray-500">{f.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default HotelInfo;

