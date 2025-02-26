// /api/article/add.js
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabaseUrl = 'https://eqxshgzzcasyunvmxxxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxeHNoZ3p6Y2FzeXVudm14eHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NjMzMzYsImV4cCI6MjA1NjEzOTMzNn0.FJHaZIkvErVQy96gvjGzYi-Umn4W-yy7wVY1cMymjso';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, url, tags } = req.body;

      // 参数校验
      if (!title || !url || !tags) {
        return res.status(400).json({ error: 'Title, URL, and Tags are required.' });
      }

      // 插入数据到 Supabase 的 article 表
      const { data, error } = await supabase
  .from('article')
  .insert([{ Title: title, URL: url, Tags: tags, created_at: new Date().toISOString() }])
  .select();

      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ error: error.message });
      }

      // 返回成功响应
      return res.status(201).json({ message: 'Article added successfully', data: data[0] });
    } catch (err) {
      console.error('Unexpected error:', err);
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}