// mikemiller.ai — drop into tailwind.config.js under theme.extend.colors
module.exports = {
  theme: {
    extend: {
      colors: {
            "mm": {
                  "blue": "#1E58F7",
                  "violet": "#8A5CF4",
                  "ink": "#020C1E",
                  "navy": "#060F21",
                  "navy-deep": "#020D2B",
                  "indigo": "#3028B5",
                  "surface": "#FFFFFF",
                  "surface-alt": "#F8F8FB",
                  "divider": "#DEE0E7",
                  "muted": "#5A6478",
                  "muted-dark": "#98A2B8",
                  "blue-on-dark": "#81A1FB",
                  "gradient-flat": "#545AF6"
            },
            "mm-blue": {
                  "50": "#F2F5FF",
                  "100": "#E0E8FE",
                  "200": "#C0D0FD",
                  "300": "#98B2FB",
                  "400": "#628AF9",
                  "500": "#1E58F7",
                  "600": "#194AD0",
                  "700": "#143EAD",
                  "800": "#0F3086",
                  "900": "#0A235F"
            }
      },
      backgroundImage: {
        'mm-gradient': 'linear-gradient(90deg, #1E58F7 0%, #8A5CF4 100%)',
        'mm-navy': 'linear-gradient(90deg, #020D2B 0%, #020D2B 30%, #07134C 50%, #12196F 70%, #211F97 85%, #3028B5 100%)',
      },
    },
  },
};
