import { useThemeContext } from "./theme-context";

export default function getAsset(asset: string) {
  const themeContext = useThemeContext();
  switch (asset) {
    case "logo":
      if (themeContext.theme == "light") return "/images/light-theme/Title.png";
      else return "/images/dark-theme/Title.png";
  }
}
