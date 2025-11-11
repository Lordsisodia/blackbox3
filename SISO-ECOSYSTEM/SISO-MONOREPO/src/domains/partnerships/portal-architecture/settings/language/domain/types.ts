export interface LanguageSettings {
  locale: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  numberFormat: string;
  currencyFormat: string;
}
