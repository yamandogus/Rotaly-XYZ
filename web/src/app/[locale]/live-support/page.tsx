import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";

export default function LiveSupportPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Rotaly Canlı Destek Ekranı</h1>
        <p className="text-xl text-gray-600">Bu sayfa Canlı Destek sayfasıdır.</p>
        <div className="flex justify-center items-center p-4">
          <Button variant="outline" className="w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer">
            <MessageCircleIcon className="w-4 h-4" />
            <span>Canlı Destek</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 