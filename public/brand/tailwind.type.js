// mikemiller.ai — drop into tailwind.config.js under theme.extend
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mm: ['DM Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mm-mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
            "display-xl": [
                  "3.8125rem",
                  {
                        "lineHeight": "1.05",
                        "letterSpacing": "-0.03em",
                        "fontWeight": "700"
                  }
            ],
            "display-lg": [
                  "3.0625rem",
                  {
                        "lineHeight": "1.08",
                        "letterSpacing": "-0.028em",
                        "fontWeight": "700"
                  }
            ],
            "display": [
                  "2.4375rem",
                  {
                        "lineHeight": "1.12",
                        "letterSpacing": "-0.025em",
                        "fontWeight": "700"
                  }
            ],
            "h1": [
                  "1.9375rem",
                  {
                        "lineHeight": "1.16",
                        "letterSpacing": "-0.022em",
                        "fontWeight": "700"
                  }
            ],
            "h2": [
                  "1.5625rem",
                  {
                        "lineHeight": "1.22",
                        "letterSpacing": "-0.02em",
                        "fontWeight": "700"
                  }
            ],
            "h3": [
                  "1.25rem",
                  {
                        "lineHeight": "1.35",
                        "letterSpacing": "-0.012em",
                        "fontWeight": "700"
                  }
            ],
            "body-lg": [
                  "1.25rem",
                  {
                        "lineHeight": "1.55",
                        "letterSpacing": "0em",
                        "fontWeight": "400"
                  }
            ],
            "body": [
                  "1rem",
                  {
                        "lineHeight": "1.6",
                        "letterSpacing": "0em",
                        "fontWeight": "400"
                  }
            ],
            "body-sm": [
                  "0.8125rem",
                  {
                        "lineHeight": "1.55",
                        "letterSpacing": "0.005em",
                        "fontWeight": "400"
                  }
            ],
            "label": [
                  "0.8125rem",
                  {
                        "lineHeight": "1.4",
                        "letterSpacing": "0.14em",
                        "fontWeight": "700"
                  }
            ]
      },
    },
  },
};
