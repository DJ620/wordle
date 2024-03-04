import axios from 'axios';

export default {
    newWord: () => {
        return axios.get('https://random-word-api.herokuapp.com/word?length=5');
    }
}