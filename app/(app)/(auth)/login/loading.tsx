import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Loading = () => {
  return (
    <div className="container flex items-center justify-center min-h-main overflow-hidden">
      <LoadingSpinner className="w-8 h-8 overflow-hidden" />
    </div>
  );
};

export default Loading;
