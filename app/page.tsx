'use client'



import { useEffect, useRef, useState } from "react";

const Home: React.FC = () => {
  const [duration, setDuration] = useState<number>(5);
  const [running, setRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [color, setColor] = useState<string>('#5caf50');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const intervalref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalref.current = setInterval(() => {
        const timeElapsed = Date.now() - (startTime || 0);
        const newProgress = Math.min((timeElapsed / (duration * 1000)) * 100, 100);
        setProgress(newProgress);
        if (newProgress >= 100) {
          clearInterval(intervalref.current!);
          setRunning(false);
        }
      }, 100)

    } else {
      clearInterval(intervalref.current!);
    }

    return () => clearInterval(intervalref.current!)

  }, [running, duration, startTime])

  const handleStartProgress = () => {
    setRunning(true);
    setStartTime(Date.now() - elapsed);
  }

  const handlePauseProgress = () => {
    setRunning(false);
    setElapsed(Date.now() - (startTime || 0));
  }



  return (
    <div className="flex flex-col items-center min-h-screen p-8 mx-auto">
      <input type="color" onChange={(e) => setColor(e.target.value)} value={color} className="w-full mt-10" />
      <input type='number' value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="border p-2 w-full mt-10" disabled={running} />


      <div className="w-full bg-gray-200 rounded overflow-hidden h-8 mt-10">
        <div className="h-full transition-all" style={{ width: `${progress}%`, background: color, }}></div>

      </div>
      <p>{Math.round(progress)}%</p>
      <div className='flex space-x-2'>
        <button onClick={handleStartProgress} disabled={running} className='mt-10 bg-red-500 text-white p-2 w-full cursor-pointer'>Start</button>
        <button onClick={handlePauseProgress} disabled={!running} className='mt-10 bg-green-500 text-white p-2 w-full cursor-pointer'>Pause</button>
      </div>
    </div>
  );

}

export default Home;