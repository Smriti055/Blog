import config from '../conf/conf.js';
import { Client, Databases, Storage, Query, ID } from "appwrite";


//for all database services
export class DatabaseService{
    client  = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage,status, userId}){
        try {
           return await this.databases.createDocument(config.appDataBaseId,
                config.appCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.log("Create post error:", error);
        }
      
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appDataBaseId,
                config.appCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("update post: ", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appDataBaseId,
                 config.appCollectionId, 
                 slug
            )
            return true;
        } catch (error) {
            console.log("Delete post: ", error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appDataBaseId,
                 config.appCollectionId,
                  slug
            )
        } catch (error) {
            console.log("Get Post: ", error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appDataBaseId,
                 config.appCollectionId,
                 queries
            )
        } catch (error) {
            console.log("Get Posts: ", error)
            return false;
        }
    }

    async createFile(file){
        try {
            return await this.bucket.createFile(
                config.appBucketIdUrl,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Create File: ", error);
            return false;
        }
    }

    

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appBucketIdUrl,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Delete file: ", error);
            return false;
        }
    }
    
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appBucketIdUrl,
            fileId
        )
    }

}

const databaseService = new DatabaseService();

export default databaseService;