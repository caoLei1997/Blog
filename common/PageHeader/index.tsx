import { BackgroundImg } from "@/common";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative h-[280px] flex items-center justify-center overflow-hidden">
      <BackgroundImg />
      <div className="relative z-10 text-center pt-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-base text-white/85 drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
