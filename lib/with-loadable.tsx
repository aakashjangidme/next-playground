import { Suspense, FC, LazyExoticComponent } from 'react';

export const LinearLoaderIndicator = () => {
  return (
    <div className="relative w-full h-2 bg-gray-200 overflow-hidden rounded">
      <div className="absolute inset-0 h-full bg-blue-500 animate-linear-x" />
    </div>
  );
};

/**
 * HOC to wrap a component in a Suspense component.
 */
function withLoadable<P extends object>(Component: LazyExoticComponent<FC>) {
  return function Loadable(props: P) {
    return (
      <Suspense fallback={<LinearLoaderIndicator />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

export default withLoadable;
