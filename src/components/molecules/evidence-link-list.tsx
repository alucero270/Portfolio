import { Link, List, ListItem, ListItemText } from "@mui/material";

import { ExternalLink } from "@/components/atoms";

export type EvidenceLink = {
  description?: string;
  href: string;
  label: string;
  type?: string;
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
            primary={
              link.href.startsWith("http") ? (
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )
            }
            secondary={link.description}
          />
        </ListItem>
      ))}
    </List>
  );
}
