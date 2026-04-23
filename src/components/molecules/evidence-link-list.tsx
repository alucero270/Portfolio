import { List, ListItem, ListItemText } from "@mui/material";

import { ExternalLink } from "@/components/atoms";

export type EvidenceLink = {
  description?: string;
  href: string;
  label: string;
};

type EvidenceLinkListProps = {
  links?: EvidenceLink[];
};

export function EvidenceLinkList({ links = [] }: EvidenceLinkListProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <List disablePadding>
      {links.map((link) => (
        <ListItem key={link.href} disableGutters>
          <ListItemText
            primary={<ExternalLink href={link.href}>{link.label}</ExternalLink>}
            secondary={link.description}
          />
        </ListItem>
      ))}
    </List>
  );
}
