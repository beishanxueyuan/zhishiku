// RainEffect.js
import React, { useEffect, useRef } from 'react';
import './RainEffect.css'; // 你需要创建这个CSS文件

const RainEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const columns = canvas.width / 20; // 每列的宽度
    const drops = Array.from({ length: columns }).fill(1); // 初始化每列的雨滴位置

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // 半透明背景
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0'; // 绿色字体
      ctx.font = '20px monospace';

      drops.forEach((y, x) => {
        const text = String.fromCharCode(Math.random() * 128);
        ctx.fillText(text, x * 20, y);
        drops[x] = y > canvas.height && Math.random() > 0.975 ? 0 : y + 20; // 重置雨滴
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

export default RainEffect;