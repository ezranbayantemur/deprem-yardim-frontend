import { MarkerData } from "@/mocks/types";
import { useMapActions } from "@/stores/mapStore";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { AhbapData } from "./types";

type Props = {
  drawerData: MarkerData | AhbapData | null;
};

export const CloseByRecord = ({ drawerData }: Props) => {
  const { setDrawerData } = useMapActions();
  const { t } = useTranslation("home");
  if (
    !drawerData ||
    !("closeByRecords" in drawerData) ||
    !drawerData.closeByRecords ||
    drawerData.closeByRecords.length <= 1
  )
    return null;
  const onClick = (reference: number) => () => {
    const tempDrawerData: MarkerData | AhbapData = {
      ...drawerData,
      isVisited: true,
      reference,
      closeByRecords: drawerData.closeByRecords,
    };
    setDrawerData(tempDrawerData);
  };
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          borderTop: "1px solid gray",
          marginTop: "1rem",
          paddingTop: "1rem",
        }}
      >
        {t("content.closeBy.title")}
      </Typography>
      <Typography>{t("content.closeBy.details")}</Typography>
      {drawerData.closeByRecords.map((record) => (
        <Button
          variant={record === drawerData.reference ? "contained" : "outlined"}
          onClick={onClick(record)}
          size="small"
          sx={{ margin: ".5rem .5rem 0 0" }}
          key={record}
        >
          ID: {record}
        </Button>
      ))}
    </Box>
  );
};
