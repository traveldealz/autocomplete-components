import "../src/index.js";

export default {
  parameters: {
    layout: "centered",
  },
};

export const ports = () => `<autocomplete-ports>Das ist ein Test<br /><textarea></textarea></autocomplete-ports>`;
export const airports = () => `<autocomplete-airports><textarea></textarea></autocomplete-airports>`;
export const countries = () => `<autocomplete-countries><textarea></textarea></autocomplete-countries>`;
