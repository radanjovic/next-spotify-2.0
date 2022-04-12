import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, VolumeUpIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";
import { VolumeUpIcon as VolumeDownIcon} from '@heroicons/react/outline';
import {debounce} from 'lodash';


export default function Player() {
    const spotifyApi = useSpotify();
    const {data: session} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();

    


    function playPause() {
        // WITH PREMIUM :

        // spotifyApi.getMyCurrentPlaybackState().then(data => {
        //     if (data.body.is_playing) {
        //         spotifyApi.pause();
        //         setIsPlaying(false);
        //     } else {
        //         spotifyApi.play();
        //         setIsPlaying(true);
        //     }
        // })

        setIsPlaying(prev => !prev);
    }

    // WITH PREMIUM AND PROPER PERMISSIONS: GET CURRENT SONG

    // function fetchCurrentSong() {
    //     if (!songInfo) {
    //         spotifyApi.getMyCurrentPlayingTrack().then(data => {
    //             setCurrentTrackId(data.body?.item?.id);

    //             spotifyApi.getMyCurrentPlaybackState().then(data => {
    //                 setIsPlaying(data.body?.is_playing);
    //             });
    //         });
    //     }
    // }

    // useEffect( () => {
    //     if (spotifyApi.getAccessToken() && !currentTrackId) {
    //         fetchCurrentSong();
    //         setVolume(50);
    //     }
    // }, [currentTrackId, spotifyApi, session]);

    useEffect( () => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce( volume => {
            spotifyApi.setVolume(volume).catch(err => {});
        }, 300), 
        []
    )

    return <div className="h-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">

        <div className="flex items-center space-x-4">
            <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt=''/>
            <div>
                <h3>{songInfo?.name}</h3>
                <p className="text-gray-500">{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>

        <div className="flex items-center justify-evenly">
            <SwitchHorizontalIcon className='Btn h-5 w-5' />
            <RewindIcon className='Btn h-5 w-5' />
            {isPlaying ? (<PauseIcon onClick={playPause} className="Btn w-10 h-10" />) : (<PlayIcon onClick={playPause} className="Btn w-10 h-10" />)}
            <FastForwardIcon className="Btn h-5 w-5" />
            <ReplyIcon className="Btn h-5 w-5" />
        </div>  

        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="Btn h-5 w-5" />
                <input className="w-14 md:w-28 " onChange={e => setVolume(Number(e.target.value))} value={volume} type='range' min={0} max={100} />
            <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="Btn h-5 w-5" />
        </div>

    </div>
}