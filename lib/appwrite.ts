import {Account, Avatars, Client, Databases, ID, Query, Storage} from 'react-native-appwrite';
import {CreateUserParams, SignInParams} from "@/type";

export const appwriteConfig ={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT! ,
    platform : 'com.imran.foodordering',
    project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: '687d6d5f001586f36b37',
    bucketId: '687f035c0029c8cbbeb2',
    userCollectionId: '687d6d7e002d754563db',
    categoriesCollectionId: '687e3d8b000caab1a6eb',
    menuCollectionId: '687e3e1100226eb50839',
    customizationsCollectionId: '687e3f8f003db934bfcf',
    menuCustomizationsCollectionId: '687e40320022051d1339',
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.project) // Your Appwrite Project ID
    .setPlatform(appwriteConfig.platform)// Your Appwrite Platform

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client)
export const storage = new Storage(client);

export const createUser = async ({name, email, password}:CreateUserParams) => {

    try{
        const newAccount = await account.create(
            ID.unique(), // Use 'unique()' to generate a unique user ID
            email,
            password,
            name
        );
        if(!newAccount) throw new Error('Failed to create user')

        await signIn({email, password})

       return  await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                name,
                accountId: newAccount.$id,
                avatar: await avatars.getInitialsURL(name)
            }
        )



    }catch (e) {
        throw new Error(e as string)
    }
}

export  const signIn= async ({email, password}: SignInParams) => {
    try{
        const session = await account.createEmailPasswordSession(email, password);


    }catch(e) {
        throw new Error(e as string)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw new Error('No user is logged in');

      const currentUser = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal('accountId', currentAccount.$id)],
      )
        if(!currentUser) throw new Error('No user is logged in');

        return currentUser.documents[0]
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getMenu = async ({category, query}) => {
    try{
        const queries:string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )
        return menus.documents;
    }catch(e){
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try{
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )
        return categories.documents;
    }catch(e){
        throw new Error(e as string);
    }
}