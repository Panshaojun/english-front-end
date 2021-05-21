import {FC,useRef} from 'react';
import 'index.scss';

const Voice:FC<{fileUrl:string}>=({fileUrl,children})=>{
    const audioRef=useRef<HTMLAudioElement>(null);
    const paly=()=>{
        if(audioRef.current){
            audioRef.current.currentTime=0;
            audioRef.current.play();
        }
    }
    const pause=()=>{
        if(audioRef.current){
            audioRef.current.pause();
        }
    }
    return (
        <div>
            {children}
            <audio loop ref={audioRef} onMouseEnter={paly} onMouseLeave={pause}>
                <source src={fileUrl} type="audio/mp3"/>
            </audio>
        </div>
    )
}
export default Voice;