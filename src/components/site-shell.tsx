import { Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { siteConfig } from "@/lib/site";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
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
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, py: 1.5, flexWrap: "wrap" }}>
            <Typography
              component="a"
              href="/"
              variant="h6"
              sx={{ color: "text.primary", textDecoration: "none" }}
            >
              {siteConfig.ownerName}
            </Typography>
            <Stack
              component="nav"
              aria-label="Primary navigation"
              direction="row"
              spacing={0.5}
              sx={{ marginLeft: "auto", flexWrap: "wrap" }}
            >
              {navigationLinks.map((link) => (
                <Button key={link.href} href={link.href} color="inherit" sx={{ px: 1.5 }}>
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
          <Typography variant="body2" color="text.secondary">
            {new Date().getFullYear()} {siteConfig.ownerName}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
