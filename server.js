const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());

// تهيئة نموذج الذكاء الاصطناعي باستخدام مفتاحك المباشر
const genAI = new GoogleGenerativeAI('AQ.Ab8RN6LcuyKGy-Qi4BAmcaO9wWyj2fkGyk63_HVuleWkuhPIdw');

app.get('/', (req, res) => {
    res.send('AI-Dali Server is Running Successfully!');
});

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        if (!userMessage) {
            return res.status(400).json({ error: "الرجاء إرسال نص الرسالة" });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const botReply = response.text() || "عذراً، لم أستطع توليد رد مناسب.";

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "حدث خطأ في السيرفر أثناء معالجة الطلب" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
