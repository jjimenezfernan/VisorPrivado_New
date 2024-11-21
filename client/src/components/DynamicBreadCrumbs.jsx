import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ColorModeContext, tokens } from "../theme";
import { useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function DynamicBreadcrumbs({ crumbs }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map((crumb, index) => {
          const [name, link] = crumb;
          const isLastCrumb = index === crumbs.length - 1;
          return isLastCrumb ? (
            <Typography
              color={colors.blueAccent[400]}
              fontWeight={600}
              key={name}
              sx={{ ":hover": { color: colors.blueAccent[400] } }}
            >
              {name}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              key={name}
              underline="hover"
              color={colors.gray[400]}
              to={link}
              sx={{ ":hover": { color: colors.blueAccent[400] } }}
            >
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default DynamicBreadcrumbs;
