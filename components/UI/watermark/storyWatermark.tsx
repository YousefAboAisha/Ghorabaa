// components/watermark/storyWatermark.tsx

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const StoryWatermark = () => {
  return (
    <div className="pointer-events-none absolute bottom-2 left-3 z-10 backdrop-blur-[0.5px] p-1 border border-white/30 rounded-md bg-black/20">
      <div className="w-fit flex items-center justify-center gap-2 text-[9px] text-white">
        {/* Social Icons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FaInstagram
              size={10}
              className="text-white/70 hover:text-white transition-colors"
            />
            <FaXTwitter
              size={10}
              className="text-white/70 hover:text-white transition-colors"
            />
            <FaFacebookF
              size={10}
              className="text-white/70 hover:text-white transition-colors"
            />
          </div>

          {/* Handle */}
          <span dir="ltr">@ghorabaa_gaza</span>
        </div>
      </div>
    </div>
  );
};
