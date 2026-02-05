const StorageManager = {

    init(){
        if(!localStorage.getItem("DC_DB")){
            const defaultDB = {
                teachers:{},
                classes:{},
                students:{}
            };

            localStorage.setItem("DC_DB", JSON.stringify(defaultDB));
        }
    },

    getDB(){
        return JSON.parse(localStorage.getItem("DC_DB"));
    },

    saveDB(db){
        localStorage.setItem("DC_DB", JSON.stringify(db));
    }

};

StorageManager.init();
