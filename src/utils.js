class Utils {
  /**
   * Generates a random string
   * @returns {string}
   */
  static getUniqueIdentifierStr() {
    return Math.random().toString(16).substring(2);
  }

  /**
   * Returns the romanized version of an integer (as romans intended it: from 1 to 3999)
   * @param {!number} int
   * @returns {string}
   */
  static romanize(int) {
    if (parseInt(int, 10) !== int) {
      throw new Error("Input must be an integer");
    }

    if (int <= 0 || int >= 4000) {
      return "";
    }

    const roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };

    let romanized = "";
    let i = 0;
    let integer = int;

    while (integer > 0) {
      const key = Object.keys(roman)[i];
      const value = roman[key];

      if (integer >= value) {
        romanized += key;
        integer -= value;
      } else {
        i += 1;
      }
    }

    return romanized;
  }
}

module.exports = Utils;
