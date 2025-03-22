const CodeEditorSkeleton = () => {
  return (
    <div className="w-full h-[90vh] flex flex-col items-start p-10">
      <div className="animate-pulse bg-primary/10 w-1/2 rounded h-[30px]" />
      <div className="h-full w-full flex items-start gap-6 mt-4">
        <div className="animate-pulse bg-primary/10 rounded w-1/2 h-full" />
        <div className="animate-pulse bg-primary/10 rounded w-1/2 h-full" />
      </div>
    </div>
  );
};

export default CodeEditorSkeleton;
