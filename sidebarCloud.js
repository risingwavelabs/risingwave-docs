module.exports = {
  CloudSidebar: [
    {
      type: "category",
      label: "About",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "about-whats-risingwave-cloud",
        },
        {
          type: "doc",
          id: "about-whats-new",
        },
        {
          type: "doc",
          id: "about-faq",
        },
      ],
    },
    {
      type: "category",
      label: "Get started",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "quickstart",
          label: "Quick start",
        },
        {
          type: "link",
          href: "https://cloud.risingwave.com/auth/signup/",
          label: "Sign up and log in",
        },
      ],
    },
    {
      type: "category",
      label: "Project & database",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Manage projects",
          collapsible: true,
          link: { type: "doc", id: "project-manage-projects" },
          items: [
            {
              type: "doc",
              id: "project-manage-projects",
              label: "Overview",
            },
            {
              type: "doc",
              id: "project-choose-a-project-plan",
            },
            {
              type: "doc",
              id: "project-connect-to-a-project",
            },
            {
              type: "doc",
              id: "cluster-connection-errors",
            },
            {
              type: "doc",
              id: "project-byoc",
            },
            {
              type: "doc",
              id: "project-check-status-and-metrics",
              label: "Check status and metrics",
            },
            {
              type: "doc",
              id: "project-scale-a-project-manually"
            },
            {
              type: "doc",
              id: "project-update-database-version",
              label: "Update database version",
            },
            {
              type: "doc",
              id: "project-stop-and-delete-projects",
            },
          ],
        },
        {
          type: "category",
          label: "Manage database users",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "project-manage-database-users" },
          items: [
            {
              type: "doc",
              id: "project-manage-database-users",
              label: "Overview",
            },
            {
              type: "doc",
              id: "project-create-a-database-user",
              label: "Create a user",
            },
            {
              type: "doc",
              id: "project-change-database-user-password",
              label: "Change user password",
            },
            {
              type: "doc",
              id: "project-delete-a-database-user",
              label: "Delete a user",
            },
          ],
        },
        {
          type: "doc",
          id: "project-monitor-materialized-views",
        },
        {
          type: "doc",
          id: "project-export-metrics",
        },
      ],
    },
    {
      type: "category",
      label: "Develop",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "develop-overview",
        },
        {
          type: "category",
          label: "Manage sources",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "source-manage-sources" },
          items: [
            {
              type: "doc",
              id: "source-manage-sources",
              label: "Overview",
            },
            {
              type: "doc",
              id: "source-create-a-source",
            },
            {
              type: "doc",
              id: "source-drop-a-source",
            },
          ],
        },
        {
          type: "category",
          label: "Manage sinks",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "sink-manage-sinks" },
          items: [
            {
              type: "doc",
              id: "sink-manage-sinks",
              label: "Overview",
            },
            {
              type: "doc",
              id: "sink-create-a-sink",
            },
            {
              type: "doc",
              id: "sink-drop-a-sink",
            },
          ],
        },
        {
          type: "category",
          label: "PrivateLink connection",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "PrivateLink-overview" },
          items: [
            {
              type: "doc",
              id: "PrivateLink-overview",
              label: "Overview",
            },
            {
              type: "doc",
              id: "PrivateLink-create-a-connection",
            },
            {
              type: "doc",
              id: "PrivateLink-drop-a-connection",
            },
          ],
        },
        {
          type: "doc",
          id: "console-overview",
        },
      ],
    },
    {
      type: "category",
      label: "Organization",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "organization-overview",
          label: "Overview",
        },
        {
          type: "doc",
          id: "organization-manage-users",
          label: "Invite and manage users",
        },
        {
          type: "doc",
          id: "organization-sso",
          label: "Single Sign-On (SSO)",
        },
        {
          type: "doc",
          id: "organization-service-account",
          label: "Service account & API key",
        },
      ],
    },
    {
      type: "category",
      label: "Billing",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "billing-overview",
          label: "Overview",
        },
        {
          type: "doc",
          id: "billing-pricing",
        },
        {
          type: "doc",
          id: "billing-check-spending-details",
        },
        {
          type: "doc",
          id: "billing-review-and-pay-invoices",
        },
        {
          type: "doc",
          id: "billing-manage-payment-methods",
        },
      ],
    },
    {
      type: "category",
      label: "Account",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Manage your account",
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "account-manage-your-account",
              label: "Overview",
            },
            {
              type: "link",
              label: "Update your profile",
              href: "/cloud/manage-your-account/?task=update-profile",
            },
            {
              type: "link",
              label: "Change account password",
              href: "/cloud/manage-your-account/?task=change-password",
            },
            {
              type: "link",
              label: "Delete your account",
              href: "/cloud/manage-your-account/?task=delete-account",
            },
            {
              type: "link",
              label: "Switch accounts",
              href: "/cloud/manage-your-account/?task=switch-accounts",
            },
          ],
        },
        {
          type: "doc",
          id: "account-forgot-password",
        },
      ],
    },
  ],
};
