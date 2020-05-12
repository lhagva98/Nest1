type ChestStores =
    "fetch" |
    "alert" |
    "emitter" |
    "token"
;

class chest {

    static state: any = {};

    static set(data: any, callback = () => {}){
        this.state = {
            ... this.state,
            ... data
        };
        callback();
    }

    static get(option: ChestStores): any {
        return this.state[option]
    }

}

export default chest;