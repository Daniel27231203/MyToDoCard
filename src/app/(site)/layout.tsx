import LayoutSite from "@/components/layout/LayoutSite";
import ReduxProvider from "@/providers/ReduxProvider";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <LayoutSite>{children}</LayoutSite>
    </ReduxProvider>
  );
};

export default layout;
