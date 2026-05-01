import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Ctx = {
  isPostAuthNavigating: boolean;
  beginPostAuthNavigation: () => void;
  endPostAuthNavigation: () => void;
};

const PostAuthNavigationContext = createContext<Ctx | null>(null);

export function PostAuthNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPostAuthNavigating, setIsPostAuthNavigating] = useState(false);

  const beginPostAuthNavigation = useCallback(() => {
    setIsPostAuthNavigating(true);
  }, []);

  const endPostAuthNavigation = useCallback(() => {
    setIsPostAuthNavigating(false);
  }, []);

  const value = useMemo(
    () => ({
      isPostAuthNavigating,
      beginPostAuthNavigation,
      endPostAuthNavigation,
    }),
    [isPostAuthNavigating, beginPostAuthNavigation, endPostAuthNavigation],
  );

  return (
    <PostAuthNavigationContext.Provider value={value}>
      {children}
    </PostAuthNavigationContext.Provider>
  );
}

export function usePostAuthNavigation() {
  const ctx = useContext(PostAuthNavigationContext);
  if (!ctx) {
    throw new Error(
      "usePostAuthNavigation deve estar dentro de PostAuthNavigationProvider",
    );
  }
  return ctx;
}
