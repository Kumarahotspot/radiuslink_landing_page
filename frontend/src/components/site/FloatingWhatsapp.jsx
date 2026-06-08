import React from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../../lib/api";

export default function FloatingWhatsapp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp"
      className="fixed bottom-24 right-5 md:bottom-24 md:right-8 z-40 group"
      aria-label="Chat WhatsApp"
    >
      <div className="absolute inset-0 bg-emerald-500/50 rounded-full blur-2xl animate-pulse" />
      <div className="relative h-14 w-14 rounded-full bg-emerald-500 grid place-items-center shadow-2xl shadow-emerald-500/30 group-hover:scale-110 transition-transform">
        <MessageCircle className="h-6 w-6 text-white" />
      </div>
    </a>
  );
}
