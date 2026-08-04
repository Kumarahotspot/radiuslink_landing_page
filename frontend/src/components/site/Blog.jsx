import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useT } from "../../i18n";

const IMAGES = [
  "https://images.pexels.com/photos/2881224/pexels-photo-2881224.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=700&h=420",
  "https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=700&h=420",
  "https://images.pexels.com/photos/17194840/pexels-photo-17194840.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=700&h=420"
];

export default function Blog() {
  const { t } = useT();
  return (
    <section data-testid="blog-section" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{t.blog.eyebrow}</div>
            <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{t.blog.title}</h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.blog.posts.map((post, i) => (
            <a
              key={i}
              href="#"
              data-testid={`blog-card-${i}`}
              className="group rounded-3xl border border-overlay/10 bg-card/40 overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={IMAGES[i]}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-[0.18em] font-bold">
                  {post.tag}
                </div>
                <h3 className="mt-3 text-lg font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                  {t.blog.read_more}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
