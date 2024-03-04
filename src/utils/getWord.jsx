import axios from "axios";

export default {
  newWord: (numLetters) => {
    return axios.get(
      `https://random-word-api.herokuapp.com/word?length=${numLetters}`
    );
  },
};
