import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db } from "../firebase.config";

async function addServer(e, setServers) {
    e.preventDefault();

    const serverName = prompt("Saisir un nom de serveur");
    if (!serverName) {
        return alert("Veuillez saisir un nom");
    }

    try {
        const docRef = await addDoc(collection(db, "servers"), {
            name: serverName,
        });
        console.log("Document written with ID: ", docRef.id);
        getServers(setServers);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getServers(setServers) {
    await getDocs(collection(db, "servers")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setServers(newData);
    });
}

async function addChannel(e, serverId, setChannels, channelName, channelType) {
    e.preventDefault();
    if (!serverId || !setChannels || !channelName || !channelType) return;
    try {
        const docRef = await addDoc(
            collection(db, "servers", serverId, "channels"),
            {
                channelName,
                channelType,
            }
        );
        console.log("Document written with ID: ", docRef.id);
        getChannels(serverId, setChannels);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getChannels(serverId, setChannels) {
    if (!serverId || !setChannels) return;
    await getDocs(collection(db, "servers", serverId, "channels")).then(
        (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setChannels(newData);
        }
    );
}

async function addMessage(
    e,
    serverId,
    channelId,
    setMessages,
    message,
    username
) {
    e.preventDefault();
    if (!serverId || !channelId || !setMessages || !message || !username)
        return;
    try {
        const docRef = await addDoc(
            collection(
                db,
                "servers",
                serverId,
                "channels",
                channelId,
                "messages"
            ),
            {
                createAt: serverTimestamp(),
                message,
                username,
            }
        );
        console.log("Document written with ID: ", docRef.id);
        getMessages(serverId, channelId, setMessages);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getMessages(serverId, channelId, setMessages) {
    if (!serverId || !channelId || !setMessages) return;

    const q = query(
        collection(db, "servers", serverId, "channels", channelId, "messages"),
        orderBy("createAt"),
        limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let messages = [];
        QuerySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
    });
    return () => unsubscribe;
}

export {
    addServer,
    getServers,
    addChannel,
    getChannels,
    addMessage,
    getMessages,
};
