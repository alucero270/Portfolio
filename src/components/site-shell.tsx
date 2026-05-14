import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { LogoLockup, StatusChip } from "@/components/atoms";
import { toInternalHref } from "@/lib/routing";
import { siteConfig } from "@/lib/site";

const navigationLinks = [
  { href: "/projects", label: "Work" },
  { href: "/#active-systems-heading", label: "Systems" },
  { href: "/#thinking-out-loud-heading", label: "Lab" },
  { href: "/about", label: "About" },
];

const footerGroups = [
  { heading: "Work", links: ["Capabilities", "Case Studies", "Active R&D"] },
  { heading: "Engage", links: ["Discuss a System", "Contact", "Resume"] },
  { heading: "Elsewhere", links: ["GitHub", "LinkedIn", "Email"] },
];

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
        overflowX: "clip",
      }}
    >
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(14px)",
          backgroundColor: "rgba(10, 10, 15, 0.76)",
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 1.5, md: 3 }}
            sx={{
              alignItems: { xs: "center", md: "center" },
              justifyContent: "space-between",
              py: 1.75,
            }}
          >
            <Stack
              component="a"
              href={toInternalHref("/")}
              direction="row"
              spacing={1.25}
              sx={{ alignItems: "center", color: "text.primary", textDecoration: "none" }}
            >
              <LogoLockup size="sm" />
              <StatusChip label="available" />
            </Stack>
            <Stack
              component="nav"
              aria-label="Primary navigation"
              direction="row"
              spacing={{ xs: 0.25, sm: 0.75 }}
              sx={{ flexWrap: "wrap", justifyContent: { xs: "space-between", md: "flex-end" } }}
            >
              {navigationLinks.map((link) => (
                <Button
                  key={link.href}
                  href={toInternalHref(link.href)}
                  color="inherit"
                  sx={{
                    color: "text.secondary",
                    display: { xs: "none", sm: "inline-flex" },
                    fontSize: "0.82rem",
                    minWidth: 0,
                    px: { xs: 0.75, sm: 1.25 },
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                href={toInternalHref("/contact")}
                endIcon={<ArrowForward sx={{ fontSize: "0.9rem" }} />}
                variant="contained"
                sx={{ display: { xs: "none", md: "inline-flex" }, ml: 1 }}
              >
                Start a Project
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container component="main" maxWidth="lg" sx={{ overflowX: "clip", py: { xs: 5, md: 8 } }}>
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          backgroundColor: "rgba(15, 15, 23, 0.78)",
          borderTop: "1px solid",
          borderColor: "divider",
          mt: { xs: 4, md: 8 },
          py: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 3, md: 4 },
                gridTemplateColumns: { xs: "1fr", md: "1.5fr repeat(3, 1fr)" },
              }}
            >
              <Stack spacing={1.5}>
                <LogoLockup size="sm" showTagline />
                <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 320 }}>
                  The studio identity for {siteConfig.ownerName}&apos;s freelance engineering work:
                  SaaS, AI systems, internal tools, and prototype technical systems for small teams.
                </Typography>
              </Stack>
              {footerGroups.map(({ heading, links }) => (
                <Stack key={heading} spacing={1.25}>
                  <Typography
                    variant="caption"
                    sx={{ color: "primary.main", fontFamily: "var(--font-code)", fontWeight: 700 }}
                  >
                    {heading}
                  </Typography>
                  {links.map((link) => (
                    <Typography key={link} color="text.secondary" variant="body2">
                      {link}
                    </Typography>
                  ))}
                </Stack>
              ))}
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                color: "text.secondary",
                fontFamily: "var(--font-code)",
                fontSize: "0.72rem",
                justifyContent: "space-between",
                pt: 2.5,
              }}
            >
              <span>(c) {new Date().getFullYear()} Loose Arrow Labs</span>
              <span>static-first / authored case studies / optional GitHub signal</span>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
