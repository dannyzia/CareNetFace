import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'circle' | 'heart' | 'plus';
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        type: ['circle', 'heart', 'plus'][Math.floor(Math.random() * 3)] as Particle['type'],
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;

          if (particle.type === 'circle') {
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          } else if (particle.type === 'plus') {
            ctx.fillRect(particle.x - particle.size / 2, particle.y - 2, particle.size, 4);
            ctx.fillRect(particle.x - 2, particle.y - particle.size / 2, 4, particle.size);
          } else {
            const size = particle.size;
            ctx.moveTo(particle.x, particle.y + size / 4);
            ctx.quadraticCurveTo(particle.x, particle.y, particle.x + size / 4, particle.y);
            ctx.quadraticCurveTo(particle.x + size / 2, particle.y, particle.x + size / 2, particle.y + size / 4);
            ctx.quadraticCurveTo(particle.x + size / 2, particle.y + size / 2, particle.x, particle.y + size);
            ctx.quadraticCurveTo(particle.x - size / 2, particle.y + size / 2, particle.x - size / 2, particle.y + size / 4);
            ctx.quadraticCurveTo(particle.x - size / 2, particle.y, particle.x - size / 4, particle.y);
            ctx.quadraticCurveTo(particle.x, particle.y, particle.x, particle.y + size / 4);
          }
          ctx.fill();

          if (i % 5 === 0) {
            particles.slice(i + 1, i + 6).forEach((other) => {
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
              }
            });
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={particlesRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
