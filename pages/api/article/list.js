// pages/api/article/list.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const notionDatabaseId = 'ff987bb334804e98a7fb78a53d5c8d29';
        const notionApiUrl = `https://api.notion.com/v1/databases/${notionDatabaseId}/query`;

        const response = await fetch(notionApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            const error = await response.text();
            return res.status(response.status).json({ error });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}