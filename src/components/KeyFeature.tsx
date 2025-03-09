import React from "react";
import { GlowingEffect } from "./ui/glowing-effect";
import { Clock, Globe, Palette, ShieldCheck, Wand } from "lucide-react";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
                md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const KeyFeature = () => {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 mt-16">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Wand className="h-5 w-5 text-black dark:text-neutral-400" />}
        title="Instant Customization"
        description="Personalize your content effortlessly with AI-driven suggestions and styling."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Globe className="h-5 w-5 text-black dark:text-neutral-400" />}
        title="Multi-Language Support"
        description="Generate high-quality content in multiple languages for a global reach."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Palette className="h-5 w-5 text-black dark:text-neutral-400" />}
        title="Creative Enhancements"
        description="Improve readability and engagement with AI-powered creative refinements."
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Clock className="h-5 w-5 text-black dark:text-neutral-400" />}
        title="Time-Saving Automation"
        description="Streamline content creation with AI-powered automation for efficiency."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={
          <ShieldCheck className="h-5 w-5 text-black dark:text-neutral-400" />
        }
        title="Data Privacy & Security"
        description="Your content is securely processed with robust data protection measures."
      />
    </ul>
  );
};

export default KeyFeature;
