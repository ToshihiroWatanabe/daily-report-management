import { createMuiTheme } from "@material-ui/core/styles";

/** Material-UIのスタイルのテーマ */
export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: [
      "Noto Sans JP",
      "メイリオ",
      "Meiryo",
      "ＭＳ Ｐゴシック",
      "MS PGothic",
      "sans-serif",
    ].join(","),
  },
  palette: {
    // 水色
    primary: {
      main: "#2ab8d9",
      contrastText: "#ffffff",
    },
    // オレンジ
    secondary: {
      main: "#ffbe30",
      contrastText: "#000000",
    },
    // ダークモード
    // type: "dark",
  },
});
