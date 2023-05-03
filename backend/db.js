const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://foodbar:raghuram007@cluster0.n9nsjsc.mongodb.net/foodbar?retryWrites=true&w=majority';

const connect_to_db = async ()=>{
    await mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(async ()=>{
        console.log("Connected");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err, data){

            const foodCategory = await mongoose.connection.db.collection("food_category");
            foodCategory.find({}).toArray(function(err, catData){
                if(err)
                    console.log(err);
                else
                {
                    // console.log(data);
                    global.food_items = data;
                    global.food_category = catData;
                }
            })
            // if(err)
            //     console.log(err);
            // else
            // {
            //     // console.log(data);
            //     global.food_items = data;
            // }
        });
    })
    .catch(()=>{
        console.log("Error");
    });
}

module.exports = connect_to_db;
