import { Box } from "@mui/material";

type Props = {
  value: number;

  /**
   * If `true`, the value given should be formatted as that currency
   * @default false
   */
  currency?: string | boolean;

  /**
   * If `true`, the value is shown in green if positive, red if negative, and default if 0
   * @default false
   */
  profit?: boolean;

  /**
   * Number of decimals to show
   * @default 2
   */
  decimals?: number;
};

export const formatNumber = (
  value: number | string,
  options: Partial<Intl.NumberFormatOptions> = {}
) => {
  return (
    typeof value === "number" ? value : parseFloat(String(value))
  ).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
};

export const NumDisplay = ({
  value,
  currency = false,
  profit = false,
  decimals = 2,
}: Props) => {
  const currencyFromCtx = "EUR";
  const isCurrency = !!profit || !!currency;
  const currencyType =
    (currency === true ? currencyFromCtx : currency) || "EUR";

  function color() {
    if (!profit || value === 0) {
      return;
    }

    return value > 0 ? "green" : "red";
  }

  return (
    <Box component="div" sx={{ display: "inline", color: color() }}>
      {formatNumber(value, {
        style: isCurrency ? "currency" : undefined,
        currency: isCurrency ? currencyType : undefined,
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
    </Box>
  );
};
