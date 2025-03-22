const OverviewSkeleton = () => {
  return (
    <div className="w-[550px] h-[80vh] text-center px-6 m-auto mt-8 flex flex-col items-center justify-center">
      <div className="w-full h-[30%] flex items-center gap-3">
        <div className="animate-pulse bg-primary/10 h-full w-1/2 rounded" />
        <div className="animate-pulse bg-primary/10 h-full w-1/2 rounded" />
      </div>
      <div className="animate-pulse bg-primary/10 h-[10%] w-full mt-3 rounded" />
      <div className="animate-pulse bg-primary/10 h-[5%] mt-3 w-full rounded" />
      <div className="animate-pulse bg-primary/10 h-[15%] mt-3 w-full rounded" />
    </div>
  );
};

export default OverviewSkeleton;
