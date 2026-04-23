import { Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
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

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(8, 10, 15, 0.88)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, py: 1.5, flexWrap: "wrap" }}>
            <Stack
              component="a"
              href={toInternalHref("/")}
              spacing={0.25}
              sx={{ color: "text.primary", textDecoration: "none" }}
            >
              <Typography component="span" variant="h6" sx={{ lineHeight: 1.1 }}>
                {siteConfig.ownerName}
              </Typography>
              <Typography
                component="span"
                variant="caption"
                sx={{ color: "text.secondary", letterSpacing: 0, textTransform: "uppercase" }}
              >
                {siteConfig.studioName}
              </Typography>
            </Stack>
            <Stack
              component="nav"
              aria-label="Primary navigation"
              direction="row"
              spacing={0.5}
              sx={{ marginLeft: "auto", flexWrap: "wrap" }}
            >
              {navigationLinks.map((link) => (
                <Button
                  key={link.href}
                  href={toInternalHref(link.href)}
                  color="inherit"
                  sx={{ px: 1.5 }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </Box>

      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {children}
      </Container>

      <Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider", py: 2.5 }}>
        <Container maxWidth="lg">
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.primary">
              {new Date().getFullYear()} {siteConfig.ownerName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {siteConfig.studioName} is the studio layer for selected software, automation, and AI
              integration work.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
