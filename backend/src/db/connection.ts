import {connect,disconnect} from 'mongoose'

async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL)
    }catch(err){
        console.error(err)
        throw new Error('Could not connect to MongoDB')
    }
}

async function disconnectFromDatabase(){
    try{
        await disconnect()
    }catch(err){
        console.error(err)
        throw new Error('Could not disconnect from MongoDB')
    }
}

export {connectToDatabase, disconnectFromDatabase}