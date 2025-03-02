// components/SectionWrapper.tsx
"use client";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const SectionWrapper = ({ id, children, className = "", noPadding = false }: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={`${noPadding ? '' : 'py-16 md:py-20'} relative ${className}`}
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
