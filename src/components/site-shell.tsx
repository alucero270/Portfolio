import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { LogoLockup } from "@/components/atoms/logo-lockup";
import { toInternalHref } from "@/lib/routing";
import { siteConfig } from "@/lib/site";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

const serviceMenuGroups = [
  {
    heading: "Engineering",
    links: [
      { href: "/services#prototype-systems", label: "Prototype Systems" },
      { href: "/services#embedded-telemetry", label: "Embedded & Telemetry" },
      { href: "/services#robotics-automation", label: "Robotics & Automation" },
    ],
  },
  {
    heading: "Infrastructure",
    links: [
      { href: "/services#ai-infrastructure", label: "AI Infrastructure" },
      { href: "/services#technical-software", label: "Technical Software" },
      { href: "/services#linux-operations", label: "Linux Operations" },
    ],
  },
];

const githubHandle = siteConfig.github.includes("github.com/")
  ? siteConfig.github.replace(/^https?:\/\/github.com\//, "")
  : "alucero270";

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
              <LogoLockup size="sm" />
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                sx={{ alignItems: "baseline" }}
              >
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
                  R&D / Consulting
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
              {navigationLinks.map((link) =>
                link.href === "/services" ? (
                  <Box
                    key={link.href}
                    sx={{
                      position: "relative",
                      "&:focus-within .services-menu, &:hover .services-menu": {
                        opacity: 1,
                        pointerEvents: "auto",
                        transform: "translate(-50%, 0)",
                      },
                    }}
                  >
                    <Button
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
                    <Box
                      className="services-menu"
                      sx={{
                        backgroundColor: "rgba(18, 18, 28, 0.98)",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                        boxShadow: "0 22px 70px rgba(0, 0, 0, 0.36)",
                        display: { xs: "none", md: "grid" },
                        gap: 3,
                        gridTemplateColumns: "repeat(2, minmax(190px, 1fr))",
                        left: "50%",
                        minWidth: 500,
                        opacity: 0,
                        p: 3,
                        pointerEvents: "none",
                        position: "absolute",
                        top: "calc(100% + 12px)",
                        transform: "translate(-50%, -6px)",
                        transition:
                          "opacity 160ms ease, transform 160ms ease, pointer-events 160ms ease",
                        zIndex: 20,
                        "&::before": {
                          content: '""',
                          height: 14,
                          left: 0,
                          position: "absolute",
                          right: 0,
                          top: -14,
                        },
                      }}
                    >
                      {serviceMenuGroups.map((group) => (
                        <Stack key={group.heading} spacing={1.2}>
                          <Typography
                            variant="caption"
                            sx={{
                              borderBottom: "1px solid",
                              borderColor: "divider",
                              color: "primary.main",
                              fontFamily: "var(--font-code)",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              pb: 1,
                              textTransform: "uppercase",
                            }}
                          >
                            {group.heading}
                          </Typography>
                          {group.links.map((serviceLink) => (
                            <Typography
                              key={serviceLink.href}
                              component="a"
                              href={toInternalHref(serviceLink.href)}
                              sx={{
                                color: "text.secondary",
                                fontSize: "0.9rem",
                                textDecoration: "none",
                                "&:hover": { color: "text.primary" },
                              }}
                            >
                              {serviceLink.label}
                            </Typography>
                          ))}
                        </Stack>
                      ))}
                    </Box>
                  </Box>
                ) : (
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
                ),
              )}
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
                <LogoLockup size="sm" showTagline />
                <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 320 }}>
                  {siteConfig.studioName} is a founder-led engineering studio for prototype systems,
                  embedded integration, technical software, AI infrastructure, and practical R&D.
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
