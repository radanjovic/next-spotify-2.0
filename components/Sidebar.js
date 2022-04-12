import {HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

export default function Sidebar() {
    const {data: session} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const spotifyApi = useSpotify();
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect( async () => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then(data => {
                setPlaylists(data.body.items);
            })
        }
    }, [session]);

    console.log(playlistId)

    return <div className='text-gray-500  p-5 pb-36 text-xs border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
        <div className='space-y-4'>
            <button className='flex items-center space-x-2 hover:text-white'><HomeIcon className='h-5 w-5' /><p>Home</p></button>
            <button className='flex items-center space-x-2 hover:text-white'><SearchIcon className='h-5 w-5' /><p>Search</p></button>
            <button className='flex items-center space-x-2 hover:text-white'><LibraryIcon className='h-5 w-5' /><p>Your Library</p></button>
        <hr className='border-t-[0.1px] border-gray-900' />
            <button className='flex items-center space-x-2 hover:text-white'><PlusCircleIcon className='h-5 w-5' /><p>Create Playlist</p></button>
            <button className='flex items-center space-x-2 hover:text-white'><HeartIcon className='h-5 w-5' /><p>Liked Songs</p></button>
            <button className='flex items-center space-x-2 hover:text-white'><RssIcon className='h-5 w-5' /><p>Your episodes</p></button>
        <hr className='border-t-[0.1px] border-gray-900' />
            <p className='text-white'>Your Playlists:</p>
            {/* Playlists */}
            {playlists.map(playlist => <p onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white' key={playlist.id}>
                {playlist.name}
            </p>)}
        </div>
    </div>
}