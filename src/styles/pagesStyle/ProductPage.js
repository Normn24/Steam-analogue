import { TabPanel } from "@mui/lab";
import { TableCell } from "@mui/material";
import { styled } from "@mui/system";

export const TableCellStyle = styled(TableCell)({
  color: "var(--text-color)",
});

export const TabPanelStyle = styled(TabPanel)({
  height: "auto",
  width: "auto",
  gap: "50px",
  alignItems: "center",
  opacity: 0.8,
  backgroundAttachment: "fixed",
  backgroundColor: "rgba(45, 49, 51, 0.8)",
  backgroundImage:
    "repeating-radial-gradient( circle at 0 0, transparent 0, var(--genre-color) 100px ), repeating-linear-gradient( #00000055, #000000 )",
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxShadow: "inset 0px -800px 600px -510px var(--background-color)",
  },
});

export const TabPanelContentStyle = styled("div")({
    backdropFilter: "blur(10px) saturate(99%)",
    backgroundColor: "var(--tab-panel-background-color)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    padding: "20px",
});
