import { createMuiTheme } from "@material-ui/core/styles";

/** Material-UIのスタイルのテーマ */
export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Noto Sans JP",
      "Lato",
      "游ゴシック Medium",
      "游ゴシック体",
      "Yu Gothic Medium",
      "YuGothic",
      "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN",
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
      light: "#64c9e5",
      main: "#2ab8d9",
      dark: "#006a83",
      contrastText: "#ffffff",
    },
    // オレンジ
    secondary: {
      light: "#fff065",
      main: "#ffbe30",
      dark: "#c78e00",
      contrastText: "#000000",
    },
    // ダークモード
    // type: "dark",
  },
});
