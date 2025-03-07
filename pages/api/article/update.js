// /api/article/update.js
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabaseUrl = 'https://eqxshgzzcasyunvmxxxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxeHNoZ3p6Y2FzeXVudm14eHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NjMzMzYsImV4cCI6MjA1NjEzOTMzNn0.FJHaZIkvErVQy96gvjGzYi-Umn4W-yy7wVY1cMymjso';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { id, title, url, tags } = req.body;

    // 参数校验
    if (!id) {
      return res.status(400).json({ error: 'Article ID is required.' });
    }
    if (!title && !url && !tags) {
      return res.status(400).json({ error: 'At least one field (title, url, or tags) must be provided to update.' });
    }

    // 构建更新数据对象，只包含提供的字段
    const updateData = {};
    if (title) updateData.Title = title;
    if (url) updateData.URL = url;
    if (tags) updateData.Tags = tags;
    updateData.updated_at = new Date().toISOString(); // 添加更新时间戳

    // 更新 Supabase 中的记录
    const { data, error } = await supabase
      .from('article')
      .update(updateData)
      .eq('id', id) // 根据 id 匹配
      .select()
      .single(); // 返回单条记录

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: `Article with ID ${id} not found.` });
      }
      console.error('Supabase error:', error);
      return res.status(500).json({ error: `Failed to update article: ${error.message}` });
    }

    // 返回成功响应
    return res.status(200).json({
      message: 'Article updated successfully',
      article: {
        id: data.id,
        title: data.Title,
        url: data.URL,
        tags: data.Tags,
        created_at: data.created_at,
        updated_at: data.updated_at
      }
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}