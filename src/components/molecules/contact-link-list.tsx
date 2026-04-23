import { Box, Stack, Typography } from "@mui/material";

import { ExternalLink } from "@/components/atoms";

type ContactLink = {
  label: string;
  value?: string;
};

type ContactLinkListProps = {
  links: ContactLink[];
};

function isExternalLink(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

export function ContactLinkList({ links }: ContactLinkListProps) {
  const visibleLinks = links.filter((link) => link.value);

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <Stack spacing={1.25}>
      {visibleLinks.map((link) => (
        <Typography key={link.label} component="p">
          <Box component="span" sx={{ fontWeight: 700 }}>
            {link.label}:{" "}
          </Box>
          {isExternalLink(link.value ?? "") ? <ExternalLink href={link.value ?? ""} /> : link.value}
        </Typography>
      ))}
    </Stack>
  );
}
