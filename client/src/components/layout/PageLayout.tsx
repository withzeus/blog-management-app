import { ReactNode } from "react";
import styled from "styled-components";

export default function PageLayout({ children }: { children: ReactNode }) {
  const DesktopSection = styled.div`
    width: 40%;
    height: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  `;

  return <DesktopSection>{children}</DesktopSection>;
}
