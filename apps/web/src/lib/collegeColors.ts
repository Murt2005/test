export interface CollegeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export const getCollegeColors = (collegeName: string): CollegeColors => {
  const collegeColors: { [key: string]: CollegeColors } = {
    "Harvard University": { 
      primary: "#A51C30", 
      secondary: "#1E1E1E", 
      accent: "#C41E3A" 
    },
    "Stanford University": { 
      primary: "#8C1515", 
      secondary: "#2E2D29", 
      accent: "#B1040E" 
    },
    "Massachusetts Institute of Technology": { 
      primary: "#8A8B8C", 
      secondary: "#A31F34", 
      accent: "#D4D6D8" 
    },
    "University of California, Los Angeles": { 
      primary: "#2774AE", 
      secondary: "#FFD100", 
      accent: "#005587" 
    },
    "Yale University": { 
      primary: "#00356B", 
      secondary: "#BD9865", 
      accent: "#286DC0" 
    },
    "Princeton University": { 
      primary: "#FF6000", 
      secondary: "#1E1E1E", 
      accent: "#FF8C00" 
    },
    "Columbia University": { 
      primary: "#B9C9AC", 
      secondary: "#1E1E1E", 
      accent: "#9BB5D6" 
    },
    "University of Pennsylvania": { 
      primary: "#011F5B", 
      secondary: "#990000", 
      accent: "#1E407C" 
    },
    "Dartmouth College": { 
      primary: "#00693E", 
      secondary: "#1E1E1E", 
      accent: "#00843D" 
    },
    "Brown University": { 
      primary: "#4E3629", 
      secondary: "#C41E3A", 
      accent: "#8B4513" 
    },
    "University of Washington": { 
      primary: "#4B2E83", 
      secondary: "#B7A57A", 
      accent: "#85754D" 
    },
  };

  return collegeColors[collegeName] || { 
    primary: "#0d87e1", 
    secondary: "#1E1E1E", 
    accent: "#0983df" 
  };
};

export const getCollegeTailwindClasses = (collegeName: string) => {
  const colors = getCollegeColors(collegeName);
  
  // Generate CSS custom properties for dynamic theming
  const cssVars = {
    '--college-primary': colors.primary,
    '--college-secondary': colors.secondary,
    '--college-accent': colors.accent,
  };

  return {
    colors,
    cssVars,
    // Tailwind classes that can be used with the college colors
    primaryBg: 'bg-[var(--college-primary)]',
    secondaryBg: 'bg-[var(--college-secondary)]',
    accentBg: 'bg-[var(--college-accent)]',
    primaryText: 'text-[var(--college-primary)]',
    secondaryText: 'text-[var(--college-secondary)]',
    accentText: 'text-[var(--college-accent)]',
    primaryBorder: 'border-[var(--college-primary)]',
    secondaryBorder: 'border-[var(--college-secondary)]',
    accentBorder: 'border-[var(--college-accent)]',
  };
};

export const getCollegeGradient = (collegeName: string, direction: 'to-r' | 'to-br' | 'to-b' = 'to-r') => {
  const colors = getCollegeColors(collegeName);
  return `bg-gradient-${direction} from-[${colors.primary}] to-[${colors.secondary}]`;
}; 
