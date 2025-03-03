const conf = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appDataBaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appBucketIdUrl: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf