import { useEffect, useState } from "react";
import Countdown from "react-countdown";

interface TenMinuteTimerProps {
  onTimeUp: () => void;
  isActive: boolean;
  shouldReset?: boolean; // Timer'ı sıfırlamak için yeni prop
}

export default function TenMinuteTimer({ onTimeUp, isActive, shouldReset = false }: TenMinuteTimerProps) {
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (shouldReset) {
      // Timer'ı sıfırla
      localStorage.removeItem("endTime");
      setEndTime(null);
      return;
    }

    if (isActive) {
      // Timer aktif olduğunda localStorage'da daha önce bir endTime var mı?
      const savedEndTime = localStorage.getItem("endTime");

      if (savedEndTime) {
        setEndTime(Number(savedEndTime));
      } else {
        const newEndTime = Date.now() + 10 * 60 * 1000; // 10 dk sonrası
        localStorage.setItem("endTime", newEndTime.toString());
        setEndTime(newEndTime);
      }
    }
  }, [isActive, shouldReset]);

  if (!endTime) return null;

  return (
    <Countdown
      date={endTime}
      className="bg-red-500 text-white rounded-md px-2 py-1"
      renderer={({ minutes, seconds, completed }) =>
        completed ? (
          <span>Zaman doldu</span>
        ) : (
          <span>
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        )
      }
      onComplete={() => {
        localStorage.removeItem("endTime");
        onTimeUp();
      }}
    />
  );
}
