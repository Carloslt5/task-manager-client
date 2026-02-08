import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useThemeContext } from "@/app/contexts/theme.context";

export const ThemeToggleButton = ({
  toggleMenuOpen,
}: {
  readonly toggleMenuOpen?: boolean;
}) => {
  const { darkMode, toggleThemeHandler } = useThemeContext();

  return (
    <span
      className={`w-8 p-2 flex ${toggleMenuOpen ? "justify-start" : "justify-center"} text-white rounded-sm cursor-pointer`}
      title="Theme Mode"
      onClick={toggleThemeHandler}
    >
      {darkMode ? <Brightness7Icon /> : <DarkModeIcon />}
    </span>
  );
};
