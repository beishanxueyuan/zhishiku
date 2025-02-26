import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabaseUrl = 'https://eqxshgzzcasyunvmxxxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxeHNoZ3p6Y2FzeXVudm14eHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NjMzMzYsImV4cCI6MjA1NjEzOTMzNn0.FJHaZIkvErVQy96gvjGzYi-Umn4W-yy7wVY1cMymjso';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // 从请求体中提取分页和搜索参数
            const { page = 1, pageSize = 10, searchText = '' } = req.body;

            // 参数校验
            if (typeof page !== 'number' || typeof pageSize !== 'number' || page < 1 || pageSize < 1) {
                return res.status(400).json({ error: 'Invalid pagination parameters.' });
            }

            // 计算分页范围
            const start = (page - 1) * pageSize;
            const end = start + pageSize - 1;

            // 构建查询条件
            let query = supabase
                .from('article')
                .select('*', { count: 'exact' }).order('created_at', { ascending: false });

            // 如果存在搜索关键词，则添加模糊匹配条件
            if (searchText) {
                const normalizedSearch = `%${searchText.toLowerCase()}%`;
                query = query.or(`Title.ilike.${normalizedSearch},Tags.ilike.${normalizedSearch}`);
            }

            // 执行查询并应用分页
            const { data, error, count } = await query.range(start, end);

            if (error) {
                console.error('Error fetching data:', error);
                return res.status(500).json({ error: error.message });
            }

            // 返回查询结果
            return res.status(200).json({
                data,
                pagination: {
                    page,
                    pageSize,
                    total: count,
                    hasMore: count > end + 1,
                },
            });
        } catch (err) {
            console.error('Unexpected error:', err);
            return res.status(500).json({ error: 'An unexpected error occurred' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}