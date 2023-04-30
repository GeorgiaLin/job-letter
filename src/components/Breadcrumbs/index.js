import PublicIcon from "@mui/icons-material/Public";
import * as React from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

export default function BreadcrumbsWithIcon() {
  const breadcrumbs = [
    {
      label: "Home",
      link: "/home",
    },
    {
      label: "Page",
      link: "/personal-info",
    },
    {
      label: "Current Page",
      link: "/job",
    },
  ];
  return (
    <Breadcrumbs aria-label="breadcrumbs">
      <Link
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="neutral"
        fontSize="inherit"
        href="/home"
      >
        Open
      </Link>
      <Link
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="neutral"
        fontSize="inherit"
        href="/personal-info"
      >
        Profile
      </Link>
      <Link
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="neutral"
        fontSize="inherit"
        href="/"
      >
        Main
      </Link>
    </Breadcrumbs>
  );
}
