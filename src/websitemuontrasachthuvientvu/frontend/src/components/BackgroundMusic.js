import React, { useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false); // Mặc định là tắt nhạc

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause(); // Tạm dừng nhạc
        } else {
            audioRef.current.play(); // Phát nhạc
        }
        setIsPlaying(!isPlaying); // Đảo trạng thái
    };

    return (
        <div>
            <audio ref={audioRef} loop>
                <source src="/music/music.mp3" type="audio/mpeg" />
                Trình duyệt của bạn không hỗ trợ phát nhạc.
            </audio>
            <div
                onClick={toggleMusic}
                className="fixed bottom-4 left-4 border-2 text-black p-6 rounded-full shadow-lg cursor-pointer hover:bg-gray-400 transition"
                style={{ zIndex: 9999 }}
            >
                {isPlaying ? <FaVolumeUp size={40} /> : <FaVolumeMute size={40} />}
            </div>


        </div>
    );
};

export default BackgroundMusic;