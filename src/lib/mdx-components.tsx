import { Box, Link as MuiLink, Typography } from "@mui/material";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => <Typography variant="h2" component="h1" gutterBottom {...props} />,
  h2: (props) => <Typography variant="h3" component="h2" sx={{ mt: 5, mb: 2 }} {...props} />,
  h3: (props) => <Typography variant="h4" component="h3" sx={{ mt: 4, mb: 1.5 }} {...props} />,
  p: (props) => <Typography variant="body1" component="p" sx={{ mb: 2 }} {...props} />,
  ul: (props) => <Box component="ul" sx={{ pl: 3, mb: 2 }} {...props} />,
  ol: (props) => <Box component="ol" sx={{ pl: 3, mb: 2 }} {...props} />,
  li: (props) => <Box component="li" sx={{ mb: 1 }} {...props} />,
  blockquote: (props) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: "4px solid",
        borderColor: "primary.main",
        py: 0.5,
        px: 2,
        m: 0,
        my: 2.5,
        backgroundColor: "rgba(0, 90, 156, 0.08)",
      }}
      {...props}
    />
  ),
  hr: () => (
    <Box
      component="hr"
      sx={{ border: "none", borderTop: "1px solid", borderColor: "divider", my: 4 }}
    />
  ),
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/");
    return (
      <MuiLink
        href={href}
        target={isInternal ? undefined : "_blank"}
        rel={isInternal ? undefined : "noopener noreferrer"}
        {...props}
      >
        {children}
      </MuiLink>
    );
  },
  img: ({ src = "", alt = "", ...props }) => (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: "100%",
        maxWidth: 960,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        my: 2,
      }}
      {...props}
    />
  ),
  pre: (props) => (
    <Box
      component="pre"
      sx={{
        overflowX: "auto",
        p: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor: "#0F172A",
        color: "#E2E8F0",
        fontSize: "0.9rem",
      }}
      {...props}
    />
  ),
  code: (props) => (
    <Box
      component="code"
      sx={{
        fontFamily: "var(--font-code), ui-monospace, SFMono-Regular, Menlo, monospace",
        backgroundColor: "rgba(15, 23, 42, 0.08)",
        borderRadius: 1,
        px: 0.5,
        py: 0.1,
      }}
      {...props}
    />
  ),
};
