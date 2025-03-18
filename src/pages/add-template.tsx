import AddTemplateSkeleton from "@/components/common/skeleton-loading/add-template-skeleton";
import { TemplateCard } from "@/components/common/template-card";
import { Button } from "@/components/ui/button";
import { SYSTEM_TEMPLATES } from "@/lib/utils";
import { useEffect, useState } from "react";
import { HiOutlineTemplate } from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";

// TODO: add custom template
// TODO: preview template
// TODO: action | interactions template
// TODO: use template

function AddTemplate() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <AddTemplateSkeleton />;

  return (
    <>
      <div className="container mt-2 w-full flex flex-col items-start">
        <div className="m-auto h-fit flex items-start justify-between w-full pl-10 pr-20 py-2">
          <h1 className="text-lg font-medium flex items-center text-neutral-600 dark:text-neutral-300">
            <HiOutlineTemplate className="size-6 mr-2" />
            System Templates
          </h1>

          <Button>
            <MdOutlineDashboardCustomize className="size-4 mr-2" />
            Add Custom Templates
          </Button>
        </div>

        <div className="mt-3 h-[80vh] w-full px-8 pb-6">
          <div className="h-full w-full flex flex-wrap items-start gap-6 main_content_sidebar overflow-y-scroll">
            {SYSTEM_TEMPLATES.map((template) => (
              <TemplateCard template={template} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTemplate;
