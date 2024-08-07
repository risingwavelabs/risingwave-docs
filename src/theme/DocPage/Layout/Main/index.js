import React from "react";
import clsx from "clsx";
import { useDocsSidebar } from "@docusaurus/theme-common/internal";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

export default function DocPageLayoutMain({ hiddenSidebarContainer, children }) {
  const sidebar = useDocsSidebar();
  const location = useLocation();
  return (
    <main
      className={clsx(styles.docMainContainer, (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced)}
    >
      <div
        className={clsx(
          "container padding-top--md padding-bottom--lg",
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced
        )}
      >
        {location?.pathname?.includes?.("cloud") ? (
          <img
            referrerPolicy="no-referrer-when-downgrade"
            src="https://static.scarf.sh/a.png?x-pxid=63a86d76-f62d-4852-9f08-79a13d42ec3c"
          />
        ) : (
          <img
            referrerPolicy="no-referrer-when-downgrade"
            src="https://static.scarf.sh/a.png?x-pxid=2e45a652-ff43-4a5a-a189-3c27f799428c"
          />
        )}
        {children}
      </div>
    </main>
  );
}
