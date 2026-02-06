function seedTeacherAccount(){

    let db = StorageManager.getDB();

    // nếu đã có teacher thì bỏ qua
    if(Object.keys(db.teachers).length > 0){
        return;
    }

    db.teachers["mainamson3010"] = {
        username: "mainamson3010",
        email: "mainamson22@gmail.com",
        password: "mainamson3010",
        classes: []
    };

    StorageManager.saveDB(db);

    console.log("Seed teacher account created!");
}

seedTeacherAccount();
