
import { homeRouting } from "./home.routes.js";

const gethash = () => location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/';
const main = ( ) => {
    const routes = {
        '/': homeRouting(),
        'home': homeRouting(),
        
    }
    const root = document.getElementById('app');
    root.innerHTML = routes[gethash()];
    console.log(gethash());
}




export default main;