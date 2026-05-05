import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { toInternalHref } from "@/lib/routing";
import { siteConfig } from "@/lib/site";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const githubHandle = siteConfig.github.includes("github.com/")
  ? siteConfig.github.replace(/^https?:\/\/github.com\//, "")
  : "alucero270";

const footerGroups = [
  { heading: "Work", links: ["Selected Work", "Active Systems", "Recent Activity"] },
  { heading: "Engage", links: ["Start a Project", "Contact", "Resume"] },
  { heading: "Elsewhere", links: ["GitHub", "LinkedIn", "Email"] },
];

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
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
              alignItems: { xs: "stretch", md: "center" },
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
              <Box
                aria-hidden
                sx={{
                  alignItems: "center",
                  background: "linear-gradient(135deg, #9A85FF, #6B4CFF)",
                  borderRadius: 1,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)",
                  color: "#fff",
                  display: "flex",
                  fontFamily: "var(--font-code)",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  height: 28,
                  justifyContent: "center",
                  width: 28,
                }}
              >
                AL
              </Box>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                sx={{ alignItems: "baseline" }}
              >
                <Typography component="span" sx={{ fontSize: "0.92rem", fontWeight: 700 }}>
                  {siteConfig.ownerName}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontFamily: "var(--font-code)",
                    fontSize: "0.68rem",
                  }}
                >
                  / {githubHandle}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    alignItems: "center",
                    border: "1px solid rgba(63, 219, 138, 0.28)",
                    borderRadius: 1,
                    color: "#3FDB8A",
                    display: { xs: "none", sm: "inline-flex" },
                    fontFamily: "var(--font-code)",
                    fontSize: "0.64rem",
                    gap: 0.75,
                    px: 1,
                    py: 0.25,
                    textTransform: "uppercase",
                  }}
                >
                  <Box
                    aria-hidden
                    component="span"
                    sx={{
                      backgroundColor: "#3FDB8A",
                      borderRadius: "50%",
                      boxShadow: "0 0 0 3px rgba(63, 219, 138, 0.14)",
                      height: 5,
                      width: 5,
                    }}
                  />
                  Available
                </Typography>
              </Stack>
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

      <Container component="main" maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
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
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Box
                    aria-hidden
                    sx={{
                      alignItems: "center",
                      background: "linear-gradient(135deg, #9A85FF, #6B4CFF)",
                      borderRadius: 1,
                      color: "#fff",
                      display: "flex",
                      fontFamily: "var(--font-code)",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      height: 24,
                      justifyContent: "center",
                      width: 24,
                    }}
                  >
                    AL
                  </Box>
                  <Typography sx={{ fontWeight: 700 }}>{siteConfig.ownerName}</Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 320 }}>
                  {siteConfig.studioName} is the studio identity for practical software, embedded
                  integration, automation, and tools Alex can inspect and maintain.
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
              <span>© {new Date().getFullYear()} - built as a living system</span>
              <span>static-first / optional GitHub signal</span>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
