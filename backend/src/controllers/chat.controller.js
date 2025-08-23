import { generateStreamToken } from "../config/stream.js";


export const getStreamToken = (req, res) => {
    try {
        const token = generateStreamToken(req.auth().userId);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to generate token" });
    }
};
